// import colorPalette from "@/constants/colorPalette";

// const {
//     COLOR_LANDSCAPE,
//     COLOR_BORDERS,
//     COLOR_WATER,
//     COLOR_LINE,
//     COLOR_POINT_FILL,
//     COLOR_SELECTED_POINT
// } = colorPalette;

// const COLORS = {
//     BORDERS: COLOR_BORDERS,
//     LANDSCAPE: COLOR_LANDSCAPE,
//     LINE: COLOR_LINE,
//     POINT: COLOR_SELECTED_POINT,
//     POINT_FILL: COLOR_POINT_FILL,
//     WATER: COLOR_WATER
// };

// const POINT_MARKER_ICON_CONFIG = {
//     path: "M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
//     // path: "M5 11C6.2 10.2 8 5.857 8 4.2 8 2.543 6.657 1.2 5 1.2 3.343 1.2 2 2.543 2 4.2 2 5.857 3.8 10.2 5 11ZM5 5.8C5.884 5.8 6.6 5.084 6.6 4.2 6.6 3.316 5.884 2.6 5 2.6 4.116 2.6 3.4 3.316 3.4 4.2 3.4 5.084 4.116 5.8 5 5.8Z",
//     strokeOpacity: 1,
//     strokeWeight: 1, //4
//     strokeColor: COLORS.POINT,
//     fillColor: COLORS.POINT_FILL,
//     fillOpacity: 1, //0.7,
//     scale: 2 //1
// };

// const LINE_SYMBOL_CONFIG = {
//     path: "M 0,-2 0,2",
//     strokeOpacity: 1,
//     strokeWeight: 4, //3
//     scale: 1
// };

// const LINE_PATH_CONFIG = {
//     clickable: false,
//     geodesic: false,
//     strokeOpacity: 0,
//     strokeColor: COLORS.LINE,
//     icons: [{
//         icon: LINE_SYMBOL_CONFIG,
//         repeat: "13px" //"10px"
//     }]
// };

// const mapSettings = {
//     clickableIcons: true,
//     streetViewControl: false,
//     panControlOptions: false,
//     gestureHandling: "cooperative",
//     // backgroundColor: COLORS.LANDSCAPE,
//     mapTypeControl: false,
//     zoomControlOptions: {
//         style: "SMALL"
//     },
//     zoom: 15,
//     minZoom: 2,
//     maxZoom: 25,
// styles: [{
//         "elementType": "geometry",
//         "stylers": [{
//             "color": "#f5f5f5"
//         }]
//     },
//     {
//         "elementType": "labels.icon",
//         "stylers": [{
//             "visibility": "off"
//         }]
//     },
//     {
//         "elementType": "labels.text.fill",
//         "stylers": [{
//             "color": "#616161"
//         }]
//     },
//     {
//         "elementType": "labels.text.stroke",
//         "stylers": [{
//             "color": "#f5f5f5"
//         }]
//     },
//     {
//         "featureType": "administrative.land_parcel",
//         "elementType": "labels.text.fill",
//         "stylers": [{
//             "color": "#bdbdbd"
//         }]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "geometry",
//         "stylers": [{
//             "color": "#eeeeee"
//         }]
//     },
//     {
//         "featureType": "poi",
//         "elementType": "labels.text.fill",
//         "stylers": [{
//             "color": "#757575"
//         }]
//     },
//     {
//         "featureType": "poi.business",
//         "stylers": [{
//             "visibility": "off"
//         }]
//     },
//     {
//         "featureType": "poi.park",
//         "elementType": "geometry",
//         "stylers": [{
//             "color": "#e5e5e5"
//         }]
//     },
//     {
//         "featureType": "poi.park",
//         "elementType": "geometry.fill",
//         "stylers": [{
//             "color": "#e4efe4"
//         }]
//     },
//     {
//         "featureType": "poi.park",
//         "elementType": "labels.text",
//         "stylers": [{
//             "visibility": "off"
//         }]
//     },
//     {
//         "featureType": "poi.park",
//         "elementType": "labels.text.fill",
//         "stylers": [{
//             "color": "#9e9e9e"
//         }]
//     },
//     {
//         "featureType": "road",
//         "elementType": "geometry",
//         "stylers": [{
//             "color": "#ffffff"
//         }]
//     },
//     {
//         "featureType": "road.arterial",
//         "elementType": "labels.text.fill",
//         "stylers": [{
//             "color": "#757575"
//         }]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "geometry",
//         "stylers": [{
//             "color": "#dadada"
//         }]
//     },
//     {
//         "featureType": "road.highway",
//         "elementType": "labels.text.fill",
//         "stylers": [{
//             "color": "#616161"
//         }]
//     },
//     {
//         "featureType": "road.local",
//         "elementType": "labels.text.fill",
//         "stylers": [{
//             "color": "#9e9e9e"
//         }]
//     },
//     {
//         "featureType": "transit.line",
//         "elementType": "geometry",
//         "stylers": [{
//             "color": "#e5e5e5"
//         }]
//     },
//     {
//         "featureType": "transit.station",
//         "elementType": "geometry",
//         "stylers": [{
//             "color": "#eeeeee"
//         }]
//     },
//     {
//         "featureType": "water",
//         "elementType": "geometry",
//         "stylers": [{
//             "color": "#c9c9c9"
//         }]
//     },
//     {
//         "featureType": "water",
//         "elementType": "geometry.fill",
//         "stylers": [{
//             "color": "#e0e8e9"
//         }]
//     },
//     {
//         "featureType": "water",
//         "elementType": "labels.text.fill",
//         "stylers": [{
//             "color": "#9e9e9e"
//         }]
//     }
// ],
// }

