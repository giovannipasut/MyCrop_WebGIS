const months = [
    "March",
    "April",
    "May",
    "June",
    "July",
    "August"
];

let currentYear = 2025;
let currentMonth = 3;
let surveyData = [];

// function to draw the calendar for the current month and year

function drawCalendar() {

    document.getElementById("monthTitle").innerHTML =
        months[currentMonth - 3] + " " + currentYear;

    const calendar = document.getElementById("calendar");

    calendar.innerHTML = "";

    const firstDay = new Date(currentYear, currentMonth - 1, 1);

    const start = (firstDay.getDay() + 6) % 7;

    const days = new Date(currentYear, currentMonth, 0).getDate();

    // caselle vuote iniziali

    for (let i = 0; i < start; i++) {

        const empty = document.createElement("div");

        empty.className = "empty";

        calendar.appendChild(empty);

    }

    // giorni del mese

    for (let d = 1; d <= days; d++) {

        const day = document.createElement("div");

        day.className = "day";

        const monthString = String(currentMonth).padStart(2, "0");

        const dayString = String(d).padStart(2, "0");

        const fullDate = `${currentYear}-${monthString}-${dayString}`;

        const survey = surveyData.find(s => s.date === fullDate);

        if (survey) {

            if (survey.uav === 1 && survey.sentinel === 1) {

                day.classList.add("both");

            }

            else if (survey.uav === 1) {

                day.classList.add("uav");

            }

            else if (survey.sentinel === 1) {

                day.classList.add("sentinel");

            }

        }

        day.innerHTML = d;

        // only available dates can be selected, so we add an event listener only if the survey exists for that date
        if (survey) {

            day.addEventListener("click", () => {

                selectDate(fullDate);

            });

        }

        calendar.appendChild(day);

    }

}

// function to load survey data from CSV file
async function loadSurvey() {

    const response = await fetch("data/survey.csv");

    const text = await response.text();

    const rows = text.trim().split("\n");

    const headers = rows[0].split(",");

    surveyData = rows.slice(1).map(row => {

        const values = row.split(",");

        return {

            year: Number(values[0]),

            date: values[1],

            uav: Number(values[2]),

            sentinel: Number(values[3])

        };

    });

}

// initialize the calendar and load survey data
async function initialize() {

    await loadSurvey();

    drawCalendar();

}

initialize();;

// event listeners for month navigation and year selection
document.getElementById("prevMonth").onclick = () => {

    currentMonth--;

    if (currentMonth < 3) {

        currentMonth = 8;

    }

    drawCalendar();

}

document.getElementById("nextMonth").onclick = () => {

    currentMonth++;

    if (currentMonth > 8) {

        currentMonth = 3;

    }

    drawCalendar();

}

document.querySelectorAll(".year-btn").forEach(btn => {

    btn.onclick = () => {

        document.querySelectorAll(".year-btn").forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        currentYear = parseInt(btn.dataset.year);

        drawCalendar();

    }

});