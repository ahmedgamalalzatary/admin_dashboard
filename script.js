/*Dictionary for comments in code 



/* *./ Means section functions
//! Means important functions without section
//? Means function inside secthion
//* Means varialbes or what else

*/

/* ================== variables =================== */

//*==================== Gloabal Variables ===============================*//
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

const smallactiveButtons= document.querySelectorAll(".aside ul li");
const smallactiveMenu = document.querySelector(".aside");

const menuBars = document.querySelector(".fa-solid.fa-bars");

/* ============= side bar fucntions ============= */
//*===================== Open and close the side bar ==============================*//

sideIcon.addEventListener("click", () => {
    const isLeftArrow = sideIcon.classList.contains("fa-arrow-left");

    body.style.gridTemplateColumns = isLeftArrow ? ".05fr 1fr" : ".15fr 1fr";
    HideedItems.forEach(
        (item) => (item.style.display = isLeftArrow ? "none" : "")
    );
    sidebodyElements.forEach(
        (item) => (item.style.padding = isLeftArrow ? "0 2rem" : "")
    );
    sideIcon.classList.toggle("fa-arrow-left");
    sideIcon.classList.toggle("fa-arrow-right");
    sideIconButton.style.right = isLeftArrow ? "-22%" : "-8%";
});



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
smallactiveButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        smallactiveButtons.forEach(function (btn) {
            btn.classList.remove("active_button");
        });
        if(menuBars.classList.contains("fa-bars")){
            smallactiveMenu.style.display = "block";
            menuBars.classList.remove("fa-bars");
            menuBars.classList.add("fa-xmark");
        } else {
            smallactiveMenu.style.display = "none";
            menuBars.classList.remove("fa-xmark");
            menuBars.classList.add("fa-bars");
        }

        activeLayout.forEach(function (layout) {
            layout.classList.remove("active_layout");
        });

        button.classList.add("active_button");
        const index = Array.from(smallactiveButtons).indexOf(button);
        if (index !== -1 && index < activeLayout.length) {
            activeLayout[index].classList.add("active_layout");
        }
    });
});
menuBars.addEventListener("click", function () {
    if(menuBars.classList.contains("fa-bars")){
        smallactiveMenu.style.display = "block";
        menuBars.classList.remove("fa-bars");
        menuBars.classList.add("fa-xmark");
    } else {
        smallactiveMenu.style.display = "none";
        menuBars.classList.remove("fa-xmark");
        menuBars.classList.add("fa-bars");
    }
    
});

//! Dashboard laoyout functions 
/*============= counter users ================== */
function animateCounter(element, targetNumber) {
    let count = 0;
    const duration = 2000;
    const step = Math.ceil(targetNumber / (duration / 10));

    const timer = setInterval(() => {
        count += step;
        if (count >= targetNumber) {
            clearInterval(timer);
            count = targetNumber;
        }
        element.textContent = count;
    }, 10);
}

const totalUsersElement = document.querySelector(".total_users h3");
const totalAddedElement = document.querySelector(".total_added h3");

let totalUsers, totalAdded;

function RandomTotalUsers() {
    return Math.floor(Math.random() * 10000);
}
function RandomTotalAdded() {
    return Math.floor(Math.random() * 1000);
}

function checkCondition() {
    if (totalAdded >= totalUsers) {
        totalUsers = RandomTotalUsers();
        totalAdded = RandomTotalAdded();
        totalUsersElement.textContent = 0;
        totalAddedElement.textContent = 0;
        animateCounter(totalUsersElement, totalUsers);
        animateCounter(totalAddedElement, totalAdded);
    } else {
        return;
    }
}

do {
    totalUsers = RandomTotalUsers();
    totalAdded = RandomTotalAdded();
} while (totalAdded <= totalUsers);

totalUsersElement.textContent = 0;
totalAddedElement.textContent = 0;

animateCounter(totalUsersElement, totalUsers);
animateCounter(totalAddedElement, totalAdded);

checkCondition();

const percentageAddedUsers = document.querySelector(
    ".total_added .update .generated"
);
const percentageTotalUsers = document.querySelector(
    ".total_users .update .generated"
);
percentageAddedUsers.textContent =
    ((totalAdded / totalUsers) * 100).toFixed(2) + "%";
percentageTotalUsers.textContent =
    ((totalUsers / 10000) * 100).toFixed(2) + "%";

// !===================================== charts ======================================== //

