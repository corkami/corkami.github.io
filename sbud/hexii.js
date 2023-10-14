// @ts-check

let myData = new hexiiData();
var myTheme;

/** height / width ratio
 * @type {number}  */
var RATIO = (window.innerHeight / 3) / (window.innerWidth - 0x10);

function resetExamplesSelect() {
    const el = getSelectElement("exampleSelect");
    for (let example in allExamples) {
        let option = document.createElement("option");
        option.text = example;
        option.value = example;
        el.add(option);
    }
}

/**
 * Gets an element by ID and check the class
 * @param {string} id ID of the element
 * @param {object} class_ instance of the element
 * @returns {any} a reference to the element
 */
function getElement(id, class_) {
    const el = document.getElementById(id);
    if (el == null) {
        throw new Error('Element not found.');
    }
    if (!(el instanceof class_)) {
        throw new Error('Wrong element type.');
    }
    return el;
}

/**
 * get an HTML Select element by ID
 * @param {string} id 
 * @returns {HTMLSelectElement}
 */
function getSelectElement(id) {
    return getElement(id, HTMLSelectElement);
}

/**
* get an HTML text area element by ID
* @param {string} id 
* @returns {HTMLTextAreaElement}
*/
function getTextAreaElement(id) {
    return getElement(id, HTMLTextAreaElement);
}

/**
* get an HTML Input element by ID
* @param {string} id 
* @returns {HTMLInputElement}
*/
function getInputElement(id) {
    return getElement(id, HTMLInputElement);
}

/**
* get an HTML div element by id
* @param {string} id 
* @returns {HTMLDivElement}
*/
function getDivElement(id) {
    return getElement(id, HTMLDivElement);
}

/**
* get an SVG element by id
* @param {string} id 
* @returns {SVGElement}
*/
function getSVGElement(id) {
    return getElement(id, SVGElement);
}

/**
 * Resets theme select element
 * @returns {void}
 */
function resetThemesSelect() {
    const el = document.getElementById("themeSelect");
    if (el == null) {
        throw new Error('Element not found.');
    }
    if (!(el instanceof HTMLSelectElement)) {
        throw new Error('Wrong element type.');
    }
    for (let theme in allThemes) {
        let option = document.createElement("option");
        option.text = theme;
        option.value = theme;;
        el.add(option);
    }
}

/**
 * Resets HTML element of the page
 * @returns {void}
 */
function reset() {
    // same as `window.onresize = onWindowResize;`
    window.addEventListener("resize", onWindowResize);
    resetExamplesSelect();
    resetThemesSelect();
    getTextAreaElement("myJSON").placeholder = placeholderJSON;
    getTextAreaElement("myJS").placeholder = placeholderJS;
}

/** 
 * Set some default values to speed up development
 * @returns {void}
*/
function speedup() {
    getSelectElement("themeSelect").focus();
    getSelectElement('exampleSelect').value = 'IMAGE DOS HEADER';
    getSelectElement("themeSelect").value = 'Tango (light)';
    changeExample();
    changeTheme();
    evalMyJS();
    evalJSON();
    onWindowResize();
}

/**
 * Set a status in the text area.
 * @param {string} status 
 * @returns {void}
 */
function setStatus(status) {
    getDivElement("status").innerHTML = status;
}

/**
 * Fill example text area matching the selected example
 * @returns {void}
*/
function changeExample() {
    const elSelect = getSelectElement("exampleSelect");
    if (elSelect.value != 'undefined') {
        getTextAreaElement("myJS").value = allExamples[elSelect.value];
    }
}

/**
 * Set theme after selection
 * @returns {void}
 */
function changeTheme() {
    myTheme = allThemes[getSelectElement("themeSelect").value];
}

/** Update the theme and render
 * @returns {void}
 */
function changeThemeRender() {
    changeTheme();
    render(myData);
}

/**
 * 
 * @returns {void}
 */
function evalMyJS() {
    let value = getTextAreaElement("myJS").value;
    if (value == 'undefined') {
        return;
    }
    let example = "";
    eval('example = {' + value + '}'); // super escaping ;)
    getTextAreaElement('myJSON').value = JSON.stringify(example);
    evalJSON();
}

/**
 * Eval JSON field
 * @returns {void}
 */
function evalJSON() {
    const value = getTextAreaElement("myJSON").value;
    try {
        myData.parseJSON(value);
        render(myData);
    }
    catch (e) {
        setStatus(e.stack.replaceAll("\n", "<br>"));
        console.error(e);
        return;
    };
    setStatus('JSON parsed');
}


