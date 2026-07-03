// ==========================================
// DASHBOARD CONTROLLER
// ==========================================

// Global state

let selectedDate = null;
let selectedCell = null;


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

    console.log("UAV layer updated");

}


// ==========================================
// UAV CHART
// ==========================================

function updateUAVChart() {

    console.log("UAV chart updated");

}

document.querySelectorAll(".index-pill").forEach(button => {

    button.addEventListener("click", () => {

        button.classList.toggle("active");

    });

});