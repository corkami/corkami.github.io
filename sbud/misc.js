// @ts-check


/**
 *  A or B
 * @param {Array} A an array
 * @param {Array} B an array
 * @returns intersection array
 */
function intersection(A, B) {
    return A.filter(x => B.includes(x));
}

/**
 * A - B
 * @param {Array} A an array
 * @param {Array} B an array
 * @returns difference array
 */
function difference(A, B) {
    return A.filter(x => !B.includes(x));
}

/**
 * A + B
 * @param {Array} A an array
 * @param {Array} B an array
 * @returns Array
 */
function union(A, B) {
    return [...new Set([...A, ...B])];
}


/**
 * check if two arrays have same length and content
 * @param {Array} a 
 * @param {Array} b 
 * @returns 
 */
function sameContents(a, b) {
    return a.length === b.length && a.every((v, i) => v === b[i]);
}


console.assert(sameContents(union([1], [2]), [1, 2]));
console.assert(sameContents(union([2], [1]), [2, 1]));
console.assert(sameContents(union([2, 1], [1]), [2, 1]));
console.assert(sameContents(union([1], [1, 2]), [1, 2]));

/** return max of A and B
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function max(a, b) {
    if (a < b) {
        return b;
    }
    else {
        return a;
    }
}