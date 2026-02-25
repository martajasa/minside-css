const navLinks = document.querySelectorAll(".docs-nav a");
const currentPath = window.location.pathname.split("/").pop() || "index.html";

navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPath) {
        link.style.background = "var(--ms-light)";
        link.style.color = "var(--ms-text)";
        link.style.fontWeight = "700";
    }
});

const search = document.getElementById("docs-search");
if (search) {
    search.addEventListener("input", () => {
        const value = search.value.toLowerCase().trim();
        navLinks.forEach((link) => {
            const text = link.textContent.toLowerCase();
            link.style.display = text.includes(value) ? "block" : "none";
        });
    });
}

document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        search?.focus();
    }
});

document.querySelectorAll("pre").forEach((block) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Copy";
    button.className = "ms-btn ms-btn-outline";
    button.style.fontSize = "12px";
    button.style.minHeight = "32px";
    button.style.padding = "6px 10px";
    button.style.position = "absolute";
    button.style.top = "8px";
    button.style.right = "8px";

    block.appendChild(button);

    button.addEventListener("click", async () => {
        const clone = block.cloneNode(true);
        clone.querySelector("button")?.remove();
        await navigator.clipboard.writeText(clone.innerText.trim());
        button.textContent = "Copied";
        setTimeout(() => {
            button.textContent = "Copy";
        }, 1200);
    });
});

function slugify(value) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
}

function initToc() {
    const tocNav = document.getElementById("on-this-page");
    const tocContainer = document.querySelector(".docs-toc");
    const content = document.querySelector(".docs-content");

    if (!tocNav || !tocContainer || !content) {
        return;
    }

    const headings = Array.from(content.querySelectorAll("h2, h3"));
    if (headings.length < 2) {
        tocContainer.style.display = "none";
        return;
    }

    const used = new Set();
    const links = [];

    headings.forEach((heading) => {
        if (!heading.id) {
            let id = slugify(heading.textContent || "section");
            if (!id) {
                id = "section";
            }
            let counter = 2;
            let candidate = id;
            while (used.has(candidate) || document.getElementById(candidate)) {
                candidate = `${id}-${counter}`;
                counter += 1;
            }
            heading.id = candidate;
        }
        used.add(heading.id);

        const link = document.createElement("a");
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent || "Section";
        link.className = `docs-toc-link ${heading.tagName === "H3" ? "level-3" : ""}`.trim();
        tocNav.appendChild(link);
        links.push({ heading, link });
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const item = links.find((l) => l.heading === entry.target);
                if (!item) {
                    return;
                }
                if (entry.isIntersecting) {
                    links.forEach((l) => l.link.classList.remove("is-active"));
                    item.link.classList.add("is-active");
                }
            });
        },
        { rootMargin: "-35% 0px -55% 0px", threshold: [0, 1] }
    );

    links.forEach(({ heading }) => observer.observe(heading));
}

initToc();
