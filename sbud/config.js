// @ts-check

/*

- get arbitrary font size.
- get number of blocks.
- get number of lines per block.
- get all offsets.
- get max offset width.
- ASCII or not ?
- margin = 10

*/
class Layout {

    /**
     * 
     * @param {string} font Font family name
     * @returns 
     */
    static #getHexDims(font) {
        let widths = [];
        let heights = [];
        let glyphs = "0123456789abcdefABCDEF";
        for (const char of glyphs) {
            console.log(char);
            let m = Font.getMetrics(char, font, Layout.fontSize);
            widths.push(m.width);
            heights.push(m.height);
        }
        let width = Math.max(...widths);
        let height = Math.max(...heights);
        return [width, height];
    }

    /**
     * 
     * @param {object} families 
     * @param {string} family 
     * @returns {string}
     */
    static getFont(families, family) {
        if (family == undefined) {
            return '';
        }
        if (families == undefined) {
            return '';
        }
        if (!(family in families)) {
            return '';
        }
        else {
            return `'${families[family]}',`;
        }
    }


    /** Font size (arbitrary for now)
     * @type {number}
     */
    static fontSize = 10;

    /**
     * 
     * @param {hexTheme} theme 
     * @param {number} maxOffset Max offset to be used in the hex grid
     */
    constructor(theme, maxOffset, fonts) {
        const testSize = 100;

        this.charHeight = 10;
        this.hexFont = Layout.getFont(fonts, 'hexFont') + theme.hexFont;
        this.offsetFont = Layout.getFont(fonts, 'offsetFont') + theme.offsetFont;
        this.descFont = Layout.getFont(fonts, 'descFont') + theme.descFont;

        this.hexSize = this.charHeight * testSize / Font.getMetrics('8', this.hexFont, testSize).height;
        this.offsetSize = this.charHeight * testSize / Font.getMetrics('8', this.offsetFont, testSize).height;
        this.descSize = this.charHeight * testSize / Font.getMetrics('M', this.descFont, testSize).height;

        /** Metrics of an 'M' of the Hex grid font (should be monospace)
         * @type {{width:number, height:number}} */
        this.hexM = Font.getMetrics('M', this.hexFont, this.hexSize);

        /** Metrics of an 'M' of the Offsets font (should be monospace)
         * @type {{width:number, height:number}} */
        this.offsetM = Font.getMetrics('M', this.offsetFont, this.offsetSize);

        /** Metrics of an 'M' of the Description font
         * @type {{width:number, height:number}} */
        this.descM = Font.getMetrics('.', this.descFont, this.descSize);


        /** Vertical margin
         * @type {number} */
        this.marginV = this.hexM.height;


        /** Vertical gap between rulers and hex grid
         * @type {number} */
        this.rulerHexV = 1 * this.hexM.height;

        this.rulerY = this.marginV + this.hexM.height;

        this.gridY = this.rulerY + max(this.hexM.height, this.offsetM.height) * 1.5;


        /** Horizontal margin
         * @type {number} */
        this.marginH = this.hexM.width;

        /** X coordinates of [right-aligned] offsets
         * @type {number} */
        this.offsetsX = this.marginH + (maxOffset.toString(16).length) * this.offsetM.width;

        /** Horizontal gap between hex nibbles
         * @type {number} */
        this.nibblesH = max(this.hexM.width, this.offsetM.width) * 1.5;


        /** X coordinates of hex grid and ruler
         * @type {number} */
        this.gridX = this.offsetsX + (this.offsetM.width + this.hexM.width) / 1.5;

        /** Vertical gap between the hex grid and the descriptions
         * @type {number} */
        this.nibblesV = max(this.hexM.height, this.offsetM.height) * 1.5;

        /** Horizontal gap between the hex grid and the descriptions
         * @type {number} */
        this.descX = this.gridX + 16 * this.nibblesH + this.hexM.width * 1;

    };
}
