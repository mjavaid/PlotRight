import { RenderEngine } from "../renderer";
import { Chart } from "../../utils/chart";
import d3 from "d3";

export class LineRenderer extends RenderEngine {

  constructor() {
    super('line');
  }

  draw(chart: Chart) {
    const chartGroup = chart.DOM_ELEMENTS.chartGroup;
    const x = chart.axis.x;
    const y = chart.axis.y;
    const xTickDistance = x.bandwidth() / 2;
    const timeFormat = d3.timeFormat('%d-%m-%Y');

    const lineFn = d3.line()
      .x((d: any) => x(timeFormat(new Date(+d.key))) + xTickDistance)
      .y((d: any) => y(d.value));
      
    const renderGroup = chartGroup.append('g')
      .classed('render-group', true);

    renderGroup.append('g')
      .classed('line-chart', true)
      .append('path')
        .data([chart.chartData])
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
        .selectAll('circle').data(chart.chartData)
        .enter().append('circle')
          .style('fill', dataPoints.fill)
          .style('stroke', 'steelblue')
          .style('stroke-width', '2px')
          .attr('cx', (d: any) => x(timeFormat(new Date(+d.key))) + xTickDistance)
          .attr('cy', (d: any) => y(d.value))
          .attr('r', `${dataPoints.size}px`);
    }

  }

}