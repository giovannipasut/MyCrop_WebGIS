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
let selectedCell = null;
let selectedCellId = null;
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

                        layer.setStyle({
                            color: "#2196f3",
                            weight: 2
                        });

                    },

                    mouseout: function () {

                        uavGridLayer.resetStyle(layer);

                    },

                    click: function () {

                        // ripristina la cella precedente
                        if (selectedCell) {

                            uavGridLayer.resetStyle(selectedCell);

                        }

                        // salva nuova selezione
                        selectedCell = layer;
                        selectedCellId = feature.properties.cell_id;

                        // evidenzia
                        layer.setStyle({

                            color: "#0066ff",
                            weight: 3

                        });

                        console.log("Selected cell:", selectedCellId);

                    }

                });

            }

        }).addTo(map);

        map.fitBounds(uavGridLayer.getBounds());

    })
    .catch(error => {

        console.error(error);

    });

function colorGrid(stressMap) {

    currentStressMap = stressMap;

    if (!uavGridLayer) return;

    uavGridLayer.eachLayer(function(layer){

        const cell = layer.feature.properties.cell_id;

        const value = stressMap[cell];

        let fill = "#ffffff";
        let opacity = 0;

        if (value !== undefined) {

            opacity = 0.8;

            if (value < 0.5)
                fill = "#0b7d3b";

            else if (value < 1.5)
                fill = "#9bd35a";

            else if (value < 2.5)
                fill = "#fff6a0";

            else if (value < 3.5)
                fill = "#ff944d";

            else
                fill = "#b30000";

        }

        layer.setStyle({

            color: "#222",
            weight: 0.6,
            fillColor: fill,
            fillOpacity: opacity

        });

    });

}