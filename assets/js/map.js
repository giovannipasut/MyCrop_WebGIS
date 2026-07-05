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

        onEachFeature: function(feature, layer){

            layer.on({

                mouseover: function(){

                    layer.setStyle({
                        color: "#2196f3",
                        weight: 2
                    });

                },

                mouseout: function(){

                    uavGridLayer.resetStyle(layer);

                },

                click: function(){

                    console.log("Selected cell:", feature.properties.cell_id);

                }

            });

        }

    }).addTo(map);

    map.fitBounds(uavGridLayer.getBounds());

})
.catch(error => {

    console.error(error);

});