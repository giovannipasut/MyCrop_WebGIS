
// ==========================================
// CHARTS
// ==========================================

let sentinelChart = null;
let uavChart = null;


// ==========================================
// INITIALIZATION
// ==========================================

loadSentinelData();
createUAVChart();
let sentinelData = [];


// ==========================================
// SENTINEL
// ==========================================

// Load Sentinel Data 
function loadSentinelData() {

    Papa.parse("data/sentinel_database.csv", {

        download: true,

        header: true,

        dynamicTyping: true,

        complete: function (results) {

            sentinelData = results.data.filter(row => row.date);

            console.log("Sentinel database loaded");
            console.log(sentinelData);

            createSentinelChart();

        }

    });

}

// chart creation function

function createSentinelChart() {

    const ctx = document
        .getElementById("sentinelChart")
        .getContext("2d");
    console.log("Sentinel canvas:", ctx);
    sentinelChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: [],

            datasets: []

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}


// ==========================================
// UAV
// ==========================================

function createUAVChart() {

    const ctx = document
        .getElementById("uavChart")
        .getContext("2d");
    console.log("UAV canvas:", ctx);
    uavChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: [],

            datasets: []

        },

        options: {

            responsive: true,

            maintainAspectRatio: false

        }

    });

}