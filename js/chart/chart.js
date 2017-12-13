const PlotRight = require('./../plotright.js').default;

function Chart(conf) {
    this.conf = conf;
    this.data = undefined;
    this.type = conf.type || PlotRight.TYPE.LINE;

    this.DOM_ELEMENTS = {};
    this.chartProps = {};
}

Chart.prototype = {
    constructor: Chart,
    update: function(conf) {}
}

export default Chart;
