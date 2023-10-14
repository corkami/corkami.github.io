// @ts-check


class hexiiData {

    constructor() {
        this.blocks = {};
        this.descs = {};
    }
    /**
     * Parses JSON string input
     * @param {string} jsonText 
     */
    parseJSON(jsonText) {
        const root_keys = ["hexii", "descriptions", 'highlights'];
        const json = JSON.parse(jsonText);

        // check all keys
        for (const key in json) {
            if (!root_keys.includes(key)) {
                throw new Error(`Root key '${key}' not an expected value(${root_keys.join(', ')}).`);
            }
        }

        let key = root_keys[0];
        if (!Object.keys(json).includes(key)) {
            throw new Error(`Root key '${key}' expected (required).`);
        }
        this.hexii = parseHexiiArray(json[key]);
        key = root_keys[1];
        this.descs = parseDescriptions(json[key]);
        this.highlights = [];
        if ('highlights' in json) {
            this.highlights = parseHighlights(json['highlights']);
        }

    }
}

/**
 * Check if the Row of an offset is in an array, add it if not.
 * @param {number[]} lines Array containing all lines offsets
 * @param {number} offset offset to be checked
 * @returns {number[]} the Array, with one new row offset if needed
 */
function addRow(lines, offset) {
    const line = offset & 0xFFFFFFFFFFF0;
    if (lines.includes(line)) {
        return lines;
    }
    lines = lines.concat([line]);
    return lines;
}

/**
 * Parse the array of Hexii data: ["MZ", 0x90, 0, {offset:30}]
 * @param {Array<number | string | object>} hexiiArray 
 * @returns {{lines:number[], contents:object, ASCII:Array<number>}}
 */
function parseHexiiArray(hexiiArray) {
    /** Store the starting offset (0xX0) of each line
     * @type {number[]} */
    let lines = [];
    let offset = 0;
    let offsetsASCII = [];
    let contents = {};
    for (const hexii of hexiiArray) {
        const type_ = typeof hexii;
        if (typeof hexii === 'number') {
            lines = addRow(lines, offset);
            if ((hexii < 0) || (hexii > 255)) {
                throw new Error(`Integer value not in [0,255].`);
            }
            contents[offset] = hexii.toString(16).padStart(2, '0').toUpperCase();
            offset += 1;
        }

        else if (typeof hexii === 'string') {
            [...hexii].forEach(char => {
                lines = addRow(lines, offset);
                if (char == "\0") {
                    char = "\\0";
                }
                else if (char == "\r") {
                    char = "\\r";
                }
                contents[offset] = char;
                offsetsASCII = offsetsASCII.concat([offset]);
                offset += 1;
            });
        }
        else if (typeof hexii === 'object') {

            const object_keys = ['offset'];
            // should be a pure object, not an array {}
            if (Array.isArray(hexii)) {
                throw new Error(`Unsupported HexII value type: ${hexii.toString()}.`);
            }
            for (const key in Object(hexii)) {
                if (!object_keys.includes(key)) {
                    throw new Error(`Unexpected '${key}' expected.`);
                }
                if (key == 'offset') {
                    const atVal = hexii[key];
                    if (typeof atVal !== 'number') {
                        throw new Error(`Unexpected value for 'offset' key: '${atVal}'`);
                    }
                    if (atVal < offset) {
                        throw new Error('New offset before current offset');
                    }
                    offset = atVal;
                }
            }
        }
        else {
            throw new Error(`Unsupported HexII value type: ${hexii.toString()}.`);
        }
    }
    return { lines: lines, contents: contents, ASCII: offsetsASCII };
}

/**
 * 
 * @param {Array<Array<number, string> | object >} descArray 
 * @returns {{colors:{}, descriptions:{}}}
 */
function parseDescriptions(descArray) {
    let offset = 0;
    const colors = {};
    let descriptions = [];
    for (const descOrparams of descArray) {
        let size = 0;
        let name = '';
        let valueString = '';

        /** @type {number | string} */
        let value;

        if (typeof (descOrparams) !== 'object') {
            throw new Error(`Unsupported description value type: ${descOrparams.toString}.`);
        }
        if (!Array.isArray(descOrparams)) {
            /**@type {object} */
            const params = descOrparams;

            (function parseParameters() {
                for (const param in params) {
                    if (!['offset'].includes(param)) {
                        throw new Error(`Invalid description parameter : '${param}'.`);
                    }
                    if (param == 'offset') {
                        if (typeof (params.offset) !== 'number') {
                            throw new Error(`Invalid offset parameter type : '${params.offset}'.`);
                        }
                        offset = params.offset;
                        break;
                    }
                }
            })();
        }
        else {
            /** @type {Array<number, string>} */
            const desc = descOrparams;

            if ((desc.length < 2) || (desc.length > 4)) {
                throw new Error(`Invalid array length: ${desc.length, desc}.`);
            }
            if ((typeof (desc[0]) != 'number') || (typeof (desc[1]) != 'string')) {
                throw new Error(`Invalid default types: ${desc.length, desc}.`);
            }
            size = desc[0];
            name = desc[1];

            if (desc.length > 2) {
                if (!['number', 'string'].includes(typeof (desc[2]))) {
                    throw new Error(`Invalid description value : '${desc[2]}'.`);
                }
            }

            (function parseValue() {
                value = desc[2];
                value ??= "";
                if (typeof (value) === "number") {
                    if ((0 <= value) && (value <= 9)) {
                        valueString = value.toString();
                    }
                    else if (value > 10) {
                        valueString = "0x" + value.toString(16).toUpperCase();
                    }
                } else if (typeof (value) === "string") {
                    valueString = value;
                }
            })();
            for (let index = offset; index < offset + size; index++) {
                colors[index] = { name };
            }

            descriptions = descriptions.concat([
                [offset, size, name, valueString
                ]]);
            offset += size;
        }
    }
    return {
        colors: colors,
        descriptions: descriptions,
    };
}

/**
 * validations for highlights array
 * @param {Array} highlights 
 * @returns {Array}
 */
function parseHighlights(highlights) {

    const h = []
    const offsets = []
    if (!Array.isArray(highlights)) {
        throw Error("Invalid 'highlights' type: " + highlights);
    }
    for (const [index, highlight] of highlights.entries()) {
        if (!Array.isArray(highlight)) {
            throw Error(`Invalid entry in highlights at position ${index}: ${highlight}.`);
        }
        //        const [offset, size] = highlights;
    }
    return highlights;
}