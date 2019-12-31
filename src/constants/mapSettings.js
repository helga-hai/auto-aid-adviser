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
    // path: "M5 11C6.2 10.2 8 5.857 8 4.2 8 2.543 6.657 1.2 5 1.2 3.343 1.2 2 2.543 2 4.2 2 5.857 3.8 10.2 5 11ZM5 5.8C5.884 5.8 6.6 5.084 6.6 4.2 6.6 3.316 5.884 2.6 5 2.6 4.116 2.6 3.4 3.316 3.4 4.2 3.4 5.084 4.116 5.8 5 5.8Z",
    strokeOpacity: 1,
    strokeWeight: 1, //4
    strokeColor: COLORS.POINT,
    fillColor: COLORS.POINT_FILL,
    fillOpacity: 1, //0.7,
    scale: 2 //1
};

const LINE_SYMBOL_CONFIG = {
    path: "M 0,-2 0,2",
    strokeOpacity: 1,
    strokeWeight: 4, //3
    scale: 1
};

const LINE_PATH_CONFIG = {
    clickable: false,
    geodesic: false,
    strokeOpacity: 0,
    strokeColor: COLORS.LINE,
    icons: [{
        icon: LINE_SYMBOL_CONFIG,
        repeat: "13px" //"10px"
    }]
};

const mapSettings = {
    clickableIcons: true,
    streetViewControl: false,
    panControlOptions: false,
    gestureHandling: "cooperative",
    backgroundColor: COLORS.LANDSCAPE,
    mapTypeControl: false,
    zoomControlOptions: {
        style: "SMALL"
    },
    zoom: 15,
    minZoom: 2,
    maxZoom: 25,
    styles: [{
            featureType: "landscape",
            stylers: [
                { hue: COLORS.LANDSCAPE },
                { saturation: 50.2 }, //50.2
                { lightness: -34.8 }, //-34.8
                { gamma: 1 }
            ]
        },
        {
            featureType: "poi",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "road.highway",
            stylers: [
                { hue: COLORS.LANDSCAPE },
                { saturation: -19.8 },
                { lightness: -1.8 },
                { gamma: 1 }
            ]
        },
        {
            featureType: "road.arterial",
            stylers: [
                { hue: COLORS.LANDSCAPE },
                { saturation: 72.4 },
                { lightness: -32.6 },
                { gamma: 1 }
            ]
        },
        {
            featureType: "road.local",
            //stylers: [{ visibility: "on" }],
            stylers: [
                { hue: COLORS.LANDSCAPE },
                { saturation: 52.4 },
                { lightness: -32.6 },
                { gamma: 1 }
            ]
        },
        {
            featureType: "transit",
            stylers: [{ visibility: "on" }]
        },
        {
            featureType: "administrative.province",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "administrative.locality",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "administrative.province",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "administrative.land_parcel",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "administrative.neighborhood",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "administrative.country",
            elementType: "geometry.stroke",
            stylers: [{ visibility: "on" }, { color: COLORS.BORDERS }]
        },
        {
            featureType: "administrative",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "water",
            stylers: [
                { hue: COLORS.WATER },
                { saturation: -63.2 },
                { lightness: 38 },
                { gamma: 1 }
            ]
        }
    ]
};

export { mapSettings, LINE_PATH_CONFIG, POINT_MARKER_ICON_CONFIG };
//export { mapSettings, LINE_PATH_CONFIG };