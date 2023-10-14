// @ts-check

/*
Usual accents order (keep the wheel turning!)
    blue
    orange
    green
    violet
    cyan
    magenta

    yellow // too bright
    red // reserved for alerts
*/

// Don't use the following fonts:
// Pet Me 64, Envy Code R


/** Theme class
 *  default value = Ansi VGA
 */
class hexTheme {

    /** hex grid font (can be variable width)
     * @type {string} */
    static hexFont = "'PxPlus IBM VGA9', 'monospace'";

    /** Offset font (used for left offset 0x10, top and bottom hex rulers (00 01 02 ... 0F)
     * @type {string} */
    static offsetFont = "'PxPlus IBM VGA9', 'monospace'"; // standardTerminal; // "sans-serif";

    /** Description font family (can't be monospace - FIXME bug to compute widths ?)
     * @type {string} */
    static descFont = "'Aracne Regular', 'serif'";

    /** background color
     * @type {string} */
    static background = ansiVgaP.black;

    /** offsets & rulers color
     * @type {string} */
    static dimmed = ansiVgaP.gray;

    /** hex grid & titles color
     * @type {string} */
    static text = ansiVgaP.silver;

    /** titles highlights color
     * @type {string} */
    static highlight = ansiVgaP.white;


    /** accents colors
     * @type {any} */
    static accents = [
        // ansiVgaP.red,// red bright
        ansiVgaP.blue, // blue bright
        ansiVgaP.fuchsia, // purple bright;
        ansiVgaP.lime, // green bright
        ansiVgaP.yellow, // yellow bright
        ansiVgaP.aqua, // cyan bright
        // ansiVgaP.maroon, // red
        // ansiVgaP.olive, // yellow
        // ansiVgaP.green, // green
        // ansiVgaP.teal, // cyan
        // ansiVgaP.navy, // blue
        // ansiVgaP.purple, // purple
    ];
    /**
     * 
     * @param {string} color 
     * @returns 
     */
    static getContrast(color) {
        return hexTheme.dimmed;
    };

}

class ansiVGAdarkTh extends hexTheme {

    static getContrast(color) {
        const contrasts = {
            [ansiVgaP.black]: ansiVgaP.gray,
            [ansiVgaP.silver]: ansiVgaP.white,
            [ansiVgaP.blue]: ansiVgaP.navy,
            [ansiVgaP.fuchsia]: ansiVgaP.purple,
            [ansiVgaP.aqua]: ansiVgaP.teal,
            [ansiVgaP.yellow]: ansiVgaP.olive,
            [ansiVgaP.maroon]: ansiVgaP.red,
            [ansiVgaP.lime]: ansiVgaP.green,

            [ansiVgaP.gray]: ansiVgaP.black,
            [ansiVgaP.white]: ansiVgaP.silver,
            [ansiVgaP.navy]: ansiVgaP.blue,
            [ansiVgaP.purple]: ansiVgaP.fuchsia,
            [ansiVgaP.teal]: ansiVgaP.aqua,
            [ansiVgaP.olive]: ansiVgaP.yellow,
            [ansiVgaP.red]: ansiVgaP.maroon,
            [ansiVgaP.green]: ansiVgaP.lime,
        };
        return contrasts[color];
    };

}

class ansiVGAlightTh extends hexTheme {
    static hexFont = "'PxPlus IBM MDA', 'monospace'";
    static offsetFont = this.hexFont;

    static background = ansiVgaP.white;
    static dimmed = ansiVgaP.silver;
    static text = ansiVgaP.gray;
    static highlight = ansiVgaP.black;

    static accents = [
        ansiVgaP.navy, // blue
        ansiVgaP.purple, // purple
        ansiVgaP.green, // green
        ansiVgaP.olive, // yellow
        ansiVgaP.teal, // cyan
        // ansiVgaP.red,// red bright
        // ansiVgaP.yellow, // yellow bright
        // ansiVgaP.lime, // green bright
        // ansiVgaP.aqua, // cyan bright
        // ansiVgaP.blue, // blue bright
        // ansiVgaP.fuchsia, // purple bright;
        // ansiVgaP.maroon, // red
    ];
}

class solarizedDarkTh extends hexTheme {
    static hexFont = "'Lucida Console' , 'monospace'";

    static background = solarDarkP.background;
    static dimmed = solarDarkP.comments;
    static text = solarDarkP.text;
    static highlight = solarDarkP.highlights;

    static accents = [
        solarizedP.blue,
        solarizedP.orange,
        solarizedP.green,
        solarizedP.violet,
        solarizedP.cyan,
        solarizedP.magenta,
        solarizedP.yellow,
        solarizedP.red,
    ];
}

class solarizedLightTh extends hexTheme {
    static hexFont = "'monospace'";
    static offsetFont = "'monospace'";
    static descFont = "'sans-serif'";

    static background = solarLightP.background;
    static dimmed = solarLightP.comments;
    static text = solarLightP.text;
    static highlight = solarLightP.highlights;

    static accents = [
        solarizedP.blue,
        solarizedP.orange,
        solarizedP.green,
        solarizedP.violet,
        solarizedP.cyan,
        solarizedP.magenta,
        solarizedP.yellow,
        solarizedP.red,
    ];
}


