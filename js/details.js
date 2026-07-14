/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const currentPage = window.location.pathname.split("/").pop();

document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
    }
});

/* ==========================================
   HEADER SHADOW
========================================== */

const header = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 10px 25px rgba(0,0,0,.15)";
    } else {
        header.style.boxShadow = "0 2px 15px rgba(0,0,0,.08)";
    }
});

/* ==========================================
   IMAGE GALLERY (thumbnail swap)
========================================== */

const mainImage = document.getElementById("mainImage");
const thumbnails = document.querySelectorAll(".thumb");

thumbnails.forEach(image => {
    image.addEventListener("click", () => {
        mainImage.src = image.src;
    });
});

/* ==========================================
   LIGHTBOX (main photo only, not thumbnails)
========================================== */

function openLightbox(src) {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0,0,0,.9)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.cursor = "pointer";
    overlay.style.zIndex = "9999";

    const img = document.createElement("img");
    img.src = src;
    img.style.maxWidth = "90%";
    img.style.maxHeight = "90%";
    img.style.borderRadius = "15px";

    overlay.appendChild(img);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", () => overlay.remove());
}

mainImage.addEventListener("click", () => openLightbox(mainImage.src));

document.querySelectorAll(".room-gallery img").forEach(image => {
    image.addEventListener("click", () => openLightbox(image.src));
});

/* ==========================================
   BUTTON ACTIONS
========================================== */

document.querySelectorAll(".reserve-btn").forEach(button => {
    button.addEventListener("click", () => {
        alert(
            "Thank you!\n\nYour reservation request has been received.\n\nThe landlord will contact you shortly."
        );
    });
});

document.querySelectorAll(".visit-btn").forEach(button => {
    button.addEventListener("click", () => {
        const date = prompt("Choose your preferred visit date (Example: July 20, 2026)");
        if (date) {
            alert("Visit scheduled on:\n\n" + date);
        }
    });
});

document.querySelectorAll(".message-btn").forEach(button => {
    button.addEventListener("click", () => {
        const message = prompt("Send a message to the landlord:");
        if (message) {
            alert("Your inquiry has been sent!");
        }
    });
});

document.querySelectorAll(".call-btn").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.landlord || "the landlord";
        const phone = button.dataset.phone || "the number on file";
        const answer = confirm(`Call ${name}?`);
        if (answer) {
            alert(`Dialing:\n${phone}`);
        }
    });
});

/* ==========================================
   FADE ANIMATION
========================================== */

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".info-card, .contact-card, .review-card, .card")
    .forEach(element => {
        element.classList.add("hidden");
        observer.observe(element);
    });

/* ==========================================
   SCROLL TO TOP
========================================== */

const topButton = document.createElement("button");
topButton.innerHTML = "↑";
topButton.id = "topButton";
document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
    topButton.style.display = window.scrollY > 500 ? "block" : "none";
});

topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ==========================================
   SMOOTH SCROLL
========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});