#!/usr/bin/env node
args = process.argv.slice(2)
console.log('Arguments', args)
lanesSide = parseInt(args[0]);
patchesAhead = parseInt(args[1]);
patchesBehind = parseInt(args[2]);
trainIterations = parseInt(args[3]);
hiddenLayers = parseInt(args[4]);
hiddenLayerSize = parseInt(args[5]);

var convnetjs = require("convnetjs");
var deepqlearn = require(__dirname+'/node_modules/convnetjs/build/deepqlearn.js')

headless = true;

var num_inputs = (lanesSide * 2 + 1) * (patchesAhead + patchesBehind);
var num_actions = 5;
var temporal_window = 3;
var network_size = num_inputs * temporal_window + num_actions * temporal_window + num_inputs;

var layer_defs = [];
layer_defs.push({
    type: 'input',
    out_sx: 1,
    out_sy: 1,
    out_depth: network_size
});
for (var i=0; i<hiddenLayers; i++) {
 layer_defs.push({
     type: 'fc',
     num_neurons: hiddenLayerSize,
     activation: 'relu'
 });
}
layer_defs.push({
    type: 'regression',
    num_neurons: num_actions
});

var tdtrainer_options = {
    learning_rate: 0.001,
    momentum: 0.0,
    batch_size: 64,
    l2_decay: 0.01
};

var opt = {};
opt.temporal_window = temporal_window;
opt.experience_size = 3000;
opt.start_learn_threshold = 500;
opt.gamma = 0.7;
opt.learning_steps_total = trainIterations;
opt.learning_steps_burnin = 1000;
opt.epsilon_min = 0.0;
opt.epsilon_test_time = 0.0;
opt.layer_defs = layer_defs;
opt.tdtrainer_options = tdtrainer_options;

brain = new deepqlearn.Brain(num_inputs, num_actions, opt);

learn = function (state, lastReward) {
    brain.backward(lastReward);
    var action = brain.forward(state);
    return action;
}


// gameopt.js
var e = !1,
    f = !1,
k = !1;
var l = [0, 1, 2, 3, 4],
    m = 0;

function Map(a, b, d) {
    this.data = [];
    this.defaultValue = d;
    for (var c = 0; c < a; c++) {
        for (var h = [], g = 0; g < b; g++)
            h.push(d);
        this.data.push(h)
    }
    this.reset = function() {
        for (var a = 0; a < this.data.length; a++)
            for (var b = 0; b < this.data[a].length; b++) this.data[a][b] = this.defaultValue
    };
    this.set = function(a, b, c) {
        a = Math.floor(a);
        b = Math.floor(b);
        0 <= a && a < this.data.length && 0 <= b && b < this.data[a].length && (this.data[a][b] = c)
    };
    this.get = function(a, b, c) {
        a = Math.floor(a);
        b = Math.floor(b);
        return 0 <= a && a < this.data.length && 0 <= b && b < this.data[a].length ?
            this.data[a][b] : "undefined" == typeof c ? this.defaultValue : c
    };
    this.m = function() {
        var a = n,
            c = lanesSide,
            d = patchesAhead,
            h = patchesBehind;
        p = q[0].b;
        for (var g = -c; g <= c; g++)
            for (var u = -d; u < h; u++) a.data[g + c][u + d] = this.get(p + g, 3 * b / 4 + u, 0)
    };
    this.u = function() {
        for (var a = Array(this.data.length * this.data[0].length), b = 0; b < this.data.length; b++)
            for (var c = 0; c < this.data[b].length; c++) a[this.data.length * c + b] = this.data[b][c] / 7;
        return a
    }
}

