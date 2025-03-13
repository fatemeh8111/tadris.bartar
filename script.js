document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // جلوگیری از ارسال پیش‌فرض فرم

    let formData = new FormData(this);
    let innovationFile = document.getElementById("innovationUpload").files[0];
    let executionFile = document.getElementById("executionUpload").files[0];

    // فرمت‌های مجاز
    let allowedFormats = ["pdf", "mp3", "mp4", "png","word","jpg"];

    // بررسی نوع و حجم فایل‌ها
    if (!validateFile(innovationFile, allowedFormats)) return;
    if (!validateFile(executionFile, allowedFormats)) return;

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

// تابع بررسی فرمت و حجم فایل
function validateFile(file, allowedFormats) {
    if (!file) return true; // اگر فایلی انتخاب نشده بود، ادامه بده

    let fileExtension = file.name.split('.').pop().toLowerCase(); // استخراج پسوند فایل
    if (!allowedFormats.includes(fileExtension)) {
        alert("فقط فرمت‌های PDF، MP3، MP4 و PNG مجاز هستند!");
        return false;
    }

    if (file.size > 30 * 1024 * 1024) { // محدودیت 30 مگابایت
        alert("حجم فایل بیش از ۳۰ مگابایت است!");
        return false;
    }

    return true;
}

// تابع آپلود فایل به گوگل درایو
async function uploadFileToDrive(file) {
    if (!file) return null;

    let formData = new FormData();
    formData.append("file", file);

    try {
        let response = await fetch("https://script.google.com/macros/s/AKfycbxoRMkshXcjlTU-18BWSwpvJc8yYaA4-gzMpzp5nXQnT2ltnSKtgV7gHPVAuSmNqb6nxA/exec", {
            method: "POST",
            body: formData
        });

        let data = await response.json();
        return data.fileUrl || null;
    } catch (error) {
        console.error("خطا در آپلود فایل:", error);
        return null;
    }
}
function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}