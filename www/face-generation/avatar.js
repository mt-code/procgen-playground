/////////////////////////////////////////////////////////////
//drawAvatar
//Author: Wubs
//License: Feel free to use this for whatever you want
//
//INKY: created by Seph Reed https://github.com/SephReed
/////////////////////////////////////////////////////////////

window.INKY = {};


INKY.setPainter = function(painter) {
    this.painter = painter;
}

INKY.setColor = function(rOrRgb, g, b, a) {
    INKY.setColorForPainter(this.painter, rOrRgb, g, b, a);
}

INKY.setColorForPainter = function(painter, rOrRgb, g, b, a) {
    var r;
    if (typeof rOrRgb == "object") {
        r = rOrRgb[0];
        g = rOrRgb[1];
        b = rOrRgb[2];
        a = rOrRgb[3];
    }
    else r = rOrRgb;

    if (a !== undefined) {
        painter.strokeStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
        painter.fillStyle = "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }
    else {
        painter.strokeStyle = "rgb(" + r + ", " + g + ", " + b + ")";
        painter.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
    }
}

INKY.HSV_to_RGB = function(hue, saturation, value) {
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

INKY.getNextColor = function() {
    return INKY.colorModes.current.getNextColor();
}

INKY.colorModes = {};

var rainbow = INKY.colorModes.current = INKY.colorModes.rainbow = {};
rainbow.hue = 0.1;
rainbow.saturation = 0.75;
rainbow.value = 1;
//
rainbow.hueChange = 0.01;
rainbow.saturationChange = 0;
rainbow.valueChange = 0;
//
rainbow.getNextColor = function() {
    var rgb = INKY.HSV_to_RGB(rainbow.hue, rainbow.saturation, rainbow.value);
    rainbow.hue += rainbow.hueChange;
    rainbow.saturation += rainbow.saturationChange;
    rainbow.value += rainbow.valueChange;
    return rgb;
}




function drawAvatar() {
    var xx = 0;
    var yy = 0;
    var width = 8;
    var height = 8;
    var size = 32;
    var i = 0;
    var b = [];
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#000000";
    INKY.setPainter(ctx);
    INKY.setColor(INKY.HSV_to_RGB(Math.random(), 1, 1));
    INKY.colorModes.rainbow.hue = Math.random();
    // INKY.colorModes.rainbow.hueChange = Math.random() * .01;


    for (yy = 0; yy < height; yy++) {
        for (xx = 0; xx < (width / 2); xx++) {
            INKY.setColor(INKY.getNextColor())
            if (Math.random(1) > 0.4) {
                ctx.fillRect(xx * size, yy * size, size, size);
                ctx.fillRect(((width - 1) - xx) * size, yy * size, size, size); // Mirror H
            }
        }
    }
}