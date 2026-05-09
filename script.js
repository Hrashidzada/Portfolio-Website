const nameTarget = document.querySelector("#typed-name");
const navLinks = document.querySelectorAll(".nav-links a");
const nameText = "Hamza";
const motionTargets = document.querySelectorAll(
  ".reveal, .project-card, .skills-showcase article, .profile-terminal, .contact-panel, .link-console"
);

let lastScrollY = window.scrollY;
let scrollDirection = "down";

let i = 0;
function typeName() {
  if (!nameTarget || i > nameText.length) return;
  nameTarget.textContent = nameText.slice(0, i);
  i += 1;
  window.setTimeout(typeName, i === 1 ? 260 : 115);
}

window.addEventListener(
  "scroll",
  () => {
    const currentY = window.scrollY;
    scrollDirection = currentY >= lastScrollY ? "down" : "up";
    lastScrollY = currentY;
  },
  { passive: true }
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const side = scrollDirection === "down" ? "from-right" : "from-left";
        entry.target.classList.remove("from-left", "from-right");
        entry.target.classList.add(side);
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px" }
);

motionTargets.forEach((element, index) => {
  element.classList.add("motion-reveal");
  element.classList.add(index % 2 === 0 ? "from-left" : "from-right");
  observer.observe(element);
});
window.addEventListener("load", typeName);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    link.animate(
      [
        { textShadow: "0 0 0 rgba(245, 184, 90, 0)" },
        { textShadow: "0 0 24px rgba(245, 184, 90, 0.8)" },
        { textShadow: "0 0 0 rgba(245, 184, 90, 0)" },
      ],
      { duration: 520, easing: "ease-out" }
    );
  });
});
