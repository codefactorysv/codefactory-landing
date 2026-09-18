const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

function setMenu(open: boolean) {
	links?.classList.toggle("open", open);
	toggle?.setAttribute("aria-expanded", String(open));
	toggle?.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}

toggle?.addEventListener("click", () => {
	setMenu(!links?.classList.contains("open"));
});

links?.addEventListener("click", (e) => {
	if ((e.target as HTMLElement).tagName === "A") {
		setMenu(false);
	}
});

const navItems = document.querySelectorAll<HTMLElement>(".nav-item");

navItems.forEach((item) => {
	const trigger = item.querySelector<HTMLElement>(".drop-trigger");
	trigger?.addEventListener("click", (e) => {
		e.stopPropagation();
		const isOpen = item.classList.contains("open");
		navItems.forEach((other) => {
			other.classList.remove("open");
			other.querySelector(".drop-trigger")?.setAttribute("aria-expanded", "false");
		});
		item.classList.toggle("open", !isOpen);
		trigger.setAttribute("aria-expanded", String(!isOpen));
	});
});

document.addEventListener("click", (e) => {
	if (!(e.target as HTMLElement).closest(".nav-item")) closeDropdowns();
});

function closeDropdowns() {
	navItems.forEach((item) => {
		item.classList.remove("open");
		item.querySelector(".drop-trigger")?.setAttribute("aria-expanded", "false");
	});
}

document.addEventListener("keydown", (e) => {
	if (e.key !== "Escape") return;
	closeDropdowns();
	if (links?.classList.contains("open")) {
		setMenu(false);
		toggle?.focus();
	}
});

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateCount(el: HTMLElement) {
	el.dataset.done = "1";
	const target = parseInt(el.dataset.count ?? "0", 10);
	const prefix = el.dataset.prefix || "";
	const suffix = el.dataset.suffix || "";

	if (reduced) {
		el.textContent = prefix + target + suffix;
		return;
	}

	let start: number | null = null;
	function step(ts: number) {
		if (!start) start = ts;
		const p = Math.min((ts - start) / 1100, 1);
		el.textContent = prefix + Math.floor(p * target) + suffix;
		if (p < 1) requestAnimationFrame(step);
	}
	requestAnimationFrame(step);
}

const io = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
				const counter = entry.target.querySelector<HTMLElement>("[data-count]");
				if (counter && !counter.dataset.done) animateCount(counter);
				io.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.18 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
