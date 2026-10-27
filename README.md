# MyCrop WebGIS

## Overview

MyCrop WebGIS is an interactive web-based platform for multi-temporal crop stress monitoring. It integrates geospatial data and remote sensing products to support the visualization and analysis of agricultural field conditions.

The platform focuses on UAV-based multispectral and thermal imagery, enabling users to explore vegetation indices, monitor their temporal evolution, and investigate spatial patterns of crop stress.

## Main Features

- **Interactive mapping:** visualization of the study area and geospatial datasets.
- **Data collection:** overview of remote sensing data acquisition campaigns.
- **Data analysis:** visualization and exploration of vegetation indices.
- **Multi-temporal monitoring:** comparison of crop conditions across different acquisition dates.
- **Crop stress visualization:** spatial exploration of indicators related to crop health.

## Technologies

- HTML5
- CSS3 / SCSS
- JavaScript
- Leaflet
- Chart.js
- GeoServer

## Repository Structure

- `index.html` — main landing page
- `map.html` — interactive map
- `data_collection.html` — data acquisition information
- `analysis.html` — data analysis dashboard
- `field_indices.html` — vegetation indices information
- `assets/` — stylesheets, scripts, and supporting resources
- `images/` — images used by the interface
- `data/` — data resources used by the WebGIS

## Related Repository

The [MyCrop_processing](https://github.com/giovannipasut/MyCrop_processing) repository contains the Python-based geospatial processing workflows used to prepare and analyse UAV-derived datasets.

Together, the two repositories support a workflow from remote sensing data processing to interactive visualization of crop conditions.

## License

See `LICENSE.txt` for licensing information.
