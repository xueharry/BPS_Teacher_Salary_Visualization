// Main logic for leaflet map

var boston_coordinates = [42.33, -71.0589];

var map = L.map('map').setView(boston_coordinates, 12);
mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
dataLink = '<a href="https://data.cityofboston.gov">CityofBoston<a/>';
githubLink = '<a href="https://github.com/xueharry/BPS_Teacher_Salary_Visualization">Github</a>';

L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; ' + mapLink + ' | Salary data &copy; ' + dataLink + ' | ' + githubLink,
    maxZoom: 18,
    }).addTo(map);

var salary_data;

// Get salary data
$.getJSON('data/salaries.json', function(json) {
    salary_data = json;

    // Fuse search options
    var searchOptions = {
        title: 'Search for a high school',
        placeholder: 'Search for a high school'
    };

    // Add search control
    var searchCtrl = L.control.fuseSearch(searchOptions);
    searchCtrl.addTo(map);

    // Index features
    searchCtrl.indexFeatures(schools, ['SCH_NAME', 'ADDRESS', 'CITY']);

    // Add school marker
        var myLayer = L.geoJson(schools, {
            onEachFeature: onEachFeatureOption,
            pointToLayer: pointToLayerOption,
            style: style
        }).addTo(map);

    // pointToLayer option to generate CircleMarker instead of default marker
    function pointToLayerOption(feature, latlng) {
        return L.circleMarker(latlng);
    }

    // Add popups
    function onEachFeatureOption(feature, layer){
        // Bind layer to feature
        feature.layer = layer;

        if (feature.properties.SCH_NAME) {
            layer.bindPopup('<b>' + feature.properties.SCH_NAME + '</b> </br>' 
                + 'Mean salary: $' + salary_data[feature.properties.SCH_NAME]['mean'] + '</br>'
                + 'Median salary: $' + salary_data[feature.properties.SCH_NAME]['median']);
        }
    }

    // Custom style for circles
    function style(feature) {
        return {
            // Color is based on median salary
            fillColor: getColor(salary_data[feature.properties.SCH_NAME]['median']),
            color: "#000",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.9
        };
    }

    // Legend to explain the color scheme
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [50000, 60000, 70000, 80000, 90000],
            labels = [];

        div.innerHTML += '<p><b>Median Teacher Salary ($)</b></p>';

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? ' &ndash; ' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };

    legend.addTo(map);

});

// Calculates the color value using color scheme generated at colorbrewer2.org
function getColor(d) {
    return  d > 90000 ? '#a63603':
            d > 80000 ? '#e6550d':
            d > 70000 ? '#fd8d3c':
            d > 60000 ? '#fdae6b':
                        '#feedde';
}
