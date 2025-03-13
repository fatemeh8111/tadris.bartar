document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم

    let formData = new FormData(this);
    let innovationFile = document.getElementById("innovationUpload").files[0];
    let executionFile = document.getElementById("executionUpload").files[0];

    // بررسی حجم فایل‌ها (حداکثر ۳۰ مگابایت)
    if (innovationFile && innovationFile.size > 30 * 1024 * 1024) {
        alert("حجم فایل نوآوری بیش از ۳۰ مگابایت است!");
        return;
    }
    if (executionFile && executionFile.size > 30 * 1024 * 1024) {
        alert("حجم فایل اجرای تدریس بیش از ۳۰ مگابایت است!");
        return;
    }

    // نمایش لودر
    document.getElementById("loader").style.display = "block";

    try {
        let innovationLink = await uploadFileToDrive(innovationFile);
        let executionLink = await uploadFileToDrive(executionFile);

        if (!innovationLink || !executionLink) {
            throw new Error("آپلود فایل‌ها به درایو ناموفق بود!");
        }

        formData.append("innovationLink", innovationLink);
        formData.append("executionLink", executionLink);

        let response = await fetch("https://script.google.com/macros/s/AKfycbz92HrmIHePkW6zMHJlnrucjGnttsJGxLL424ryIUGATXppDGyuVfueFdY0cjlFiBNHOw/exec", {
            method: "POST",
            body: formData
        });

        let data = await response.json();

        if (data.status === "success") {
            document.getElementById("successMessage").style.display = "block";
        } else {
            alert("خطا در ارسال اطلاعات! لطفاً مجدداً تلاش کنید.");
        }
    } catch (error) {
        console.error("خطا:", error);
        alert("مشکلی در ارسال داده‌ها پیش آمد.");
    } finally {
        document.getElementById("loader").style.display = "none"; // مخفی کردن لودر
    }
});

// تابع آپلود فایل به گوگل درایو
async function uploadFileToDrive(file) {
    if (!file) return null; // اگر فایلی انتخاب نشده بود

    let formData = new FormData();
    formData.append("file", file);

    try {
        let response = await fetch("https://script.google.com/macros/s/AKfycbxoRMkshXcjlTU-18BWSwpvJc8yYaA4-gzMpzp5nXQnT2ltnSKtgV7gHPVAuSmNqb6nxA/exec", {
            method: "POST",
            body: formData
        });

        let data = await response.json();
        return data.fileUrl || null; // در صورت موفقیت لینک فایل را برمی‌گرداند
    } catch (error) {
        console.error("خطا در آپلود فایل:", error);
        return null;
    }
}

// تابع نمایش یا مخفی کردن منو
function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}