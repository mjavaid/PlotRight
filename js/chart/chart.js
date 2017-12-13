function Chart(conf) {
    this.conf = conf;
    this.data = undefined;

    this.DOM_ELEMENTS = {};
    this.chartProps = {};
}

Chart.prototype = {
    constructor: Chart,
    update: function(conf) {}
}

export default Chart;
