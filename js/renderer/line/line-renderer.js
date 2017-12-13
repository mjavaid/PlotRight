const d3 = require('d3');
const LineRenderer = (function() {
    const lineRenderer = {};

    lineRenderer.draw = function(chart) {
        const chartGroup = chart.DOM_ELEMENTS.chartGroup;
        const x = chart.chartProps.x;
        const y = chart.chartProps.y;
        const xTickDistance = x.bandwidth() / 2;
		const timeFormat = d3.timeFormat('%d-%m-%Y');

        const lineFn = d3.line()
            .x(d => x(timeFormat(new Date(+d.key))) + xTickDistance)
            .y(d => y(d.value));
        
        chartGroup.append('g')
            .classed('line-chart', true)
            .append('path')
                .data([chart.data])
                .style('fill', 'none')
                .style('stroke', 'steelblue')
                .style('stroke-width', '2px')
                .attr('d', lineFn);
    };

    return lineRenderer;
})();

export default LineRenderer;
