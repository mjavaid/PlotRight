import Renderer from '../renderer.js';
const d3 = require('d3');

const AreaRenderer = (function() {
  const areaRenderer = {
    type: 'AREA'
  };

  areaRenderer.draw = function(chart) {
    const chartGroup = chart.DOM_ELEMENTS.chartGroup;
    const x = chart.chartProps.x;
    const y = chart.chartProps.y;
    const xTickDistance = x.bandwidth() / 2;
    const timeFormat = d3.timeFormat('%d-%m-%Y');

    const opacityStep = 1 / chart.data.length;

    const getOpacity = (i) => {
      return (chart.data.length - i) * opacityStep
    };

    const areaFn = d3.area()
      .x(d => x(timeFormat(new Date(+d.key))) + xTickDistance)
      .y0(chart.conf.chartHeight)
      .y1(d => y(d.value));
      
    const renderGroup = chartGroup.append('g')
      .classed('render-group', true);

    renderGroup.selectAll('g.series-area')
      .data(chart.data).enter()
        .append('g')
        .classed('series-area', true)
          .append('path')
          .classed('area-chart', true)
          .style('fill', d => d.color)
          .style('opacity', (d, i) => getOpacity(i))
          .attr('d', d => areaFn(d.values))
          .on('mouseover', (d) => {
            d3.select(d3.event.target)
              .style('opacity', 1)
              .style('stroke', 'black');
            d3.select(d3.event.target.parentNode)
              .raise();
          })
          .on('mouseout', (d, i) => {
            d3.select(d3.event.target)
              .style('opacity', getOpacity(i))
              .style('stroke', 'none');
          });
  }

  return areaRenderer;
})();
Renderer.register(AreaRenderer);

export default AreaRenderer;
