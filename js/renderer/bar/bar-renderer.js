const Renderer = require('../renderer.js').default;
const d3 = require('d3');

const BarRenderer = (function() {
  const barRenderer = {
    type: 'BAR'
  };

  barRenderer.draw = function(chart) {
    const chartGroup = chart.DOM_ELEMENTS.chartGroup;
    const x = chart.chartProps.x;
    const y = chart.chartProps.y;
    const numSeries = chart.data.length;
    const bandWidth = x.bandwidth() / numSeries;
    const xTickDistance = bandWidth / 2;
    const timeFormat = d3.timeFormat('%d-%m-%Y');
    
    const renderGroup = chartGroup.append('g')
      .classed('render-group', true);

    chart.data.forEach((s, seriesIdx) => {
      renderGroup.append('g')
        .classed('bar-group', true)
        .selectAll('rect').data(s.values)
        .enter().append('rect')
          .style('stroke', 'none')
          .style('fill', s.color)
          .attr('x', (d) => {
            return x(timeFormat(new Date(+d.key))) + (bandWidth * seriesIdx);
          })
          .attr('y', (d) => y(d.value))
          .attr('width', bandWidth - 4)
          .attr('height', (d) => chart.conf.chartHeight - y(d.value))
          .on('mouseover', (d) => {
            d3.select(d3.event.target)
              .style('stroke', 'black')
              .style('stroke-width', '2px');
          })
          .on('mouseout', (d) => {
            d3.select(d3.event.target)
              .style('stroke', 'none');
          });
    });
  }

  return barRenderer;
})();
Renderer.register(BarRenderer);

export default BarRenderer;