// ? first chart
const doughnutData = {
    labels: ["New Customers", "Repeated"],
    datasets: [
        {
            label: "My Dataset",
            data: [12, 19],
            backgroundColor: ["#4880FF", "#F5F7FA"],
            borderColor: ["#F5F7FA", "#4880FF"],
            borderWidth: 1,
        },
    ],
};

const ctxDoughnut = document.getElementById("myChartDoughnut").getContext("2d");
const myChartDoughnut = new Chart(ctxDoughnut, {
    type: "doughnut",
    data: doughnutData,
    options: {
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    font: {
                        size: 16,
                        family: '"Nunito Sans", sans-serif',
                        weight: 400,
                    },
                    padding: 20,
                    boxWidth: 20,
                    usePointStyle: true,
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: 50,
        },
    },
});

// ? seconed chart
const randomData = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 10000)
);

const ctxone = document.getElementById("myLineChart").getContext("2d");

const gradient = ctxone.createLinearGradient(0, 0, 0, 200);
gradient.addColorStop(0, "#2D60FF");
gradient.addColorStop(1, "#2D60FF40");

const myNewChart = new Chart(ctxone, {
    type: "line",
    data: {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        datasets: [
            {
                label: "Yearly Data",
                data: randomData,
                backgroundColor: gradient,
                borderColor: "#1814F3",
                borderWidth: 2,
                tension: 0.5,
                fill: true,
            },
        ],
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    },
});

// ? third chart
const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Total Users",
            backgroundColor: "#1814F3",
            borderradius: 10,
            fill: true,
            data: [65, 59, 80, 81, 56, 55, 40],
        },
        {
            label: "Total Added",
            backgroundColor: "#16DBCC",
            borderradius: 10,
            data: [45, 30, 55, 70, 50, 40, 30],
        },
    ],
};

const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};


const ctx = document.getElementById("myChart").getContext("2d");

const myChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: options,
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


/*==================   sections fucntions    =================== */
const selectButtons = document.querySelectorAll('.select_button');
const checkboxes = document.querySelectorAll('.rowCheckbox');
let selectedRows = [];

// Checkbox select function
checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange);
});

function handleCheckboxChange() {
    const row = this.parentElement.parentElement;
    const rowIndex = Array.from(row.parentElement.children).indexOf(row);
    if (this.checked) {
        if (!selectedRows.includes(rowIndex)) {
            selectedRows.push(rowIndex);
        }
    } else {
        const index = selectedRows.indexOf(rowIndex);
        if (index !== -1) {
            selectedRows.splice(index, 1);
        }
    }
    console.log(selectedRows);
}

// Select button function
selectButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        const section = this.closest('.section'); // Find the parent container of the current select button
        const sectionCheckboxes = section.querySelectorAll('.rowCheckbox'); // Select checkboxes only within the current section

        if (button.innerHTML === "select all") {
            // Select all rows within the current section
            sectionCheckboxes.forEach(function (checkbox, index) {
                checkbox.checked = true;
                selectedRows.push(index);
            });
            console.log(selectedRows);
            button.innerHTML = 'cancel';
        } else {
            // Cancel selection within the current section
            sectionCheckboxes.forEach(function (checkbox) {
                checkbox.checked = false;
            });
            selectedRows = [];
            console.log(selectedRows);
            button.innerHTML = 'select all';
        }
    });
});



const dropDownMenus = document.querySelectorAll(".dropdown");
const optionsections = document.querySelectorAll('.options');
const Options = document.querySelectorAll('.menu li');

// Drop Down Menu functions
dropDownMenus.forEach(dropDownMenu => {
    const select = dropDownMenu.querySelector(".select");
    const caret = dropDownMenu.querySelector(".caret");
    const menu = dropDownMenu.querySelector(".menu");
    const Options = dropDownMenu.querySelectorAll('.menu li');
    const selected = dropDownMenu.querySelector('.selected');
    select.addEventListener("click", function () {
        caret.classList.toggle("rotate_caret");
        menu.classList.toggle("menu_open");
    });
    Options.forEach(option => {
        option.addEventListener("click", function () {
            selected.textContent = option.textContent;
            caret.classList.remove("rotate_caret");
            menu.classList.remove("menu_open");
        });
    });
});


// ? report dropdown functionality
const reportDropdown = document.querySelector(".report_dropdown");
const reportOptions = document.querySelectorAll('.report_options');
const reportOptionsMenu = document.querySelectorAll('.menu li');

// Drop Down Menu functions
const select = reportDropdown.querySelector(".select");
const caret = reportDropdown.querySelector(".caret");
const menu = reportDropdown.querySelector(".menu");
const selected = reportDropdown.querySelector('.selected');

