const body = document.body;
const sideIcon = document.querySelector(".sideIcon > i");
const sideIconButton = document.querySelector(".sideIcon");
const sidebodyUL = document.querySelector(".sidebody > ul");
const HideedItems = document.querySelectorAll(".sidebody > ul > li > h3, .text_head");

//*=================== SideBar variables================================*//
const sidebodyElements = document.querySelectorAll(".sidebody > ul > li");


//*===================================================*//
const darkModeIcon = document.querySelector(".fa-sun");


//*===================================================*//
const activeButtons = document.querySelectorAll(".sidebody > ul>li");
const activeLayout = document.querySelectorAll(".main_container > div");


/* ============= side bar fucntions ============= */
//*===================== Open and close the side bar ==============================*//


//! Dark Mode Function


const setDarkThemeState = (isDark) => {
    localStorage.setItem('dark_theme', isDark ? 'dark' : 'light');
};


const toggleDarkMode = () => {
    darkModeIcon.classList.toggle("fa-sun");
    darkModeIcon.classList.toggle("fa-moon");
    body.classList.toggle("dark_mode");


    const isDarkModeEnabled = body.classList.contains("dark_mode");
    setDarkThemeState(isDarkModeEnabled);
};

darkModeIcon.addEventListener("click", toggleDarkMode);


window.addEventListener('DOMContentLoaded', () => {
    const darkThemeState = localStorage.getItem('dark_theme');
    if (darkThemeState === 'dark') {
        toggleDarkMode();
    }
});

//? change active sidebar button and active layout main function
activeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        activeButtons.forEach(function (btn) {
            btn.classList.remove("active_button");
        });
        activeLayout.forEach(function (layout) {
            layout.classList.remove("active_layout");
        });
        button.classList.add("active_button");
        const index = Array.from(activeButtons).indexOf(button);
        if (index !== -1 && index < activeLayout.length) {
            activeLayout[index].classList.add("active_layout");
        }
    });
});

//!  time and date functions
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");    
    if(hours >= 12){
        document.getElementById("time").textContent = `${hours-12}:${minutes}:${seconds} PM`;
    }
    else{
        document.getElementById("time").textContent = `${hours}:${minutes}:${seconds} AM`;
    }
}
setInterval(updateTime, 1000);
updateTime();


function updateDate() {
    const now = new Date();
    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    const dateString = now.toLocaleDateString(undefined, options);
    document.getElementById("date").textContent = dateString;
}
setInterval(updateDate, 1000 * 60 * 60 * 24);
updateDate();











