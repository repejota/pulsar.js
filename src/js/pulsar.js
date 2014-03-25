//
// BEGIN LICENSE BLOCK
//
// The MIT License (MIT)
//
// Copyright (canvas) 2014 Raül Pérez
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//
// END LICENSE BLOCK
//

/**
 *
 * @param graph
 * @param c
 * @param width
 * @param height
 * @param scale
 */
function feedback (graph, c, width, height, scale) {
    graph.save();
    graph.translate(width / 2, height / 2);
    graph.scale(scale, scale);
    graph.translate(-width / 2, -height / 2);
    graph.drawImage(c, 0, 0);
    graph.restore();
}

/**
 *
 * @type {HTMLElement}
 */
var canvas = document.getElementById("canvas");

/**
 *
 */
var Graph = canvas.getContext('2d');

/**
 *
 * @type {number}
 */
var width = window.innerWidth;

/**
 *
 * @type {number}
 */
var height = window.innerHeight;

/**
 *
 */
var seed;

/**
 *
 * @type {number}
 */
canvas.width = width;

/**
 *
 * @type {number}
 */
canvas.height = height;

/**
 *
 * @returns {number}
 */
function rnd () {
    seed = (seed * 214013 + 2531011) & 0xffffffff;
    return Math.abs(seed >> 16) / 32768;
}

/**
 *
 * @type {number}
 */
var step = 1 / 25;

/**
 *
 * @type {number}
 */
var t = 0;

/**
 *
 */
window.setInterval(function () {

    // Clear background
    Graph.fillStyle = "#000000";
    Graph.fillRect(0, 0, width, height);
    Graph.save();

    seed = 4;

    for (var j = 0; j < 500; j++) {

        var x = 4 * rnd() - 2 - Math.cos(1.31 * t);

        var y = 4 * rnd() - 2 - Math.sin(t);

        if (x * x + y * y < 1) {

            var tt = Math.pow(x * x + y * y, 2);
            var d = Math.pow(x * x + y * y, 1 / 6);

            x /= d;
            y /= d;

            var s = (5 + Math.sin(t * 10.2)) / 6;

            x *= s;
            y *= s;

            x = x * 100 + width / 2;
            y = y * 100 + height / 2;

            var r = Math.floor(rnd() * 224) + 32;
            var g = Math.floor(rnd() * 224) + 32;
            var b = Math.floor(rnd() * 224) + 32;


            Graph.globalAlpha = 1 - tt;

            Graph.fillStyle = "rgb(" + r + "," + g + "," + b + ")";

            Graph.fillRect(x - 2, y - 2, 5, 5);

        }
    }

    Graph.globalCompositeOperation = "lighter";

    var count = 7;

    for (var i = 0; i < count; i++) {
        var val = count - 1 - i;
        Graph.globalAlpha = 0.6;
        feedback(Graph, canvas, width, height, Math.pow(2, 1 / 2 / Math.pow(2, val / 2)));
    }

    Graph.restore();

    t += step;

}, step * 1000);
