// ==========================================
// DASHBOARD CONTROLLER
// ==========================================

// Global state

let selectedDate = null;
let selectedCell = null;
let uavDatabase = [];


// ==========================================
// DATE SELECTION
// ==========================================

function selectDate(date) {

    selectedDate = date;
    selectedCell = null;

    console.clear();

    console.log("=================================");
    console.log("New survey selected");
    console.log("Date :", selectedDate);
    console.log("Cell :", selectedCell);
    console.log("=================================");

    updateDashboard();

}


// ==========================================
// CELL SELECTION
// ==========================================

function selectCell(cellId) {

    selectedCell = cellId;

    console.log("Selected cell:", selectedCell);

}

// ==========================================
// UAV DATABASE
// ==========================================

async function loadUAVDatabase() {

    const response = await fetch("data/UAV_database.csv");

    const text = await response.text();

    const rows = text.trim().split("\n");

    const headers = rows[0].split(",");

    uavDatabase = rows.slice(1).map(row => {

        const values = row.split(",");

        let obj = {};

        headers.forEach((h, i) => {

            obj[h.trim()] = values[i].trim();

        });

        obj.cell_id = Number(obj.cell_id);
        obj.Stress = Number(obj.Stress);

        return obj;

    });

    console.log("=================================");
    console.log("UAV database loaded");
    console.log("Records:", uavDatabase.length);
    console.log("=================================");

}

// ==========================================
// DASHBOARD UPDATE
// ==========================================

function updateDashboard() {

    updateSentinelSection();

    updateUAVLayer();

    updateUAVChart();

}


// ==========================================
// SENTINEL
// ==========================================

function updateSentinelSection() {

    if (!selectedDate) return;

    const selectedYear = selectedDate.substring(0, 4);

    const filteredData = sentinelData.filter(row => {

        return (
            row.year.toString() === selectedYear &&
            row.date <= selectedDate
        );

    });

    console.log("Selected year:", selectedYear);
    console.log("Sentinel records:", filteredData.length);

    updateSentinelChart(filteredData);

}


// ==========================================
// UAV LAYER
// ==========================================

function updateUAVLayer() {

    if (!selectedDate) return;

    const uavDate = selectedDate.replace(/-/g, "_");

    const stressMap = {};

    uavDatabase
        .filter(row => row.date === uavDate)
        .forEach(row => {

            stressMap[row.cell_id] = row.Stress;

        });

    console.log("=================================");
    console.log("Updating UAV layer");
    console.log("Date:", uavDate);
    console.log("Cells:", Object.keys(stressMap).length);
    console.log("=================================");

    colorGrid(stressMap);

}


// ==========================================
// UAV CHART
// ==========================================

function updateUAVChart() {

    if (!selectedDate) return;
    if (!selectedCell) return;

    console.log("Date:", selectedDate);
    console.log("Cell:", selectedCell);

}

document.querySelectorAll(".index-pill").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

        if (selectedDate) {

            updateSentinelSection();

        }

    });

});

// ==========================================
// INITIALIZATION
// ==========================================

loadUAVDatabase();