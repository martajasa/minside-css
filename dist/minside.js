// Modal
function openModal(modal) {
    if (!modal) return;
    modal.classList.add("show");
}

function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("show");
}

document.querySelectorAll("[data-ms-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
        const modal = document.querySelector(btn.dataset.msModal);
        openModal(modal);
    });
});

document.querySelectorAll(".ms-modal").forEach((modal) => {
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
});

// Dropdown
document.querySelectorAll(".ms-dropdown-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
        btn.nextElementSibling?.classList.toggle("show");
    });
});

// Accordion (smooth height animation)
document.querySelectorAll(".ms-accordion-header").forEach((header) => {
    const content = header.nextElementSibling;
    if (!content) return;

    content.style.maxHeight = "0px";

    header.addEventListener("click", () => {
        const isOpen = content.classList.contains("show");

        if (isOpen) {
            content.style.maxHeight = `${content.scrollHeight}px`;
            requestAnimationFrame(() => {
                content.style.maxHeight = "0px";
                content.classList.remove("show");
            });
            return;
        }

        content.classList.add("show");
        content.style.maxHeight = `${content.scrollHeight}px`;
    });
});

// Theme Toggle
const toggle = document.querySelector("[data-ms-theme-toggle]");
if (toggle) {
    toggle.addEventListener("click", () => {
        const html = document.documentElement;
        const current = html.getAttribute("data-ms-theme");
        html.setAttribute("data-ms-theme", current === "dark" ? "light" : "dark");
    });
}
