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
      
    const renderGroup = chartGroup.append('g')
      .classed('render-group', true);

    renderGroup.append('g')
      .classed('line-chart', true)
      .append('path')
        .data([chart.data])
        .style('fill', 'none')
        .style('stroke', 'steelblue')
        .style('stroke-width', '2px')
        .attr('d', lineFn);
      
    chart.conf.elements.dataPoints = chart.conf.elements.dataPoints || {};
    const dataPoints = chart.conf.elements.dataPoints;
    dataPoints.show = dataPoints.show === undefined ? true : dataPoints.show;
    dataPoints.size = dataPoints.size || 4;
    dataPoints.fill = dataPoints.fill || 'steelblue';
    if (dataPoints.show) {
      renderGroup.append('g')
        .classed('circle-group', true)
        .selectAll('circle').data(chart.data)
        .enter().append('circle')
          .style('fill', dataPoints.fill)
          .style('stroke', 'steelblue')
          .style('stroke-width', '2px')
          .attr('cx', (d) => x(timeFormat(new Date(+d.key))) + xTickDistance)
          .attr('cy', (d) => y(d.value))
          .attr('r', `${dataPoints.size}px`);
    }
  };

  return lineRenderer;
})();

export default LineRenderer;
