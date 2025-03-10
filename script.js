
document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    var file = document.getElementById("file").files[0];
    
    if (file && file.size > 30 * 1024 * 1024) { // 30MB
        document.getElementById("message").innerText = "حجم فایل بیش از ۳۰ مگابایت است!";
        return;
    }
    
    document.getElementById("message").innerText = "اثر شما با موفقیت ثبت شد!";
});
document.addEventListener("DOMContentLoaded", function() {
    const butterflies = document.querySelectorAll(".butterfly");

    butterflies.forEach(butterfly => {
        let randomX = Math.random() * window.innerWidth;
        let randomDelay = Math.random() * 5; // تاخیر تصادفی

        butterfly.style.left = `${randomX}px`;
        butterfly.style.animationDelay = `${randomDelay}s`;
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const container = document.querySelector(".butterfly-container");
    const numButterflies = 15; // تعداد پروانه‌ها

    for (let i = 0; i < numButterflies; i++) {
        let butterfly = document.createElement("img");
        butterfly.src = "images/butterfly.png"; // مسیر عکس پروانه
        butterfly.classList.add("butterfly");

        let randomX = Math.random() * window.innerWidth; // موقعیت تصادفی
        let randomY = Math.random() * window.innerHeight; // شروع از یک ارتفاع تصادفی
        let randomSize = Math.random() * 40 + 30; // سایز بین 30 تا 70 پیکسل
        let randomDelay = Math.random() * 5; // تاخیر تصادفی

        butterfly.style.left = `${randomX}px`;
        butterfly.style.bottom = `${randomY}px`; // از یه جای تصادفی بالا میاد
        butterfly.style.width = `${randomSize}px`;
        butterfly.style.animationDelay = `${randomDelay}s`;

        container.appendChild(butterfly);
    }
});
function toggleMenu() {
    var menu = document.getElementById("menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // جلوگیری از رفرش شدن صفحه

    let googleScriptUrl = "https://script.google.com/macros/s/AKfycbwTDoJB8fOtgET819IaAw1yNeN-IY2X5f1Xy5JlYcYXT6u_zEm10gwtL65CDMn3IF70gQ/exec"; // آدرس اسکریپت منتشر شده
    let formData = new FormData(this); // اطلاعات فرم را می‌گیرد

    await fetch(googleScriptUrl, {
        method: "POST",
        body: formData
    }).then(response => response.text())
    .then(data => {
        alert("اطلاعات شما ثبت شد!"); 
    }).catch(error => {
        alert("مشکلی پیش آمد، دوباره تلاش کنید.");
    });
});