class shadesOfPurpleTh extends hexTheme {
    static hexFont = "'Consolas', 'monospace'";

    static background = shadesOfPurpleP.BackgroundDark;
    static dimmed = shadesOfPurpleP.HoverBackground;
    static highlight = shadesOfPurpleP.Contrast;
    static text = shadesOfPurpleP.Foreground;

    static accents = [ // not the standard order
        shadesOfPurpleP.Other,// cyan
        shadesOfPurpleP.Definitions, // mauve (light purple)
        shadesOfPurpleP.Templates, // harlequin (green)
        shadesOfPurpleP.Keywords, // orange peel
        shadesOfPurpleP.Comment, // heliotrope (purple)
        shadesOfPurpleP.Highlight, // blaze orange
        shadesOfPurpleP.ContrastLite, // kournikova (light yellow)
        shadesOfPurpleP.Constants, // brink pink
        shadesOfPurpleP.Strings, // mint green
    ];
}

class tangoDarkTh extends hexTheme {
    static hexFont = "'Ubuntu Mono', 'Monaco'";
    static offsetFont = "sans-serif";

    static background = tangoP.Slate.shadow;
    static dimmed = tangoP.Slate.standard;
    static text = tangoP.Aluminium.standard;
    static highlight = tangoP.Aluminium.highlight;

    static accents = [
        tangoP.SkyBlue.highlight, // blue
        tangoP.Orange.highlight, // orange
        tangoP.Chameleon.highlight, // green
        tangoP.Plum.highlight, // purple
        tangoP.Chocolate.highlight, // brown
        tangoP.Butter.highlight, // yellow
        tangoP.ScarletRed.highlight, // red
    ];
}

class tangoLightTh extends hexTheme {
    static hexFont = "'Envy Code R', 'Ubuntu Mono', 'Monaco', 'monospace'";
    static offsetFont = "'Share tech mono'";
    static descFont = "'Patrick Hand', 'Aracne regular'";

    static background = tangoP.Aluminium.highlight;
    static dimmed = tangoP.Aluminium.shadow;
    static text = tangoP.Slate.highlight;
    static highlight = tangoP.Slate.shadow;

    static accents = [
        tangoP.SkyBlue.shadow, // blue
        tangoP.Orange.shadow, // orange
        tangoP.Chameleon.shadow, // green
        tangoP.Plum.shadow, // purple
        tangoP.Chocolate.shadow, // brown
        tangoP.Butter.shadow, // yellow
        tangoP.ScarletRed.shadow, // red
    ];
}

class draculaTh extends hexTheme {
    static background = draculaP.Background;
    static dimmed = draculaP.CurrentLine;
    static text = draculaP.Foreground;
    static highlight = draculaP.Comment;

    static accents = [
        draculaP.Cyan,
        draculaP.Orange,
        draculaP.Green,
        draculaP.Purple,
        draculaP.Pink,
        draculaP.Yellow,
        draculaP.Red,
    ];
}


// sequential palettes used for qualitative data
// more for visual experiments than anything

class monoDark extends hexTheme {
    static background = monoP[8];
    static dimmed = monoP[7];
    static text = monoP[5];
    static highlight = monoP[0];

    static accents = [
        monoP[2],
        // monoP[3],
        monoP[4],
        // monoP[5],
        // monoP[6],
    ];
}


class monoLight extends hexTheme {
    static background = monoP[0];
    static dimmed = monoP[1];
    static text = monoP[6];
    static highlight = monoP[8];

    static accents = [
        // monoP[1],
        // monoP[2],
        // monoP[3],
        monoP[4],
        monoP[5],
    ];
}


class cubehelixDark extends hexTheme {
    static background = cubehelix16[0];
    static dimmed = cubehelix16[2];
    static text = cubehelix16[13];
    static highlight = cubehelix16[15];

    static accents = [
        cubehelix16[3],
        cubehelix16[5],
        cubehelix16[7],
        cubehelix16[9],
    ];
}

class cubehelixBlueTh extends hexTheme {
    static background = cubehelixBlueP[0];
    static dimmed = cubehelixBlueP[2];
    static text = cubehelixBlueP[13];
    static highlight = cubehelixBlueP[15];

    static accents = [
        cubehelixBlueP[3],
        cubehelixBlueP[7],
        cubehelixBlueP[5],
        cubehelixBlueP[9],
    ];
}

const allThemes = {
    "Tango (light)": tangoLightTh,
    "Tango (dark)": tangoDarkTh,
    "Ansi (light)": ansiVGAlightTh,
    "Ansi (dark)": ansiVGAdarkTh,
    "Solarized (light)": solarizedLightTh,
    "Solarized (dark)": solarizedDarkTh,

    // fixed themes
    "Shades of Purple": shadesOfPurpleTh,
    "Dracula": draculaTh,

    // sequential palettes
    "Mono (dark)": monoDark,
    "Mono (light)": monoLight,
    "Cubehelix (dark)": cubehelixDark,
    "Cubehelix (Blue)": cubehelixBlueTh,
};
