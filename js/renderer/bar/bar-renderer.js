const d3 = require('d3');

const BarRenderer = (function() {
    const barRenderer = {};

    barRenderer.draw = function(chart) {
        const chartGroup = chart.DOM_ELEMENTS.chartGroup;
        const x = chart.chartProps.x;
        const y = chart.chartProps.y;
        const bandWidth = x.bandwidth();
        const xTickDistance = bandWidth / 2;
        const timeFormat = d3.timeFormat('%d-%m-%Y');
        
        const renderGroup = chartGroup.append('g')
            .classed('render-group', true);

        renderGroup.append('g')
            .classed('bar-group', true)
            .selectAll('rect').data(chart.data)
            .enter().append('rect')
                .style('fill', 'steelblue')
                .style('stroke', 'none')
                .attr('x', (d) => x(timeFormat(new Date(+d.key))))
                .attr('y', (d) => y(d.value))
                .attr('width', bandWidth - 4)
                .attr('height', (d) => chart.conf.chartHeight - y(d.value));

    }

    return barRenderer;
})();

export default BarRenderer;
