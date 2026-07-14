document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       ACTIVE NAVIGATION
    ===================================== */

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll("nav a").forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });

    /* =====================================
       STICKY HEADER
    ===================================== */

    const header = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 6px 18px rgba(0,0,0,.15)";
        } else {
            header.style.boxShadow = "0 2px 10px rgba(0,0,0,.08)";
        }
    });

    /* =====================================
       APARTMENT SEARCH
    ===================================== */

    const searchInput = document.querySelector(".search-box input");
    const searchButton = document.querySelector(".search-box button");
    const cards = document.querySelectorAll(".featured .card");

    const noResult = document.createElement("h2");
    noResult.innerText = "No apartments found.";
    noResult.style.textAlign = "center";
    noResult.style.marginTop = "40px";
    noResult.style.display = "none";
    document.querySelector(".featured").appendChild(noResult);

    function searchApartments() {
        const keyword = searchInput.value.trim().toLowerCase();
        let found = false;

        cards.forEach(card => {
            const data = card.dataset.search.toLowerCase();
            if (keyword === "" || data.includes(keyword)) {
                card.style.display = "";
                found = true;
            } else {
                card.style.display = "none";
            }
        });

        noResult.style.display = found ? "none" : "block";
    }

    if (searchButton) {
        searchButton.addEventListener("click", searchApartments);
    }

    if (searchInput) {
        searchInput.addEventListener("keyup", function (e) {
            if (e.key === "Enter") {
                searchApartments();
            }
        });
    }

    /* =====================================
       MULTIPLE FILTER BUTTONS
    ===================================== */
/* =====================================
   FILTER SCROLL ARROWS
===================================== */

    const filterContainer = document.querySelector(".filter-container");
    const scrollLeftBtn = document.getElementById("scrollLeft");
    const scrollRightBtn = document.getElementById("scrollRight");

    if (filterContainer && scrollLeftBtn && scrollRightBtn) {

        const scrollAmount = 220;

        scrollLeftBtn.addEventListener("click", function () {
            filterContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });

        scrollRightBtn.addEventListener("click", function () {
            filterContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });

        function updateArrowState() {
            const maxScroll = filterContainer.scrollWidth - filterContainer.clientWidth;

            scrollLeftBtn.disabled = filterContainer.scrollLeft <= 0;
            scrollRightBtn.disabled = filterContainer.scrollLeft >= maxScroll - 1;
        }

        filterContainer.addEventListener("scroll", updateArrowState);
        window.addEventListener("resize", updateArrowState);
        updateArrowState();
    }
    const filterButtons = document.querySelectorAll(".filter-btn");
    let activeFilters = [];

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const filter = this.dataset.filter;

            if (filter === "all") {
                activeFilters = [];
                filterButtons.forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");
                cards.forEach(card => card.style.display = "");
                return;
            }

            document.querySelector('[data-filter="all"]').classList.remove("active");
            this.classList.toggle("active");

            if (activeFilters.includes(filter)) {
                activeFilters = activeFilters.filter(item => item !== filter);
            } else {
                activeFilters.push(filter);
            }

            if (activeFilters.length === 0) {
                document.querySelector('[data-filter="all"]').classList.add("active");
                cards.forEach(card => card.style.display = "");
                return;
            }

            cards.forEach(card => {
                const tags = card.dataset.filter.split(" ");
                const matches = activeFilters.every(filter => tags.includes(filter));
                card.style.display = matches ? "" : "none";
            });
        });
    });

    /* =====================================
       CONTACT FORM
    ===================================== */

    const form = document.querySelector("form");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            let valid = true;

            form.querySelectorAll("input, textarea").forEach(input => {
                if (input.value.trim() === "") {
                    input.style.border = "2px solid red";
                    valid = false;
                } else {
                    input.style.border = "1px solid #ccc";
                }
            });

            if (valid) {
                alert("✅ Thank you! Your message has been sent.");
                form.reset();
            }
        });
    }

    /* =====================================
       SCROLL TO TOP BUTTON
    ===================================== */

    const topButton = document.createElement("button");
    topButton.innerHTML = "↑";
    topButton.id = "topButton";
    document.body.appendChild(topButton);
    topButton.style.display = "none";

    window.addEventListener("scroll", function () {
        topButton.style.display = window.scrollY > 400 ? "block" : "none";
    });

    topButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* =====================================
       FADE IN ANIMATION
    ===================================== */

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: .2 });

    document.querySelectorAll(
        ".card, .why-box, .service-card, .info-card, .step"
    ).forEach(item => {
        item.classList.add("hidden");
        observer.observe(item);
    });

    /* =====================================
       CARD HOVER EFFECT
    ===================================== */

    cards.forEach(card => {
        card.addEventListener("mouseenter", function () {
            card.style.transform = "translateY(-10px)";
            card.style.transition = ".3s";
        });

        card.addEventListener("mouseleave", function () {
            card.style.transform = "translateY(0)";
        });
    });

    console.log("UniStay Loaded Successfully!");

});