
document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var file = document.getElementById("file").files[0];
    
    if (file && file.size > 30 * 1024 * 1024) { // 30MB
        document.getElementById("message").innerText = "حجم فایل بیش از ۳۰ مگابایت است!";
        return;
    }
    
    document.getElementById("message").innerText = "اثر شما با موفقیت ثبت شد!";
});
function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var file = document.getElementById("file").files[0];
    
    if (file && file.size > 30 * 1024 * 1024) { // 30MB
        document.getElementById("message").innerText = "حجم فایل بیش از ۳۰ مگابایت است!";
        return;
    }
    
    document.getElementById("message").innerText = "اثر شما با موفقیت ثبت شد!";
});

document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // جلوگیری از ارسال فرم به‌صورت پیش‌فرض

    let formData = new FormData(this);
    let innovationFile = document.getElementById("innovationUpload").files[0];
    let executionFile = document.getElementById("executionUpload").files[0];

    // نمایش لودر هنگام ارسال
    document.getElementById("loader").style.display = "block";

    try {
        // ابتدا فایل‌ها را در گوگل درایو آپلود کن
        let innovationLink = await uploadFileToDrive(innovationFile);
        let executionLink = await uploadFileToDrive(executionFile);

        // حالا اطلاعات را همراه با لینک فایل‌ها به گوگل شیت بفرست
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
            alert("خطا در ارسال اطلاعات!");
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
