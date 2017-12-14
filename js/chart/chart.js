const PlotRight = require('./../plotright.js').default;

function Chart(conf) {
    conf.elements = conf.elements || {};
    conf.axis = conf.axis || {};
    conf.axis.x = conf.axis.x || {};
    conf.axis.y = conf.axis.y || {};
    if (conf.axis.gridLines) {
        conf.axis.x.gridLines = true;
        conf.axis.y.gridLines = true;
    } else {
        conf.axis.x.gridLines = conf.axis.x.gridLines === undefined ? true : conf.axis.x.gridLines;
        conf.axis.y.gridLines = conf.axis.y.gridLines === undefined ? true : conf.axis.y.gridLines;
    }
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
