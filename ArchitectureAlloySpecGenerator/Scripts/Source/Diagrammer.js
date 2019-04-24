let STAGE = undefined;

(function () {
    initializeCanvas();
    initializeCanvasElements();
})();

function initializeCanvas() {
    var oldCanvas = document.getElementById('canvas');

    STAGE = new fabric.Canvas('canvas',
        {
            width: oldCanvas.parentNode.clientWidth,
            height: oldCanvas.parentNode.clientHeight
        });
}

function initializeCanvasElements() {
    var rect = new fabric.Rect({
        left: 300,
        top: 200,
        fill: 'red',
        width: 20,
        height: 20
    });
    STAGE.add(rect);
}