
// ==========================================
// CHARTS
// ==========================================

let sentinelChart = null;
let uavChart = null;

// ==========================================
// UAV STRESS BACKGROUND PLUGIN (this plugin is not fully implemented yet, now it only logs the stress data to the console)
// ==========================================

const stressBackgroundPlugin = {

    id: "stressBackground",

    beforeDatasetsDraw(chart) {

        if (!chart.stressData) return;

        const { ctx, chartArea, scales } = chart;

        const xScale = scales.x;

        const n = chart.stressData.length;

        ctx.save();

        for (let i = 0; i < n; i++) {

            const x = xScale.getPixelForValue(i);

            let left;
            let right;

            if (i === 0) {
                left = chartArea.left;
            } else {
                const prev = xScale.getPixelForValue(i - 1);
                left = (prev + x) / 2;
            }

            if (i === n - 1) {
                right = chartArea.right;
            } else {
                const next = xScale.getPixelForValue(i + 1);
                right = (x + next) / 2;
            }

            const stress = chart.stressData[i].Stress;

            switch (stress) {

                case 0:
                    ctx.fillStyle = "rgba(46,125,50,0.18)";
                    break;

                case 0.5:
                    ctx.fillStyle = "rgba(102,187,106,0.20)";
                    break;

                case 1:
                    ctx.fillStyle = "rgba(173,214,107,0.22)";
                    break;

                case 1.5:
                    ctx.fillStyle = "rgba(220,237,151,0.24)";
                    break;

                case 2:
                    ctx.fillStyle = "rgba(255,245,157,0.28)";
                    break;

                case 2.5:
                    ctx.fillStyle = "rgba(255,224,130,0.26)";
                    break;

                case 3:
                    ctx.fillStyle = "rgba(255,183,77,0.24)";
                    break;

                case 3.5:
                    ctx.fillStyle = "rgba(255,138,101,0.22)";
                    break;

                case 4:
                    ctx.fillStyle = "rgba(211,47,47,0.20)";
                    break;

                default:
                    ctx.fillStyle = "rgba(220,220,220,0.08)";
            }

            ctx.fillRect(
                left,
                chartArea.top,
                right - left,
                chartArea.bottom - chartArea.top
            );

        }

        ctx.restore();

    }

};


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

        plugins: [stressBackgroundPlugin],

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

    uavChart.stressData = data; // Store the stress data for later use in the graph coloring function

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