/**
 * Returns value of a specified Select Element
 * @param {string} id 
 * @returns {string} value
 */
function getInputValue(id) {
    const el = getInputElement(id);
    return el.value;
}

reset();
speedup();

/**
 * Renders theme
 * @param {object} myData parsed input data
 * @returns {void}
 */
function render(myData) {
    if (myData?.hexii === undefined) {
        return;
    }

    /**
     * 
     * @param {string} id 
     * @param {object} families 
     * @returns {void}
     */
    function addFamily(id, families) {
        const family = getInputValue(id);
        if (family == '') {
            return;
        }
        families[id] = family;
    }

    const families = {};
    addFamily('hexFont', families);
    addFamily('offsetFont', families);
    addFamily('descFont', families);
    const maxOffset = myData.hexii.lines.at(-1);
    const myLayout = new Layout(myTheme, maxOffset, families);
    const hexii = myData.hexii;
    const lines = myData.hexii.lines;
    const offsets = Object.keys(hexii.contents).map((s) => parseInt(s)).sort((a, b) => a - b);
    const start = offsets[0];
    const end = start + offsets[offsets.length - 1];


    const containerEl = getDivElement('svgdiv');
    while (containerEl?.firstChild) {
        containerEl?.firstChild.remove();
    }
    var WIDTH = window.innerWidth - 0x10;
    var HEIGHT = window.innerHeight / 3;
    let svgEl = createSVG(WIDTH, HEIGHT);
    svgEl.appendChild(createBackground(myTheme.background, WIDTH, HEIGHT))
    containerEl?.appendChild(svgEl);

    function svgText(text = '', id = '', attributes = []) {
        const text_ = createEl('text', attributes);
        if (id !== '') {
            text_.id = id;
        }
        if (text != '') {
            text_.textContent = text;
        }
        return text_;
    }

    const colors = myData.descs.colors;
    const colorMaps = {};

    (function mapColors() {
        let index = 0;
        const accents = myTheme.accents;
        for (const offset in colors) {
            const name = colors[offset].name;
            if (!(name in colorMaps)) {
                colorMaps[name] = accents[index];
                index = (index + 1) % (accents.length);
            }
            colors[offset].color = colorMaps[name];
        }
    })();


    /**
    * returns X and Y coordinates of a given byte
    * @param {number} offset offset of the byte
    * @returns {number[]} X & Y coordinates of the hex byte
    */
    function getXY(offset) {
        const line = getLine(offset);
        return [myLayout.gridX + (offset % 16) * myLayout.nibblesH, myLayout.gridY + line * (myLayout.nibblesV)];
    }



    /**
    * Get the line grid of a given offset.
    * @param {number} offset offset of the byte
    * @returns {number} line of the hex grid.
    */
    function getLine(offset) {
        const index = lines.indexOf(offset & 0xFFFFFFFFF0);
        if (index == -1) {
            throw Error("Offset not found in lines: " + offset);
        }
        return index;
    }

    /**
     * Get the anchor of a given offset on the grid
     * @param {number} offset offset on the grid
     * @param {number} mydir direction of the anchor
     * @param {number} marginH Horizontal margin
     * @param {number} marginV Vertical margin
     * @return {number[]} X,Y of the anchor
     */
    function offsetAnchor(offset, mydir, marginH = 0, marginV = 0) {
        const H = myLayout.hexM.height;
        const W = myLayout.hexM.width / 2;
        const [x, y] = getXY(offset);

        switch (mydir) {
            case directions.center: {
                return [x, y - H / 2];
            }
            case directions.north: {
                return [x, y - H - marginV];
            }
            case directions.northeast: {
                return [x + W + marginH, y - H - marginV];
            }
            case directions.east: {
                return [x + W + marginH, y - H / 2];

            }
            case directions.southeast: {
                return [x + W + marginH, y + marginV];
            }
            case directions.south: {
                return [x, y + marginV];
            }
            case directions.southwest: {
                return [x - W - marginH, y + marginV];

            }
            case directions.west: {
                return [x - W - marginH, y - H / 2];
            }
            case directions.northwest: {
                return [x - W - marginH, y - H - marginV];
            }

            default:
                throw Error('Wrong direction');
        }
    }

    /**
    * Render a highlight shape around given offsets
    * @param {number} start
    * @param {number} end
    * @param {string} stroke
    * @param {number} d X&Y delta (for shadows)
    * @param {string} fill
    * @returns {SVGPathElement} shape element
    */
    function renderHighlight(start, end, stroke = myTheme.highlight, d = 0, fill = 'none', width = 1) {
        const W = myLayout.hexM.width / 4;
        const halflinespace = myLayout.hexM.height * (1.5 - 1) / 2;
        const marginV = halflinespace + .5;
        /**
         * 
         * @param {number[]} coords 
         * @returns {string} 
         */
        function c2p(coords) {
            const [x, y] = coords;
            return ` ${x + d}, ${y + d}`;
        }
        //    1----2
        //    |S  L|
        // 7--8    |
        // |M      |
        // |      O|
        // |     4-3
        // |P   E|
        // 6-----5

        let path = 'M' + c2p(offsetAnchor(start, directions.northwest, W, marginV));

        if (getLine(start) == getLine(end)) {

            path += 'L' + c2p(offsetAnchor(end, directions.northeast, W, marginV));
            path += 'L' + c2p(offsetAnchor(end, directions.southeast, W, marginV));
            path += 'L' + c2p(offsetAnchor(start, directions.southwest, W, marginV));
        }
        else {
            const offsetL = start + 15 - (start % 16);
            const offsetM = lines[getLine(offsetL) + 1];
            const offsetP = end - (end % 16);
            const offsetO = lines[getLine(offsetP) - 1] + 15;
            path += 'L' + c2p(offsetAnchor(offsetL, directions.northeast, W, marginV));

            const [xo, yo] = offsetAnchor(offsetO, directions.southeast, W, marginV);
            path += 'L' + c2p([xo, yo]);
            const [xe, ye] = offsetAnchor(end, directions.southeast, W, marginV);
            path += 'L' + c2p([xe, yo]);
            path += 'L' + c2p([xe, ye]);

            path += 'L' + c2p(offsetAnchor(offsetP, directions.southwest, W, marginV));

            const [xm, ym] = offsetAnchor(offsetM, directions.northwest, W, marginV);
            path += 'L' + c2p([xm, ym]);
            const [xs, ys] = offsetAnchor(start, directions.southwest, W, marginV);
            path += 'L' + c2p([xs, ym]); // not [xs, ys]
        }
        path += 'z';

        return svgPath(
            path,
            [
                ['stroke-linecap', 'round'],
                ['stroke-linejoin', 'round'],
                ['stroke-width', width],

                ['stroke', stroke],
                ['style', `fill:${fill}`],
                ['stroke-dasharray', '3 3'],
                ['stroke-dashoffset', `${start + end}`]
            ],
        );
    }
    (function renderRuler() {
        for (let offset = 0; offset < 16; offset++) {
            const textRuler = svgText(
                offset.toString(16).toUpperCase().padStart(2, '0'),
                undefined,
                [
                    ['x', `${myLayout.gridX + offset * myLayout.nibblesH}`],
                    ['y', `${myLayout.rulerY}`],
                    ['font-family', myLayout.offsetFont],
                    ['fill', myTheme.dimmed],
                    ['font-size', `${myLayout.offsetSize}px`],
                    ['xml:space', 'preserve'],
                    ['text-anchor', 'middle'],
                ]);
            svgEl.appendChild(textRuler);
        }
    })();

    (function renderOffsets() {
        let last = -1;
        for (const [index, offset] of lines.entries()) {
            const y = myLayout.gridY + index * (myLayout.nibblesV);
            let color = myTheme.dimmed;
            if ((index != 0) && (offset != last + 0x10)) {
                color = myTheme.highlight;

                function gapLine(attributes = [], delta = 0) {
                    return svgLine(
                        delta + myLayout.marginH,
                        delta + y - myLayout.offsetM.height * 1.2,
                        delta + myLayout.offsetsX + myLayout.nibblesH * 16.5,
                        delta + y - myLayout.offsetM.height * 1.2,
                        attributes.concat([
                            ['stroke-linecap', 'round'],
                            ['stroke-dasharray', '10 4 2 4'], // [----------    --    ]
                        ])
                    );
                }
                svgEl.appendChild(gapLine(
                    [
                        ['stroke', myTheme.text],
                        ['stroke-width', '1.5'],
                    ],
                    0,
                ));

                svgEl.appendChild(gapLine(
                    [
                        ['stroke-width', '1'],
                        ['stroke', myTheme.dimmed],
                    ],
                    0,
                ));
            }

            let textOL = svgText(
                `0x${offset.toString(16).toUpperCase()}`, undefined,
                [
                    ['x', `${myLayout.offsetsX}`],
                    ['y', `${y} `],
                    ['font-family', myLayout.offsetFont],
                    ['fill', color],
                    ['font-size', `${myLayout.offsetSize}px`],
                    ['xml:space', 'preserve'],
                    ['text-anchor', 'end'],
                ]);
            last = offset;
            svgEl.appendChild(textOL);
        }
    })();

    function renderHexii(group, color = "", dx = 0, dy = 0, attributes = []) {
        for (let offset of offsets) {
            let textOL = svgText(
                hexii.contents[offset],
                undefined,
                [
                    ['x', `${dx + myLayout.gridX + (offset % 16) * myLayout.nibblesH}`],
                    ['y', `${dy + myLayout.gridY + getLine(offset) * (myLayout.nibblesV)} `],
                    ['font-family', myLayout.hexFont],
                    ['fill', color == "" ? (offset in colors ? colors[offset].color : myTheme.text) : color],
                    ['font-size', `${myLayout.hexSize}px`],
                    ['xml:space', 'preserve'], // redundant, but required for PNG rendering
                    ['text-anchor', 'middle'],
                ].concat(attributes));
            group.appendChild(textOL);
        }
    };

    const gHexiiBg = svgGroup();
    const gHexii = svgGroup();
    svgEl.appendChild(gHexiiBg);
    svgEl.appendChild(gHexii);
    renderHexii(gHexii);

    renderHexii(gHexiiBg, myTheme.dimmed, .5, .5,
        [
            ['stroke-width', '.5'],
            ['stroke', myTheme.dimmed],
            ['stroke-linejoin', 'round'],
            ['stroke-linecap', 'round'],
        ]
    )


    const gDescs = svgGroup();
    const gDescsBg = svgGroup();
    svgEl.appendChild(gDescsBg);
    svgEl.appendChild(gDescs);
    (function renderDescriptions() {
        const descriptions = myData.descs.descriptions;
        /** Widths in pixel of each row of the descriptions table
         */
        let widths = { offsetsize: 0, name: 0, value: 0 };

        (function getRowWidths() {
            for (let description of descriptions) {
                const [offset, size, name, value] = description;
                widths.offsetsize = max(
                    widths.offsetsize,
                    Font.getTextWidth(
                        `${offset.toString(16).toUpperCase()}+${size}`, myLayout.offsetFont, myLayout.offsetSize)
                );
                widths.name = max(
                    widths.name,
                    Font.getTextWidth(
                        `${name}`, myLayout.descFont, myLayout.descSize)
                );
                widths.value = max(
                    widths.value,
                    Font.getTextWidth(
                        `${value}`, myLayout.descFont, myLayout.descSize)
                );
            }
        })();

        /**
         * Renders description text, and arrows
         * @param {SVGElement} group 
         * @param {string} color 
         * @param {number} dx 
         * @param {number} dy 
         * @param {Array} attributes 
         * @returns {void}
         */
        function renderDescText(group, color = "", dx = 0, dy = 0, attributes = []) {
            let y = myLayout.gridY;
            const desclen = descriptions.length;
            for (const [index, description] of descriptions.entries()) {
                const [offset, size, name, value] = description;
                const [xtext, ytext] = [dx + myLayout.descX + widths.offsetsize, dy + y];

                let colorOS = color;
                if (colorOS == "") {
                    if (size > 0) {
                        colorOS = myTheme.text;
                    }
                    else {
                        colorOS = myTheme.highlight;
                    }
                }

                const offsetSizeEl = svgText(
                    (size > 0) ?
                        `${offset.toString(16).toUpperCase()}+${size}` :
                        `${offset.toString(16).toUpperCase()}`,
                    undefined,
                    [
                        ['x', xtext],
                        ['y', ytext],
                        ['font-family', myLayout.offsetFont],
                        ['fill', colorOS],
                        ['font-size', `${myLayout.offsetSize}px`],
                        ['xml:space', 'preserve'],
                        ['text-anchor', 'end'],
                    ].concat(attributes));
                group.appendChild(offsetSizeEl);

                /**
                 * Returns angle between -45 and +45
                 * @param {number} step 
                 * @param {number} max 
                 * @returns {[number, number]} unary coordinates for that angle
                 */
                function getAngle(step, max) {
                    const pi = Math.PI;
                    const angle = -pi / 4 + step / max * (pi / 2);
                    return [Math.cos(angle), Math.sin(angle)];
                }

                /**
                 * Draw colored arrows with marker
                 * @returns {void}
                 */
                function renderArrow() {
                    const progress = index / (desclen - 1);
                    let direction;
                    if (progress < 1 / 3) {
                        direction = directions.northeast;
                    } else if (progress < 2 / 3) {

                        direction = directions.east;
                    }
                    else {
                        direction = directions.southeast;
                    };
                    const marginH = 3;
                    const [xs, ys] = [dx + myLayout.descX - marginH, ytext - myLayout.descSize / 3] //EXPLAINME
                    const [xe, ye] = offsetAnchor(
                        offset + size - 1,
                        direction,
                        4, 2); //EXPLAINME
                    const color = colors[offset].color;
                    const [xa, ya] = getAngle(index, desclen - 1);
                    const coef = 20; //EXPLAINME
                    const arrow = svgPath(
                        `M ${xs},${ys} ` +
                        `C ${xs - xa * coef},${ys + ya * coef} ` +
                        ` ${xe + xa * coef},${ye + ya * coef} ` +
                        ` ${xe},${ye}`, [
                        ['stroke-linecap', 'round'],
                        ['stroke', colors[offset].color + "80"],
                        ['stroke-width', '1'],
                        ['fill', 'transparent'],
                        ['marker-end', `url(#arrow-head${color.substring(1)})`],
                    ]);

                    group.appendChild(arrowMarker(colors[offset].color));
                    group.appendChild(arrow);
                }

                if (descriptions.length < 6) {
                    if (size > 0) {
                        renderArrow();
                        renderDescHl();
                    }
                }

                /**
                 * render highlight around described ranges
                 * @returns {void}
                 */
                function renderDescHl() {
                    if (size > 0) {
                        group.appendChild(renderHighlight(offset, offset + size - 1,
                            colors[offset].color,
                        ));
                    }
                }

                let colorDesc = color;
                if (colorDesc == "") {
                    if (size > 0) {
                        colorDesc = colors[offset].color;
                    }
                    else {
                        colorDesc = myTheme.highlight;
                    }
                }
                const nameEl = svgText(
                    `${name}`,
                    undefined,
                    [
                        ['x', `${dx + myLayout.descX + widths.offsetsize + myLayout.offsetM.width * .5}`],
                        ['y', `${dy + y}`],
                        ['font-family', myLayout.descFont],
                        ['fill', colorDesc],
                        ['font-size', `${myLayout.descSize}px`],
                        ['xml:space', 'preserve'],
                        ['text-anchor', 'start'],
                    ].concat(attributes));
                group.appendChild(nameEl);

                const valueEl = svgText(
                    `${value}`,
                    undefined,
                    [
                        ['x', `${dx + myLayout.descX + widths.offsetsize + widths.name + myLayout.offsetM.width * 1}`],
                        ['y', `${dy + y}`],
                        ['font-family', myLayout.descFont],
                        ['fill', colorDesc],
                        ['font-size', `${myLayout.descSize}px`],
                        ['xml:space', 'preserve'],
                        ['text-anchor', 'start'],
                    ].concat(attributes));
                group.appendChild(valueEl);

                y += myLayout.nibblesV;
            }
        }
        renderDescText(gDescs);
        renderDescText(gDescsBg,
            myTheme.dimmed, .5, .5,
            [
                ['stroke-width', '.5'],
                ['stroke', myTheme.dimmed],
                ['stroke-linejoin', 'round'],
                ['stroke-linecap', 'round'],
            ]
        );

        /**
         * Renders highlights specified in JSON
         * @returns {void}
         */
        function renderHighlights() {
            const highlights = myData.highlights;
            for (const [index, highlight] of highlights.entries()) {
                const [offset, size] = highlight;
                svgEl.appendChild(renderHighlight(offset, offset + size - 1));
            }
        }
        renderHighlights();
        const maxX = myLayout.descX
            + widths.offsetsize
            + widths.name
            + widths.value
            + myLayout.offsetM.width * 2
            ;
        const maxY = myLayout.gridY + myLayout.nibblesV * max(descriptions.length - 1, lines.length - 1) + myLayout.marginV;
        RATIO = maxX / maxY;
        setAttributes(svgEl, [
            ['viewBox', `0 0 ${maxX} ${maxY}`],
        ]);
        setAttributes(getElement('blueBg', SVGRectElement), [
            ['height', maxY],
            ['width', maxX],
            ['stroke', myTheme.highlight],
        ]);

        onWindowResize();
    })();

}

/**
 * Resizer listener
 */
function onWindowResize() {
    setAttributes(getSVGElement("svg"), [
        ['width', `${window.innerWidth - 20}`],
        ['height', `${window.innerWidth / RATIO}`],
    ]);
}


