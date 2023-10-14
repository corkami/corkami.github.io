// MIT - Ange Albertini 2023
// @ts-check

/**
 * serialized SVG element as XML
 * @returns {string} serialized SVG as XML
 */
function getSVGxml(id = 'svg') {
  const svgEl = document.getElementById(id);
  if (svgEl == null) {
    return '';
  }
  const serializer = new XMLSerializer();
  return serializer.serializeToString(svgEl);
}


/**
 * Downloads the given blob and save it as a file
 * @param {!Blob} blob binary data with mimetype
 * @param {string} filename file location to save it to
 * @return {void}
*/
function saveAs(blob, filename) {
  const urlObj = URL.createObjectURL(blob);
  const elA = document.createElement('a');
  elA.href = urlObj;
  elA.download = filename;
  document.body.appendChild(elA);
  elA.click();
  setTimeout(() => {
    document.body.removeChild(elA);
    URL.revokeObjectURL(urlObj);
  }, 200);
}


/**
 * Sets a download handler for the save SVG button
 * @param {!Element} btnEl Element of the Save as SVG button
 * @return {void}
 */
function setSVGsaving(btnEl) {
  btnEl.addEventListener('click', function () {
    const svgEl = document.getElementById('svg');
    if (svgEl == null) {
      return;
    }
    const blob = new Blob([getSVGxml()], { type: 'image/svg+xml' });
    saveAs(blob, window.location.pathname.split('/').pop() + '.svg');
  });
}



/**
 * Sets a download handler for the PNG save button
 * @param {!Element} btnEl Element of the Save as PNG button
 * @param {boolean} [transparent=false] Save as a transparent PNG or not
 * @return {void}
*/
function setPNGsaving(btnEl, transparent = false) {
  btnEl.addEventListener('click', function () {
    const svgEl = getElement('svg', SVGElement);
    const canvas = document.createElement('canvas');

    const oldwidth = svgEl.getAttribute('width');
    const oldheight = svgEl.getAttribute('height');
    const ratio = oldheight / oldwidth;
    const chosenwidth = getElement('pngWidth', HTMLInputElement).value;

    setAttributes(getSVGElement("svg"), [
      ['width', `${chosenwidth}`],
      ['height', `${chosenwidth * ratio}`],
    ]);

    canvas.width = parseFloat(window.getComputedStyle(svgEl).width);
    canvas.height = parseFloat(window.getComputedStyle(svgEl).height);

    const img = new Image();
    const data = encodeURIComponent(getSVGxml());
    img.src = 'data:image/svg+xml,' + data;
    img.onload = function () {
      const ctx = canvas.getContext('2d');
      const blob = new Blob([getSVGxml()], { type: 'image/svg+xml' });
      if ((ctx == null) || (blob == null)) {
        return;
      }

      if (!transparent) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob == null) {
            return;
          }
          saveAs(blob, window.location.pathname.split('/').pop() + '.png');
        });
    };
    setAttributes(getSVGElement("svg"), [
      ['width', oldwidth],
      ['height', oldheight],
    ]);
  });
}

/**
 * Sets callbacks for PNG and SVG buttons if present
 * @return {void}
*/
function setSaveCallbacks() {
  const btnPNG = document.getElementById('savePNG');
  if (btnPNG != null) {
    setPNGsaving(btnPNG);
  }
  const btnSVG = document.getElementById('saveSVG');
  if (btnSVG != null) {
    setSVGsaving(btnSVG);
  }
}

setSaveCallbacks();
