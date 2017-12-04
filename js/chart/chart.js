function Chart(conf) {
    this.conf = conf;
    this.data = undefined;
}

Chart.prototype = {
    constructor: Chart,
    update: function(conf) {}
}

export default Chart;
