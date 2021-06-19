window.gfx = {};

gfx.setPainter = function(painter) {
    this.painter = painter;
}

gfx.setColor = function(r, g, b, a) {
    gfx.setColorForPainter(this.painter, r, g, b, a);
}

gfx.setColorForPainter = function(painter, r, g, b, a = undefined) {
    if (a !== undefined) {
        painter.strokeStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
        painter.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }
    else {
        painter.strokeStyle = "rgb(" + r + ", " + g + ", " + b + ")";
        painter.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

const pixelSize = 16;

const planetBasePixels = [
    [],
    [6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 10, 11],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    [4, 5, 6, 7, 8, 9, 10, 11],
    [6, 7, 8, 9],
    [],
];

const baseColour = 255;

function drawPlanet() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    gfx.setPainter(ctx);

    drawPlanetBase(ctx);
}

function drawPlanetBase(ctx) {
    gfx.setColor(baseColour, baseColour, baseColour);

    planetBasePixels.forEach(function(line, yPixel) {

        for (let xPixel of line) {
            let xValue = Math.abs(7.5 - xPixel);
            let yValue = Math.abs(7.5 - yPixel);
            let average = (xValue + yValue) / 2;

            // Make the amplitude random to give a more naturally rounded effect.
            let amplitude = getRandomInt(15, 25);

            let difference = (255 * average) / amplitude;
            let colour = 255 - difference;
            gfx.setColor(colour, colour, colour);

            ctx.fillRect(xPixel * pixelSize, yPixel * pixelSize, pixelSize, pixelSize);
        }
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}