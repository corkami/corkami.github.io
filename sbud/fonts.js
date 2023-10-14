// @ts-check

class Font {

    /**
     * 
     * @param {string} text text to be rendered
     * @param {string} fontName font family name
     * @param {number} fontSize font size, in pixels (without the unit)
     * @returns {{width:number, height:number}}
     */
    static getMetrics(text, fontName, fontSize) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (ctx == null) {
            throw new Error("Invalid canvas context");
        } else {
            ctx.font = `${fontSize}px "${fontName}"`;
            const metrics = ctx.measureText(text);
            canvas.remove();
            return {
                width: metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight,
                //width: metrics.width,
                height: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
            };
        }
    }

    /**
     * 
     * @param {string} text 
     * @param {string} family 
     * @param {number} size 
     * @returns {number}
     */
    static getTextWidth(text, family, size) {
        const el = document.createElement("span");
        document.body.appendChild(el);

        el.style.fontFamily = family;
        el.style.fontSize = size + "px";
        el.style.height = 'auto';
        el.style.width = 'auto';
        el.style.position = 'absolute';
        el.style.whiteSpace = 'no-wrap';
        el.innerHTML = text
            .replaceAll(`&`, "&amp;")
            .replaceAll(`<`, "&lt;")
            .replaceAll(`>`, "&gt;")
            .replaceAll(`"`, "&quot;")
            .replaceAll(`'`, "&#039;");

        const width = Math.ceil(el.clientWidth);
        document.body.removeChild(el);
        return width;
    }

}

const standardTerminal = [
    "Print Char 21",
    "Beeb Mode One",
    "Pet Me 64",
    "IBM MDA",
    'PxPlus IBM VGA9',
    'PxPlus IBM MDA',
    "monospace",
].map((s) => `'${s}'`).join(",");
