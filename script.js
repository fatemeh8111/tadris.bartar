document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم

    let formData = new FormData(this);
    let innovationFile = document.getElementById("innovationUpload").files[0];
    let executionFile = document.getElementById("executionUpload").files[0];
    let messageElement = document.getElementById("successMessage");

    // بررسی اندازه فایل‌ها (حداکثر ۳۰ مگابایت)
    if ((innovationFile && innovationFile.size > 30 * 1024 * 1024) || 
        (executionFile && executionFile.size > 30 * 1024 * 1024)) {
        alert("حجم فایل نباید بیش از ۳۰ مگابایت باشد!");
        return;
    }

    // بررسی فرمت فایل‌های مجاز
    let allowedExtensions = ["mp4", "avi", "mkv", "mov", "pdf", "pptx"];
    let checkFileFormat = (file) => file && !allowedExtensions.includes(file.name.split('.').pop().toLowerCase());

    if (checkFileFormat(innovationFile) || checkFileFormat(executionFile)) {
        alert("فرمت فایل نامعتبر است! فرمت‌های مجاز: mp4, avi, mkv, mov, pdf, pptx");
        return;
    }

    // نمایش لودر هنگام ارسال
    document.getElementById("loader").style.display = "block";

    try {
        // آپلود فایل‌ها به گوگل درایو
        let innovationLink = innovationFile ? await uploadFileToDrive(innovationFile) : "";
        let executionLink = executionFile ? await uploadFileToDrive(executionFile) : "";

        // بررسی لینک‌های دریافتی
        if (!innovationLink || !executionLink) {
            throw new Error("آپلود فایل‌ها به درایو با مشکل مواجه شد.");
        }

        // ارسال اطلاعات فرم به گوگل شیت
        formData.append("innovationLink", innovationLink);
        formData.append("executionLink", executionLink);

        let response = await fetch("https://script.google.com/macros/s/AKfycbz92HrmIHePkW6zMHJlnrucjGnttsJGxLL424ryIUGATXppDGyuVfueFdY0cjlFiBNHOw/exec", {
            method: "POST",
            body: formData
        });

        let data = await response.json();

        if (data.status === "success") {
            messageElement.style.display = "block";
            messageElement.innerText = "✅ اثر شما با موفقیت ثبت شد!";
        } else {
            throw new Error("خطا در ارسال اطلاعات!");
        }
    } catch (error) {
        console.error("خطا:", error);
        alert("مشکلی در ارسال داده‌ها پیش آمد.");
    } finally {
        // مخفی کردن لودر بعد از اتمام ارسال
        document.getElementById("loader").style.display = "none";
    }
});

// تابع آپلود فایل به گوگل درایو
async function uploadFileToDrive(file) {
    let formData = new FormData();
    formData.append("file", file);
    
    let response = await fetch("https://script.google.com/macros/s/AKfycbxoRMkshXcjlTU-18BWSwpvJc8yYaA4-gzMpzp5nXQnT2ltnSKtgV7gHPVAuSmNqb6nxA/exec", {
        method: "POST",
        body: formData
    });

    let data = await response.json();
    return data.fileUrl || ""; // لینک فایل را برمی‌گرداند
}

// تابع نمایش/عدم نمایش منو در موبایل
function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
}