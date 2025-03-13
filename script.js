document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".butterfly-container");
    const numButterflies = 15; // تعداد پروانه‌ها

    for (let i = 0; i < numButterflies; i++) {
        let butterfly = document.createElement("img");
        butterfly.src = "images/butterfly.png"; // مسیر عکس پروانه
        butterfly.classList.add("butterfly");

        let randomX = Math.random() * window.innerWidth; 
        let randomY = Math.random() * window.innerHeight; 
        let randomSize = Math.random() * 40 + 30; 
        let randomDelay = Math.random() * 5; 

        butterfly.style.left = randomX + "px";
        butterfly.style.bottom = randomY + "px";
        butterfly.style.width = randomSize + "px";
        butterfly.style.animationDelay = randomDelay + "s";

        container.appendChild(butterfly);
    }
});

document.getElementById("uploadForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    let innovationFile = document.getElementById("innovationUpload").files[0];
    let executionFile = document.getElementById("executionUpload").files[0];

    if (!innovationFile || !executionFile) {
        document.getElementById("message").innerText = "لطفاً هر دو فایل را انتخاب کنید.";
        return;
    }

    if (innovationFile.size > 30 * 1024 * 1024 || executionFile.size > 30 * 1024 * 1024) {
        document.getElementById("message").innerText = "حجم فایل نباید بیش از ۳۰ مگابایت باشد!";
        return;
    }

    document.getElementById("loader").style.display = "block";
    document.getElementById("message").innerText = "";

    try {
        let innovationLink = await uploadFileToDrive(innovationFile);
        let executionLink = await uploadFileToDrive(executionFile);

        let formData = new FormData();
        formData.append("innovationLink", innovationLink);
        formData.append("executionLink", executionLink);

        let response = await fetch("https://script.google.com/macros/s/AKfycbwygrPKqfG0ZO1JsJUyVjolIgS42AsJndm4UH_CPb7OTQ0fEZcltBeejQ0ugUm3U0sg/exec", {
            method: "POST",
            body: formData
        });

        let data = await response.json();

        if (data.status === "success") {
            document.getElementById("successMessage").style.display = "block";
        } else {
            document.getElementById("message").innerText = "خطا در ارسال اطلاعات!";
        }
    } catch (error) {
        console.error("خطا:", error);
        document.getElementById("message").innerText = "مشکلی در ارسال داده‌ها پیش آمد.";
    } finally {
        document.getElementById("loader").style.display = "none";
    }
});

// تابع آپلود فایل به گوگل درایو
async function uploadFileToDrive(file) {
    if (!file) return "";

    let formData = new FormData();
    formData.append("file", file);

    try {
        let response = await fetch("https://script.google.com/macros/s/AKfycbwygrPKqfG0ZO1JsJUyVjolIgS42AsJndm4UH_CPb7OTQ0fEZcltBeejQ0ugUm3U0sg/exec", {
            method: "POST",
            body: formData
        });

        let data = await response.json();
        return data.fileUrl || "";
    } catch (error) {
        console.error("خطا در آپلود فایل:", error);
        return "";
    }
}