select.addEventListener("click", function () {
    caret.classList.toggle("rotate_caret");
    menu.classList.toggle("menu_open");
});

reportOptionsMenu.forEach(option => {
    option.addEventListener("click", function () {
        selected.textContent = option.textContent;
        caret.classList.remove("rotate_caret");
        menu.classList.remove("menu_open");
    });
});

let reportglobalClickedItems = [];

function handleClick(event) {
    let localClickedItems = [];
    reportOptionsMenu.forEach(function (item) {
        if (item === event.target) {
            localClickedItems.push(item.textContent.trim());
            reportglobalClickedItems = localClickedItems;
        }
    });
    console.log(reportglobalClickedItems);
    return localClickedItems;
}
reportOptions.forEach(reportOption => {
    const reportOptionsMenus = reportOption.querySelectorAll('.menu li');
    reportOptionsMenus.forEach(function (item) {
        item.addEventListener('click', handleClick);
    });
});

// ? add button function

var newTab;
var addButton = document.querySelector('.add_button');

addButton.addEventListener('click', function () {
    newTab = window.open("about:blank", "_blank");
    if (newTab) {
        var newTabDocument = newTab.document;

        // Write HTML content to the new tab document
        newTabDocument.write(`
            <div class="container">
                <div class="row">
                    <div class="cell">
                        <label for="id">id :</label>
                        <input type="text" id="id">
                    </div>
                    <div class="cell">
                        <label for="date">date :</label>
                        <input type="text" id="date">
                    </div>
                </div>
                <div class="row">
            <div class="cell">
                <label for="iqMaster">iq Master :</label>
                <input type="text" id="iqMaster">
            </div>
            <div class="cell">
                <label for="updatedDate">updated Date :</label>
                <input type="text" id="updatedDate">
            </div>
        </div>
        <div class="row">
            <div class="cell">
                <label for="iqSlave">iq Slave :</label>
                <input type="text" id="iqSlave">
            </div>
            <div class="cell">
                <label for="iqLastLogin">iq Last Login :</label>
                <input type="text" id="iqLastLogin">
            </div>
        </div>
        <div class="row">
            <div class="cell">
                <label for="period">period :</label>
                <input type="text" id="period">
            </div>
            <div class="cell">
                <label for="addedBy">added By :</label>
                <input type="text" id="addedBy">
            </div>
        </div>
        <div class="row">
            <div class="cell">
                <label for="from">from :</label>
                <input type="text" id="from">
            </div>
            <div class="cell">
                <label for="uploadedBy">uploaded By :</label>
                <input type="text" id="uploadedBy">
            </div>
        </div>
        <div class="row">
            <div class="cell">
                <label for="to">to :</label>
                <input type="text" id="to">
            </div>
            <div class="cell">
                <label for="iqBalanceClient">iq Balance Client :</label>
                <input type="text" id="iqBalanceClient">
            </div>
        </div>
                <div class="buttons">
                    <button class="back">back</button>
                    <button class="add">add</button>
                </div>
            </div>
        `);

        addFilesToNewTab();
    } else {
        console.log("Failed to open new tab.");
    }
});
//? drop down menu funcitons

let globalClickedItems = [];
function handleClick(event) {
    let localClickedItems = [];
    Options.forEach(function (item) {
        if (item === event.target) {
            localClickedItems.push(item.textContent.trim());
            globalClickedItems = localClickedItems;
        }
    }); console.log(globalClickedItems);
    return localClickedItems;
}
optionsections.forEach(optionsection => {
    const Options = optionsection.querySelectorAll('.menu li');
    Options.forEach(function (item) {
        item.addEventListener('click', handleClick);
    });
    const applybutton = optionsection.querySelectorAll('.apply_button');
    applybutton.forEach(button => {
        button.addEventListener('click', function () {
            if (selectedRows.length === 0) {
                console.log('no selected rows');
            } else {
                checkEvent(globalClickedItems);
            }
        });
    });
});


