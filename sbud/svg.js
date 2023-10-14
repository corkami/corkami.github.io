// @ts-check

/**
 * Creates an XMLns element [with specific attributes]
 * @param {string} qualifiedName Name of the element
 * @param {Array} [attributes=[]] Attributes to set to the element
 * @returns {SVGElement} a XML namespace element
 */
function createEl(qualifiedName, attributes = []) {
    const xmlns = 'http://www.w3.org/2000/svg';
    const el = document.createElementNS(xmlns, qualifiedName);
    setAttributes(el, attributes);
    return el;
}

/**
 * Creates a root SVG element
 * @param {number} width 
 * @param {number} height 
 * @returns {SVGElement} a root SVG element
 */
function createSVG(width, height) {
    const svgEl = createEl('svg', [
        ['id', 'svg'],
        ['version', '1.1'],
        ['viewBox', `0 0 ${width} ${height}`],
        ['width', `${width}`],
        ['height', `${height}`],
        ['preserveAspectRatio', "xMinYMin meet"],
    ]);
    svgEl.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/2000/svg');
    svgEl.style.display = 'block';
    return svgEl;
}

/**
  * Creates a rectangle covering the whole image.
  * @param {string} color theme background color
  * @returns {SVGElement} a rectangle element
  */
function createBackground(color, width, height) {
    const backgroundRect = createEl('rect', [
        ['id', 'blueBg'],
        ['x', 0],
        ['y', 0],
        ['width', `${width}`],
        ['height', `${height}`],
        ['fill', `${color}`],
        ['stroke', 'black'],
        ['stroke-width', '1'],
    ]);
    return backgroundRect;
}

/**
 * Sets an array of attributes to an element
 * @param {?Element} el
 * @param {Array} [attributes=[]]
 */
function setAttributes(el, attributes = []) {
    for (let [attribute, value] of attributes) {
        el?.setAttribute(attribute, value);
    }
    return;
}

/**
 * Creates an SVG group
 * @param {string} [id=''] group id
 * @param {Array} [attributes=[]] Optional attributes to set
 * @returns {SVGElement} A group (with the given id)
 */
function svgGroup(id = '', attributes = []) {
    const group_ = createEl('g');
    if (id !== '') {
        group_.id = id;
    }
    if (attributes.length > 0) {
        setAttributes(group_, attributes);
    }
    return group_;
}

/**
 * Draws a line path guide without any color attribute
 * @param {number} x1 x coordinate of start
 * @param {number} y1 y coordinate of start
 * @param {number} x2 x coordinate of end
 * @param {number} y2 y coordinate of end
 * @returns {SVGPathElement} the line element
 */
function svgLine(x1, y1, x2, y2, attributes = []) {
    // 'line' is unsupported by Inkscape
    const line = svgPath(`M ${x1},${y1} L ${x2},${y2}`, attributes);
    return line;
}


/**
 * Draws a line path guide without any color attribute
 * @param {string} drawing path to be drawn
 * @returns {SVGPathElement} the path element
 */
function svgPath(drawing, attributes = []) {
    attributes = attributes.concat([
        ['d', drawing],
    ]);
    const pathEl = createEl('path', attributes);
    if (!(pathEl instanceof SVGPathElement)) {
        throw Error('Error creating Path element');
    }
    return pathEl;
}

const directions = {
    center: 0,
    north: 1,
    northeast: 2,
    east: 3,
    southeast: 4,
    south: 5,
    southwest: 6,
    west: 7,
    northwest: 8,
}

/**
 * Creates a arrow head marker with a specific color
 * @param {string} color 
 * @returns {SVGElement} marker element
 */
function arrowMarker(color) {
    const marker =
        createEl('marker', [
            ['id', `arrow-head${color.substring(1)}`],
            ['viewBox', '0 0 10 10'],
            ['refX', '5'],
            ['refY', '5'],
            ['markerWidth', '6'],
            ['markerHeight', '6'],
            ['fill', color + "80"],
            ['orient', 'auto-start-reverse'],],
        );
    marker.appendChild(createEl('path', [
        ['d', 'M 0 0 L 10 5 L 0 10 z'],
    ]));
    return marker;
};
