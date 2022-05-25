var geojsonFiles = ['./data/naturereserve.geojson', './data/fire.geojson', './data/zones.geojson', './data/circles.geojson'];

var map = L.map('map', { zoomControl: false }).setView([57.621816, 14.925924], 17);

function getStyle(name) 
{
    switch (name) 
    {
        case 'naturereserve': 
            return {
                "fillColor": '#E31A1C',
                "weight": 1,
                "opacity": 1,
                "color": '#ff7800',
                "dashArray": '5',
                "fillOpacity": 0
            };
        case 'zones':   
            return {
                "weight": 2,
                "opacity": 0.75,
                "color": '#34cceb',
                // "dashArray": '5',
                "fillOpacity": 0
            };
        case 'fire': 
            return {
                "weight": 3,
                "opacity": 0.75,
                "color": '#ff3322',
                "fillOpacity": 0
            };
        case 'circles':   
            return {
                "weight": 1,
                "opacity": 1,
                "color": '#ffff00',
                "fillOpacity": 0
            };
        default:           
            return {
                "fillColor": '#E31A1C',
                "weight": 1,
                "opacity": 1,
                "color": '#ff7800',
                "dashArray": '5',
                "fillOpacity": 0
            };
    }
}
    
//loop through geojsonfiles, use fetch to download them and add as a layer to the map
for (var i = 0; i < geojsonFiles.length; i++) 
{
    fetch(geojsonFiles[i]).then(response => response.json()).then(response => 
    {
        L.geoJson(response, {style: getStyle(response.name)} ).addTo(map);
    });
}

    // var options = { 
    //   corridor: 5,
    //   className: 'route-corridor'
    // };

	// //Loop through fire features and add a corridor for all coordinates
	// for (var i = 0; i < fire.features.length; i++) {
	// 	// console.log(fire.features[i].type + i);
	// 	var coordinates = fire.features[i].geometry.coordinates;
	// 	map.addLayer(L.corridor(coordinates, options));
	// }

var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 20,
    attribution: 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    // id: 'mapbox/streets-v11',
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);