function checkEvent(globalClickedItems) {
    globalClickedItems.forEach(function (item) {
        if (item === "view") {
            viewEvent();
        } else if (item === "update") {
            updateEvent();
        } else if (item === "delete") {
            deleteEvent();
        }
    });
}
function viewEvent() {
    for (let i = 0; i < selectedRows.length; i++) {
        setTimeout(() => {
            let newTab = window.open("about:blank", "_blank");
            if (newTab) {
                var newTabDocument = newTab.document;
                newTabDocument.write(`
        <header>
        <nav>
            <ul class="nav">
                <li>
                    <div id="digital-clock" class=" digital">
                        <div id="digital-time">
                            <div id="time" class="time"></div>
                            <div id="date" class="date"></div>
                        </div>
                    </div>
                </li>
                <li class="dark_mode_icon">
                    <i class="fa-regular fa-sun"></i>
                </li>
                <li class="notification">
                    <i class="far fa-bell"></i>
                </li>
                <li class="robot">
                    <img src="Robot.png" alt="" />
                </li>
            </ul>
        </nav>
    </header>
    <main>
        <table>
            <tbody>
                <tr>
                    <td>id</td>
                    <td><input type="text" value="295" readonly></td>
                    <td>Date:</td>
                    <td><input type="text" value="12-9-2024 03:12:25 PM" readonly></td>
                </tr>
                <tr>
                    <td>IQ Master:</td>
                    <td><input type="text" value="984465sjds@waterisgone.com" readonly></td>
                    <td>Updated Date:</td>
                    <td><input type="text" value="12-9-2024 03:12:25 PM" readonly></td>
                </tr>
                <tr>
                    <td>IQ Slave:</td>
                    <td><input type="text" value="Servicios@ecuadaterecovery.com" readonly></td>
                    <td>IQ last login:</td>
                    <td><input type="text" value="12-9-2024 03:12:25 PM" readonly></td>
                </tr>
                <tr>
                    <td>Period:</td>
                    <td><input type="text" value="366" readonly></td>
                    <td>Added by:</td>
                    <td><input type="text" value="Admin" readonly></td>
                </tr>
                <tr>
                    <td>From:</td>
                    <td><input type="text" value="12-9-2023" readonly></td>
                    <td>Uploaded by:</td>
                    <td><input type="text" value="Admin" readonly></td>
                </tr>
                <tr>
                    <td>to:</td>
                    <td><input type="text" value="12-9-2023" readonly></td>
                    <td>IQ balance client:</td>
                    <td><input type="text" value="0.06" readonly></td>
                </tr>

            </tbody>
        </table>
    </main>
        `);

                addFilesToNewTab();
            } else {
                console.log("Failed to open new tab.");
            }
        }, i * 2000); // Adjust the delay time as needed (in milliseconds)
    }
}

function updateEvent() {
    for (let i = 0; i < selectedRows.length; i++) {
        setTimeout(() => {
            let newTab = window.open("about:blank", "_blank");
            if (newTab) {
                var newTabDocument = newTab.document;

                newTabDocument.write(`
                <header>
                <nav>
                    <ul class="nav">
                        <li>
                            <div id="digital-clock" class=" digital">
                                <div id="digital-time">
                                    <div id="time" class="time"></div>
                                    <div id="date" class="date"></div>
                                </div>
                            </div>
                        </li>
                        <li class="dark_mode_icon">
                            <i class="fa-regular fa-sun"></i>
                        </li>
                        <li class="notification">
                            <i class="far fa-bell"></i>
                        </li>
                        <li class="robot">
                            <img src="Robot.png" alt="" />
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <table>
                    <tbody>
                        <tr>
                            <td>id</td>
                            <td><input type="text" value="295" ></td>
                            <td>Date:</td>
                            <td><input type="text" value="12-9-2024 03:12:25 PM"></td>
                        </tr>
                        <tr>
                            <td>IQ Master:</td>
                            <td><input type="text" value="984465sjds@waterisgone.com" ></td>
                            <td>Updated Date:</td>
                            <td><input type="text" value="12-9-2024 03:12:25 PM" ></td>
                        </tr>
                        <tr>
                            <td>IQ Slave:</td>
                            <td><input type="text" value="Servicios@ecuadaterecovery.com" ></td>
                            <td>IQ last login:</td>
                            <td><input type="text" value="12-9-2024 03:12:25 PM" ></td>
                        </tr>
                        <tr>
                            <td>Period:</td>
                            <td><input type="text" value="366" ></td>
                            <td>Added by:</td>
                            <td><input type="text" value="Admin" ></td>
                        </tr>
                        <tr>
                            <td>From:</td>
                            <td><input type="text" value="12-9-2023" ></td>
                            <td>Uploaded by:</td>
                            <td><input type="text" value="Admin" ></td>
                        </tr>
                        <tr>
                            <td>to:</td>
                            <td><input type="text" value="12-9-2023" ></td>
                            <td>IQ balance client:</td>
                            <td><input type="text" value="0.06" ></td>
                        </tr>
                    </tbody>
                </table>
                <div class="buttons">
                    <button class="back_button">back</button>
                    <button class="save_button">save</button>
                </div>
            </main>
                `);

                addFilesToNewTab();
            } else {
                console.log("Failed to open new tab.");
            }
        }, i * 2000);
    }
}
function addFilesToNewTab() {
    var cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.type = 'text/css';
    cssLink.href = 'outpages.css';

    var fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';

    var chartScript = document.createElement('script');
    chartScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';

    var customScript = document.createElement('script');
    customScript.src = 'outpages.js';


    newTab.document.head.appendChild(cssLink);
    newTab.document.head.appendChild(fontAwesomeLink);
    newTab.document.head.appendChild(chartScript);
    newTab.document.body.appendChild(customScript);
}



