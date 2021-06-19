window.gfx = {};

gfx.HSV_to_RGB = function(hue, saturation, value) {
    if (hue < 1)
        hue += 1;
    hue %= 1;

    var rgb;
    if (saturation == 0 || value == 0)
        rgb = [value, value, value];  //used car salesman rick jim here!

    else {
        rgb = [];
        var oneThird = 1 / 3;
        var twoThirds = 2 / 3;

        var rgbPos = []
        rgbPos[0] = ((hue + oneThird) % 1) / twoThirds;  //at 0, red pos = 0.5 or peak of sine wave
        rgbPos[1] = hue / twoThirds;  //at .3333, green pos = 0.5 or peak of sine wave
        rgbPos[2] = (hue - oneThird) / twoThirds;  //at .6666, blue pos = 0.5 or peak of sine wave

        for (var i in rgbPos) {
            var pos = rgbPos[i];
            if (pos > 0 && pos < 1)
                rgb[i] = Math.sin(pos * Math.PI) * value;
            else
                rgb[i] = 0;
        }


        if (saturation < 1) {
            var max = Math.max(Math.max(rgb[0], rgb[1]), rgb[2]);

            for (var i in rgb)
                rgb[i] += (max - rgb[i]) * (1 - saturation);
        }
    }

    for (var i in rgb)
        rgb[i] *= 256;

    return rgb;
}

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

function drawPlanet() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    gfx.setPainter(ctx);
    drawPlanetBase(ctx);
}

function generateBaseColour() {
    let saturation;
    let rareness = Math.random();

    if (rareness >= 0.95) {
        saturation = 1;
    } else if (rareness >= 0.9) {
        saturation = 0.8;
    } else if (rareness >= 0.7) {
        saturation = 0.6;
    } else if (rareness >= 0.5) {
        saturation = 0.5;
    } else {
        saturation = 0.4;
    }

    return gfx.HSV_to_RGB(Math.random(), Math.random(), saturation);
}

function drawPlanetBase(ctx) {
    let baseColourRgb = generateBaseColour();

    planetBasePixels.forEach(function(line, yPixel) {
        for (let xPixel of line) {
            let xValue = Math.abs(7.5 - xPixel);
            let yValue = Math.abs(7.5 - yPixel);
            let average = (xValue + yValue) / 2;

            // Make the amplitude random to give a more naturally rounded effect.
            // The lower this value, the more "broken" the planet will look.
            let amplitude = getRandomInt(10, 25);

            let red = baseColourRgb[0] - ((baseColourRgb[0] * average) / amplitude);
            let blue = baseColourRgb[1] - ((baseColourRgb[1] * average) / amplitude);
            let green = baseColourRgb[2] - ((baseColourRgb[2] * average) / amplitude);

            gfx.setColor(red, blue, green);

            ctx.fillRect(xPixel * pixelSize, yPixel * pixelSize, pixelSize, pixelSize);
        }
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}