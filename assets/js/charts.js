
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

    sentinelChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: [],

            datasets: []

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            interaction: {

                mode: "index",

                intersect: false

            },

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    min: 0,

                    max: 1

                }

            }

        }

    });

}


// BUILD SENTINEL DATASETS


function buildSentinelDatasets(data) {

    const datasets = [];

    // NDVI
    if (document.querySelector("#sentinel-selector .ndvi").classList.contains("active")) {

        datasets.push({

            label: "NDVI",
            data: data.map(row => row["mean NDVI"]),
            borderColor: "#2f6fdb",
            backgroundColor: "#2f6fdb",
            tension: 0.25

        });

    }

    // GNDVI
    if (document.querySelector("#sentinel-selector .gndvi").classList.contains("active")) {

        datasets.push({

            label: "GNDVI",
            data: data.map(row => row["mean GNDVI"]),
            borderColor: "#ef6c00",
            backgroundColor: "#ef6c00",
            tension: 0.25

        });

    }

    // NDRE
    if (document.querySelector("#sentinel-selector .ndre").classList.contains("active")) {

        datasets.push({

            label: "NDRE",
            data: data.map(row => row["mean NDRE"]),
            borderColor: "#f9a825",
            backgroundColor: "#f9a825",
            tension: 0.25

        });

    }

    // NDMI
    if (document.querySelector("#sentinel-selector .ndmi").classList.contains("active")) {

        datasets.push({

            label: "NDMI",
            data: data.map(row => row["mean NDMI"]),
            borderColor: "#2e7d32",
            backgroundColor: "#2e7d32",
            tension: 0.25

        });

    }

    // MSI
    if (document.querySelector("#sentinel-selector .msi").classList.contains("active")) {

        datasets.push({

            label: "MSI",
            data: data.map(row => row["mean MSI"]),
            borderColor: "#9c27b0",
            backgroundColor: "#9c27b0",
            tension: 0.25

        });

    }

    return datasets;

}

// UPDATE SENTINEL CHART


function updateSentinelChart(data) {

    sentinelChart.data.labels = data.map(row => row.date);

    sentinelChart.data.datasets = buildSentinelDatasets(data);

    sentinelChart.update();

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

            maintainAspectRatio: false,

            interaction: {

                mode: "index",
                intersect: false

            },

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                y: {

                    min: 0,
                    max: 1

                }

            }

        }

    });

}

// BUILD UAV DATASETS

function buildUAVDatasets(data) {

    const datasets = [];

    // NDVI
    if (document.querySelector("#uav-selector .ndvi").classList.contains("active")) {

        datasets.push({

            label: "NDVI",
            data: data.map(row => row.NDVI),
            borderColor: "#2f6fdb",
            backgroundColor: "#2f6fdb",
            tension: 0.25

        });

    }

    // GNDVI
    if (document.querySelector("#uav-selector .gndvi").classList.contains("active")) {

        datasets.push({

            label: "GNDVI",
            data: data.map(row => row.GNDVI),
            borderColor: "#ef6c00",
            backgroundColor: "#ef6c00",
            tension: 0.25

        });

    }

    // NDRE
    if (document.querySelector("#uav-selector .ndre").classList.contains("active")) {

        datasets.push({

            label: "NDRE",
            data: data.map(row => row.NDRE),
            borderColor: "#f9a825",
            backgroundColor: "#f9a825",
            tension: 0.25

        });

    }

    return datasets;

}

function updateUAVChartGraph(data) {

    uavChart.data.labels = data.map(row => row.date);

    uavChart.data.datasets = buildUAVDatasets(data);

    uavChart.update();

}


// ==========================================
// FULLSCREEN
// ==========================================

function toggleFullscreen(chartId) {

    const chartBox = document
        .getElementById(chartId)
        .closest(".chart-box");

    if (!document.fullscreenElement) {

        chartBox.requestFullscreen();

    } else {

        document.exitFullscreen();

    }

}
// listener for fullscreen button
document
    .getElementById("fullscreenSentinel")
    .addEventListener("click", () => {

        toggleFullscreen("sentinelChart");

    });

document
    .getElementById("fullscreenUAV")
    .addEventListener("click", () => {

        toggleFullscreen("uavChart");

    });