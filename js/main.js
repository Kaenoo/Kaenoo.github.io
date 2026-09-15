(() => {
    "use strict";

    /* Header elevation on scroll */
    const header = document.getElementById("site-header");
    const onScroll = () => {
        if (!header) return;
        if (window.scrollY > 8) {
            header.classList.add("border-line", "bg-ink/80", "backdrop-blur");
        } else {
            header.classList.remove("border-line", "bg-ink/80", "backdrop-blur");
        }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Mobile menu */
    const toggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    if (toggle && mobileMenu) {
        toggle.addEventListener("click", () => {
            const open = mobileMenu.classList.toggle("hidden") ? false : true;
            toggle.setAttribute("aria-expanded", String(open));
        });
    }

    /* Footer year */
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    /* Project filters (myProjects.html) */
    const filters = document.getElementById("filters");
    const grid = document.getElementById("projects-grid");
    const noResults = document.getElementById("no-results");
    if (filters && grid) {
        const buttons = Array.from(filters.querySelectorAll("[data-filter]"));
        const cards = Array.from(grid.querySelectorAll("[data-category]"));

        const apply = (filter) => {
            let visible = 0;
            for (const card of cards) {
                const show = filter === "all" || card.dataset.category === filter;
                card.classList.toggle("hidden", !show);
                card.classList.toggle("animate-fade-up", show);
                if (show) visible++;
            }
            if (noResults) noResults.classList.toggle("hidden", visible > 0);
            for (const btn of buttons) {
                const active = btn.dataset.filter === filter;
                btn.setAttribute("aria-pressed", String(active));
                btn.classList.toggle("!bg-signal", active);
                btn.classList.toggle("!text-ink", active);
                btn.classList.toggle("!border-signal", active);
            }
        };

        buttons.forEach((btn) =>
            btn.addEventListener("click", () => apply(btn.dataset.filter))
        );
    }

    /* Inline video reveal on poster click (myProjects.html) */
    const videoButtons = document.querySelectorAll(".project-video");
    videoButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            if (btn.querySelector("video")) return;
            const video = document.createElement("video");
            video.controls = true;
            video.autoplay = true;
            video.playsInline = true;
            video.preload = "metadata";
            video.poster = btn.dataset.poster;
            video.className = "h-full w-full object-contain bg-ink";
            const source = document.createElement("source");
            source.src = btn.dataset.video;
            source.type = "video/mp4";
            video.appendChild(source);
            btn.replaceChildren(video);
        });
    });
})();