function r() {
    this.y = this.x = 0;
    this.a = this.c = 1;
    this.b = 0;
    this.f = Array(60);
    this.h = function() {
        var a = Math.floor(140 * Math.random() / 20),
            b = 1 + .7 * Math.random();
        this.x = 20 * a + 4;
        this.a = b;
        this.b = a
    };
    this.h();
    this.y = 10 * Math.floor(700 * Math.random() / 10);
    this.move = function(a) {
        var b = this.y - (this.c * this.a - t);
        a && 525 > this.y && 525 <= b ? (v++, w++, x++) : a && 525 < this.y && 525 >= b && (v--, w--, x--);
        this.y = b;
        this.f[y % this.f.length] =
            this.c * this.a * 20;
        a = 20 * this.b + 4 - this.x;
        this.x = Math.abs(a) < 20 / 30 ? 20 * this.b + 4 : 0 < a ? this.x + 20 / 30 : this.x - 20 / 30;
        0 > this.y + 68 && (this.y = 734, this.h());
        700 < this.y - 68 && (this.y = -34, this.h())
    };
    this.i = function(a) {
        var b = 1;
        1 == a && (b = 10);
        for (a = 0; 15 > a; a += 10)
            for (var d = 0; 34 > d; d += 5) z.set((this.x + a) / 20, (this.y + d) / 10, b * this.c * this.a)
    };
    this.l = function() {
        for (var a = 2, b = 1; 5 > b; b++) {
            var d = z.get((this.x + 7.5) / 20, (this.y - 10 * b) / 10, 7);
            7 > d && (a = Math.min(a, .5 * (b - 1)), a = Math.min(a, d / this.a))
        }
        this.c = a
    };
    this.g = function(a) {
        for (var b = (this.x +
                7.5) / 20 + a, d = this.y / 10, c = .5 > Math.abs(this.x - (20 * this.b + 4)), h = 3 * -this.a; 4 > h; h++) c = c && 7 <= z.get(b, d + h, 0);
        c && (this.b += a);
        return c
    };
    this.o = function() {
        for (var a = !0, b = 1; 5 > b; b++) a = a && 7 <= z.get((this.x + 7.5) / 20, (this.y - 10 * b) / 10, a ? 0 : 2);
        for (b = 1; 5 > b; b++) A.set((this.x + 7.5) / 20, (this.y - 10 * b) / 10, a ? 0 : 2);
        for (var b = (this.x + 7.5) / 20 + -1, d = this.y / 10, a = .5 > Math.abs(this.x - (20 * this.b + 4)), c = 3 * -this.a; 4 > c; c++) a = a && 7 <= z.get(b, d + c, 0);
        for (c = 3 * -this.a; 4 > c; c++) A.set(b, d + c, a ? 0 : 2);
        b = (this.x + 7.5) / 20 + 1;
        a = .5 > Math.abs(this.x - (20 * this.b + 4));
        for (c = 3 * -this.a; 4 > c; c++) a = a && 7 <= z.get(b, d + c, 0);
        for (c = 3 * -this.a; 4 > c; c++) A.set(b, d + c, a ? 0 : 2)
    };
    this.j = function() {
        switch (m) {
            case 1:
                2 > this.a && (this.a += .02);
                break;
            case 2:
                0 < this.a && (this.a -= .02);
                break;
            case 3:
                var a = this.g(-1);
                a && (B = 0);
                m = 0;
                break;
            case 4:
                (a = this.g(1)) && (B = 0), m = 0
        }
    };
    this.s = function() {
        for (var a = 0, b = 0; b < this.f.length; b++) a += this.f[b];
        return Math.floor(a / this.f.length)
    }
}
for (var z = new Map(7, 70, 7), A = new Map(7, 70, 7), n = new Map(1 + 2 * lanesSide, patchesAhead + patchesBehind, 0), p = 0, q = [], D = 0; 20 > D; D++) q.push(new r);
var y = 0,
    t = 1.5,
    E = 0,
    I = 0,
    B = 0,
    v = 0,
    w = 0,
    x = 0,
    J = !1;
reset = function() {
    z = new Map(7, 70, 7);
    A = new Map(7, 70, 7);
    n = new Map(1 + 2 * lanesSide, patchesAhead + patchesBehind, 0);
    q = [];
    for (var a = 0; 20 > a; a++) q.push(new r);
    y = 0;
    t = 1.5;
    x = w = v = B = I = E = 0
};
setFast = function(a) {
    J = a
};

function K(a, b) {
    var d = 0;
    if (3 == B || 4 == B) d = B;
    switch (a.keyCode) {
        case 39:
            a.preventDefault();
            d = 4;
            break;
        case 37:
            a.preventDefault();
            d = 3;
            break;
        case 38:
            a.preventDefault();
            d = 1;
            break;
        case 40:
            a.preventDefault(), d = 2
    }
    b && (B = d)
}

function L() {
    z.reset();
    for (var a = 0; a < q.length; a++) q[a].move(0 != a), q[a].i();
    t = 1.5 - (q[0].y - 525) / 1;
    for (a = 0; a < q.length; a++) q[a].l(), 0 != a && Math.random() > .99 + .004 * q[a].c && q[a].g(.5 < Math.random() ? -1 : 1);
    q[0].i(!0);
    f && (A.reset(), q[0].o());
    I += q[0].c * q[0].a;
    0 == y % 30 && (z.m(), a = learn(n.u(), (I - 60) / 20), x = 0, m = 0 <= a && a < l.length ? a : B, I = 0);
    q[0].j();
    y++;
}

evalRun = !1;
doEvalRun = function(a, b, d, c) {
    var h = NaN;
    "undefined" != typeof d && (h = c);
    c = J;
    evalRun = J = !0;
    for (var g = [], F = 0, C = 0; C < a; C++) {
        //console.log("run: " + (C + 1) + "/" + a);
        reset();
        for (var G = 0, H = 0; H < b; H++) 0 == F % h && d(), L(), G += q[0].c * q[0].a, F++;
        g.push(Math.floor(G / b * 2E3) / 100)
    }
    reset();
    J = c;
    evalRun = !1;
    g.sort();
    //console.log(g);
    return g[a / 2]
};
new Map(7, 70, 1E3);

function M() {
    L();
    J ? setTimeout(M, 0) : window.requestAnimationFrame(M)
}

function N() {
    console.log("reset");
    w = 0;
    setTimeout(N, 6E4)
}
//N();


// traiWebworker.js
brain.learning = true;

if (trainIterations > 0) {
 var totalFrames = 30 /*decisionFrequency*/ * trainIterations;
 var numRuns = totalFrames / 100000 + 1;
 var percent = 0;
 doEvalRun(numRuns, totalFrames / numRuns, function () {
   console.log(percent + "% done");
   percent++;
 }, 
 totalFrames / 100);
}

// evalWebWorker.js
brain.learning = false;

var runs = 10;
var frames = 100000;
var percent = 0;
var mph = doEvalRun(runs, frames, function () {
    console.log(percent + "% done");
    percent++;
}, runs * frames / 100);
console.log('MPH', mph);

