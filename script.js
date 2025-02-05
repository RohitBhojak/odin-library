const themeIcon = document.querySelector("#theme-icon");
const svgIcons = document.querySelectorAll(".svg");

themeIcon.addEventListener("click", () => {
    if (document.documentElement.getAttribute("data-theme") === "dark") {
        document.documentElement.removeAttribute("data-theme");
        themeIcon.setAttribute("src", "./assets/weather-night.svg");
    }
    else {
        document.documentElement.setAttribute("data-theme", "dark");
        themeIcon.setAttribute("src", "./assets/weather-sunny.svg");
    }
    for (const icon of svgIcons) {
        icon.classList.toggle("dark");
    }
});