const popup = document.getElementById('popup');
const popupLayout = document.querySelector('.popup_layout');
const closeButton = document.getElementById('closeButton');
const overlay = document.getElementById('overlay');

function showPopup() {
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function hidePopup(event) {
    if (event.target === overlay || event.target === closeButton) {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }
}

document.addEventListener('click', hidePopup);

function deleteEvent() {
    console.log('delete');
    showPopup();
}
const confirmButton = document.getElementById('confirm');

confirmButton.addEventListener('click', function() {
    popupLayout.innerHTML = '<h2>Deleted Successfully</h2>';
});



/* ============== settings functions =============== */

const settingsButtons = document.querySelectorAll('.settings_head > div');
const settingsSections = document.querySelectorAll('.settings_body > div');

// ? show profile image
function previewImage(event) {
    const profileSettingImage = document.getElementById('preview');
    const profileImage = document.querySelector(".robot img");
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        profileSettingImage.src = reader.result;
        profileImage.src = reader.result;
        profileSettingImage.style.display = 'block';
        profileImage.style.display = 'block';

        // Save the image data URL to local storage
        localStorage.setItem('profileImage', reader.result);
    }

    if (file) {
        reader.readAsDataURL(file);
    }
}

// Check if there's a saved image in local storage on page load
window.onload = function() {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        const profileSettingImage = document.getElementById('preview');
        const profileImage = document.querySelector(".robot img");
        profileSettingImage.src = savedImage;
        profileImage.src = savedImage;
        profileSettingImage.style.display = 'block';
        profileImage.style.display = 'block';
    }
}




settingsButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        settingsButtons.forEach(function(btn) {
            btn.classList.remove('activeSettings_button');
        });
        settingsSections.forEach(function(section) {
            section.classList.remove('activeSettings_section');
        });
        button.classList.add('activeSettings_button');
        const index = Array.from(settingsButtons).indexOf(button);
        if (index !== -1 && index < settingsSections.length) {
            settingsSections[index].classList.add('activeSettings_section');
        }
    });
});

const securityCheckBox = document.querySelector('#authentication');
const statusCheckBox = document.querySelector('.authentication > h2');

securityCheckBox.addEventListener('change', function() {
    statusCheckBox.textContent = securityCheckBox.checked ? 'Enabled two-factor authentication' : 'Disabled two-factor authentication';
});

const notificationIcon = document.querySelector('.notification');
const settings_button = document.querySelector('.settings_button');
const settings_section = document.querySelector('.settings');
const notifications_section = document.querySelector('.notification_section');
const notificationbutton = document.querySelector('.notification_button');
const editprofile_button = document.querySelector('.editProfile_button');
const editprofile_section = document.querySelector('.editprofile_section');
const profile_image = document.querySelector('.robot img');
notificationIcon.addEventListener('click', function() {
    activeButtons.forEach(function(btn) {
        btn.classList.remove('active_button');
    });
    settings_button.classList.add("active_button");
    activeLayout.forEach(function(layout) {
        layout.classList.remove('active_layout');
    });
    settings_section.classList.add('active_layout');
    settingsSections.forEach(function(section) {
        section.classList.remove('activeSettings_section');
    });
    notifications_section.classList.add('activeSettings_section');
    settingsButtons.forEach(function(button) {
        button.classList.remove('activeSettings_button');
    });
    notificationbutton.classList.add('activeSettings_button');
});

profile_image.addEventListener('click', function(){
    activeButtons.forEach(function(btn) {
        btn.classList.remove('active_button');
    });
    settings_button.classList.add('active_button');
    activeLayout.forEach(function(layout) {
        layout.classList.remove('active_layout');
    });
    settings_section.classList.add('active_layout');
    settingsSections.forEach(function(section) {
        section.classList.remove('activeSettings_section');
    });
    editprofile_section.classList.add('activeSettings_section');
    settingsButtons.forEach(function(button) {
        button.classList.remove('activeSettings_button');
    });
    editprofile_button.classList.add('activeSettings_button');
});




