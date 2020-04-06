const Renderer = require('../renderer.js').default;
const d3 = require('d3');

const LineRenderer = (function() {
  const lineRenderer = {
    type: 'LINE'
  };

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

    renderGroup.selectAll('g.series-line')
      .data(chart.data).enter()
        .append('g')
        .classed('series-line', true)
          .append('path')
          .classed('line-chart', true)
          .style('fill', 'none')
          .style('stroke', d => d.color)
          .style('stroke-width', '2px')
          .attr('d', (d) => {
            console.log('LINE D:', d);
            return lineFn(d.values);
          });
      
    chart.conf.elements.dataPoints = chart.conf.elements.dataPoints || {};
    const dataPoints = chart.conf.elements.dataPoints;
    dataPoints.show = dataPoints.show === undefined ? true : dataPoints.show;
    dataPoints.size = dataPoints.size || 4;
    dataPoints.fill = dataPoints.fill || 'steelblue';
    if (dataPoints.show) {
      renderGroup.selectAll('g.series-points')
        .data(chart.data).enter()
        .append('g')
        .classed('series-points', true)
        .style('stroke', d => d.color)
          .selectAll('circle').data((d) => {
            console.log('CIRCLE VALUES', d);
            return d.values;
          })
          .enter().append('circle')
            .style('fill', dataPoints.fill)
            .style('stroke-width', '2px')
            .attr('cx', (d) => x(timeFormat(new Date(+d.key))) + xTickDistance)
            .attr('cy', (d) => y(d.value))
            .attr('r', `${dataPoints.size}px`);
    }
  };

  return lineRenderer;
})();
Renderer.register(LineRenderer);

export default LineRenderer;
