import { RenderEngine } from "../renderer";
import { Chart } from "../../utils/chart";
import d3 from "d3";

export class BarRenderer extends RenderEngine {

  constructor() {
    super('bar');
  }

  draw(chart: Chart): void {
    const chartGroup = chart.DOM_ELEMENTS.chartGroup;
    const x = chart.axis.x;
    const y = chart.axis.y;
    const bandWidth = x.bandwidth();
    const xTickDistance = bandWidth / 2;
    const timeFormat = d3.timeFormat('%d-%m-%Y');
    
    const renderGroup = chartGroup.append('g')
      .classed('render-group', true);

    renderGroup.append('g')
      .classed('bar-group', true)
      .selectAll('rect').data(chart.chartData)
      .enter().append('rect')
        .style('fill', 'steelblue')
        .style('stroke', 'none')
        .attr('x', (d: any) => x(timeFormat(new Date(+d.key))))
        .attr('y', (d: any) => y(d.value))
        .attr('width', bandWidth - 4)
        .attr('height', (d: any) => chart.dim.chartHeight - y(d.value));
  }

}
