// ==========================================
// MYCROP WEBGIS
// ==========================================

// Coordinate del campo sperimentale

const field = [52.238111, 6.865472];

// Creazione mappa

const map = L.map('leaflet-map', {

    zoomControl: true

}).setView(field, 18);

// Basemap OpenStreetMap

L.tileLayer(

    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

    {

        maxZoom: 22,

        attribution: '© OpenStreetMap'

    }

).addTo(map);

// ==========================================
// UAV GRID (GeoServer WFS)
// ==========================================

let uavGridLayer = null;
let selectedLayer = null;
let currentStressMap = {};

fetch(
    "http://win924.ad.utwente.nl/geoserver/ClimateCenter/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ClimateCenter:mycrop_uav_grid&outputFormat=application/json&srsName=EPSG:4326"
)
    .then(response => response.json())
    .then(data => {

        console.log("Features:", data.features.length);

        uavGridLayer = L.geoJSON(data, {

            style: {
                color: "#222",
                weight: 0.6,
                fillOpacity: 0
            },

            onEachFeature: function (feature, layer) {

                layer.on({

                    mouseover: function () {

                        if (layer === selectedLayer) return;

                        layer.setStyle({

                            color: "#0066ff",

                            weight: 2.5

                        });

                    },

                    mouseout: function () {

                        if (layer === selectedLayer) return;

                        applyCellStyle(layer);

                    },

                    click: function () {

                        if (selectedLayer) {

                            const oldLayer = selectedLayer;

                            selectedLayer = null;

                            applyCellStyle(oldLayer);

                        }

                        selectedLayer = layer;

                        selectedCell = feature.properties.cell_id;

                        applyCellStyle(layer);

                        console.log("Selected cell:", selectedCell);

                        updateUAVChart();

                    }

                });

            }

        }).addTo(map);

        map.fitBounds(uavGridLayer.getBounds());

    })
    .catch(error => {

        console.error(error);

    });


// function getStressStyle(cellId) for retrieving the style of a cell based on its stress value
function applyCellStyle(layer) {

    const cellId = layer.feature.properties.cell_id;

    const stress = currentStressMap[cellId];

    let fill = "#ffffff";
    let opacity = 0;

    if (stress !== undefined) {

        opacity = 0.8;

        if (stress < 0.5)
            fill = "#0b7d3b";

        else if (stress < 1.5)
            fill = "#9bd35a";

        else if (stress < 2.5)
            fill = "#fff6a0";

        else if (stress < 3.5)
            fill = "#ff944d";

        else
            fill = "#b30000";
    }

    layer.setStyle({

        color: layer === selectedLayer ? "#0066ff" : "#222",

        weight: layer === selectedLayer ? 3 : 0.6,

        fillColor: fill,

        fillOpacity: opacity

    });

}

// function colorGrid(stressMap) for coloring the UAV grid based on the stress values

function colorGrid(stressMap) {

    currentStressMap = stressMap;

    if (!uavGridLayer) return;

    uavGridLayer.eachLayer(layer => {

        applyCellStyle(layer);

    });

}

layer.setStyle({

    color: "#222",
    weight: 0.6,
    fillColor: fill,
    fillOpacity: opacity

});

