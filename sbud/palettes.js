// @ts-check

/** Palette: Dracula theme palette
 * @type {object}  */
const draculaP = {
    Background: "#282a36",
    CurrentLine: "#44475a",
    Foreground: "#f8f8f2",
    Comment: "#6272a4",

    Cyan: "#8be9fd",
    Green: "#50fa7b",
    Orange: "#ffb86c",
    Pink: "#ff79c6",
    Purple: "#bd93f9",
    Red: "#ff5555",
    Yellow: "#f1fa8c",
}

/** Palette: ANSI under VGA hardware
 * @type {object} */
const ansiVgaP = {

    // black < gray < silver < white
    black: '#000000',
    white: '#ffffff',
    gray: '#808080',
    silver: '#c0c0c0', // gray + bright

    // colors:
    maroon: '#800000', // red
    red: '#ff0000', // red bright
    olive: '#808000', // yello
    yellow: '#ffff00', // yellow bright
    green: '#008000', // green
    lime: '#00ff00', // green bright
    teal: '#008080', // cyan
    aqua: '#00ffff', // cyan bright
    navy: '#000080', // blue
    blue: '#0000ff', // blue bright
    purple: '#800080', // purple
    fuchsia: '#ff00ff', // purple bright
}

/** Palette: Solarized dark & light
 * @type {object} */
const solarizedP = {
    // background tones
    base03: "#002b36",
    base02: "#073642",
    // content tones
    base01: "#586e75",
    base00: "#657b83",
    base0: "#839496",
    base1: "#93a1a1",
    // background tones (light)
    base2: "#eee8d5",
    base3: "#fdf6e3",

    // accent colors
    yellow: "#b58900", // split
    orange: "#cb4b16", // complement
    red: "#dc322f", // triad
    magenta: "#d33682", // tetrad
    violet: "#6c71c4", // analogous
    blue: "#268bd2", // monotone
    cyan: "#2aa198", // analoguous
    green: "#859900", // tetrad
}


/** Solarized Light palette
 * @type {object} */
const solarLightP = {
    background: solarizedP.base3,
    highlights: solarizedP.base02, // background highlights
    comments: solarizedP.base1, // comments/secondary content
    text: solarizedP.base00, // body text / default code / primary content
    emphasized: solarizedP.base01, // optional emphasized content
}

/** Solarized Dark palette
 * @type {object} */
const solarDarkP = {
    background: solarizedP.base03,
    highlights: solarizedP.base2, // background highlights
    comments: solarizedP.base01, // comments/secondary content
    text: solarizedP.base0, // body text / default code / primary content
    emphasized: solarizedP.base1, // optional emphasized content
}

/** Palette: Tango Desktop Project (in luminosity order)
 * @type {object} */
const tangoP = {
    // grayscale: slate shadow/standard hightlight, then aluminium

    // by order of luminosity
    Aluminium: { highlight: '#eeeeec', standard: '#d3d7cf', shadow: '#babdb6' }, // light gray
    Butter: { highlight: '#fce94f', standard: '#edd400', shadow: '#c4a000' }, // yellow
    Chameleon: { highlight: '#8ae234', standard: '#73d216', shadow: '#4e9a06' }, // green
    Orange: { highlight: '#fcaf3e', standard: '#f57900', shadow: '#ce5c00' }, // orange
    Chocolate: { highlight: '#e9b96e', standard: '#c17d11', shadow: '#8f5902' }, // brown
    SkyBlue: { highlight: '#729fcf', standard: '#3465a4', shadow: '#204a87' }, // blue
    Plum: { highlight: '#ad7fa8', standard: '#75507b', shadow: '#5c3566' }, // purple
    Slate: { highlight: '#888a85', standard: '#555753', shadow: '#2e3436' }, // gray
    ScarletRed: { highlight: '#ef2929', standard: '#cc0000', shadow: '#a40000' }, // red
};


/** Palette: Commodore 64
 * @type {object} */
const c64P = {
    Black: "#000000", // 0
    White: "#FFFFFF", // 1
    Red: "#880000", // 2
    Cyan: "#AAFFEE", // 3
    Violet: "#CC44CC", // 4
    Green: "#00CC55", // 5
    Blue: "#0000AA", // 6
    Yellow: "#EEEE77", // 7
    Orange: "#DD8855", // 8
    Brown: "#664400", // 9
    LightRed: "#FF7777", // 10
    DarkGrey: "#333333", // 11
    Grey: "#777777", // 12
    LightGreen: "#AAFF66", // 13
    LightBlue: "#0088FF", // 14
    LightGrey: "#BBBBBB", // 15
}

/** Palette: IBM Color Graphics Adapter
 * @type {object} */