// // export { mapSettings };

// export { mapSettings, LINE_PATH_CONFIG, POINT_MARKER_ICON_CONFIG };
// // export { mapSettings, LINE_PATH_CONFIG };

import colorPalette from "@/constants/colorPalette";

const {
    COLOR_LANDSCAPE,
    COLOR_BORDERS,
    COLOR_WATER,
    COLOR_LINE,
    COLOR_POINT_FILL,
    COLOR_SELECTED_POINT
} = colorPalette;

const COLORS = {
    BORDERS: COLOR_BORDERS,
    LANDSCAPE: COLOR_LANDSCAPE,
    LINE: COLOR_LINE,
    POINT: COLOR_SELECTED_POINT,
    POINT_FILL: COLOR_POINT_FILL,
    WATER: COLOR_WATER
};

const POINT_MARKER_ICON_CONFIG = {
    path: "M 0, 0 m -5, 0 a 5,5 0 1,0 10,0 a 5,5 0 1,0 -10,0",
    strokeOpacity: 0.8,
    strokeWeight: 4,
    strokeColor: COLORS.POINT,
    fillColor: COLORS.POINT_FILL,
    fillOpacity: 0.9,
    scale: 1
};

const LINE_SYMBOL_CONFIG = {
    path: "M 0,-2 0,2",
    strokeOpacity: 1,
    strokeWeight: 2,
    scale: 1
};

const LINE_PATH_CONFIG = {
    clickable: false,
    geodesic: false,
    strokeOpacity: 0,
    strokeColor: COLORS.LINE,
    icons: [{
        icon: LINE_SYMBOL_CONFIG,
        repeat: "10px"
    }]
};

const mapSettings = {
    clickableIcons: true,
    streetViewControl: true,
    panControlOptions: true,
    // gestureHandling: "cooperative",
    backgroundColor: '#FFFFFF', //COLORS.LANDSCAPE,
    mapTypeControl: false,
    zoomControlOptions: {
        style: "SMALL"
    },
    zoom: 12,
    minZoom: 2,
    maxZoom: 20,
    styles: [{
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }]
        },
        {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#616161"
            }]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#f5f5f5"
            }]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#bdbdbd"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#eeeeee"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#757575"
            }]
        },
        {
            "featureType": "poi.business",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e5e5e5"
            }]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#e4efe4"
            }]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#9e9e9e"
            }]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#757575"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dadada"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#616161"
            }]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#9e9e9e"
            }]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e5e5e5"
            }]
        },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [{
                "color": "#eeeeee"
            }]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#c9c9c9"
            }]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#e0e8e9"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#9e9e9e"
            }]
        }
    ],
};

export { mapSettings, LINE_PATH_CONFIG, POINT_MARKER_ICON_CONFIG };