const cgaRGBI = {
    black: "#000000", // 0
    blue: "#0000AA", // 1
    green: "#00AA00", // 2
    cyan: "#00AAAA", // 3
    red: "#AA0000", // 4
    magenta: "#AA00AA", // 5
    brown: "#AA5500", // 6 - halved green on RGBI
    gray: "#AAAAAA", // 7 

    darkGray: "#555555", // 8
    brightBlue: "#5555FF", // 9
    brightGreen: "#55FF55", // 10
    brightCyan: "#55FFFF", // 11
    brightRed: "#FF5555", // 12
    brightMagenta: "#FF55FF", // 13
    yellow: "#FFFF55", // 14
    white: "#FFFFFF", // 15
}

/** Palette: CGA Mode 4 Palette 0 low intensity
 * @type {object} */
const cgaM4Pal0low = [
    cgaRGBI.black,  // 0
    cgaRGBI.green, // 2
    cgaRGBI.red, // 4
    cgaRGBI.brown,// 6
]
/** Palette: CGA Mode 4 Palette 0 high intensity
 * @type {object} */
const cgaM4Pal0high = [
    cgaRGBI.black, // 0
    cgaRGBI.brightGreen, // 10=2 + 8
    cgaRGBI.brightRedred, // 12=4 + 8
    cgaRGBI.yellow, // 14=6 + 8
]

/** Palette: CGA Mode 4 Palette 1 low intensity
 * @type {object} */
const cgaM4Pal1low = [
    cgaRGBI.black,  // 0
    cgaRGBI.cyan, // 3
    cgaRGBI.magenta, // 5
    cgaRGBI.gray,// 7
]
/** Palette: CGA Mode 4 Palette 1 high intensity
 * @type {object} */
const cgaM4Pal1high = [
    cgaRGBI.black,  // 0
    cgaRGBI.brightCyan, // 11=3 + 8
    cgaRGBI.brightMagenta, // 13=5 + 8
    cgaRGBI.white,// 15=7 + 8
]

/** Palette: CGA Mode 5 Palette low intensity
 * @type {object} */
const cgaM5low = [
    cgaRGBI.black,  // 0
    cgaRGBI.cyan, // 3
    cgaRGBI.red, // 4
    cgaRGBI.gray,// 7
]
/** Palette: CGA Mode 5 Palette high intensity
 * @type {object} */
const cgaM5high = [
    cgaRGBI.black,  // 0
    cgaRGBI.brightCyan, // 11=3 + 8
    cgaRGBI.brightRed, // 12=4 + 8
    cgaRGBI.white,// 15=7 + 8
]

/** Palette: Shades of Purple theme
 * @type {object} */
const shadesOfPurpleP = {
    Background: '#2D2B55', // Martinique (dark blue)
    BackgroundDark: '#1E1E3F', // Port Gore (dark blue)
    Foreground: '#A599E9', // dull lavender
    HoverBackground: '#4D21FC', // electic violet

    Contrast: '#FAD000', // gold
    ContrastLite: '#FFEE80', // kournikova (light yellow)
    ContrastLiteII: '#FAEFA5', // texas (light yellow)

    Highlight: '#FF7200', // blaze orange
    Comment: '#B362FF', // heliotrope (purple)
    Constants: '#FF628C', // brink pink
    Keywords: '#FF9D00', // orange peel
    Other: '#9EFFFF', // cyan
    Strings: '#A5FF90', // mint green
    Templates: '#3AD900', // harlequin (green)
    Definitions: '#FB94FF', // mauve (light purple)
    Invalid: '#EC3A37F5', // cinnabar (red)

    // standard but slightly transparent
    DiffAdded: '#00FF009A', // green
    DiffRemoved: '#FF000D81', // red
};


// https://coolors.co/palette/f8f9fa-e9ecef-dee2e6-ced4da-adb5bd-6c757d-495057-343a40-212529
// monochrome, almost grayscale
const monoP = [
    "#f8f9fa", // Seasalt
    "#e9ecef", // Anti-flash white
    "#dee2e6", // Platinum
    "#ced4da", // French gray
    "#adb5bd", // French gray 2
    "#6c757d", // Slate gray
    "#495057", // Outer space
    "#343a40", // Onyx
    "2#12529", // Eerie black
];


/*

Cubehelix (sequential - not optima for qualitative stuff)
// https://github.com/jradavenport/cubehelix

import cubehelix
c = cubehelix.cmap()

import matplotlib as mpl
print ([mpl.colors.rgb2hex(c(i*16)) for i in range(16)])
 */
const cubehelix16 = [
    '#000000', '#160a20', '#191d41', '#123952', '#0d574e', '#1a6f3a', '#3e7c27', '#727d26',
    '#a8783f', '#cf7671', '#de7eab', '#d894dc', '#c8b2f7', '#bed1fb', '#c7e9f3', '#e1f8f1',
]

// cubehelix.cmap(startHue=0, rot=0)
const cubehelixBlueP = [
    '#000000', '#0f0d22', '#1e1b41', '#2d295e', '#3c3879', '#4b4691', '#5b56a7', '#6a65ba',
    '#7a75cb', '#8a85da', '#9b96e7', '#aba6f1', '#bcb8f8', '#cdc9fd', '#dedbff', '#efeeff',
];
