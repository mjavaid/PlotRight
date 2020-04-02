import { Chart } from "../utils/chart";
import d3 from "d3";

export class Plotter {

  constructor() {}

  private static createGridlines(chart: Chart, isX: boolean = false) {
		const conf = chart.conf;
		const axisX = chart.axis.axisX;
		const x = chart.axis.x;
		const axisY = chart.axis.axisY;
		const y = chart.axis.y;
		const xAxisTicks = x.domain();
		const yAxisTicks = y.ticks(axisY.ticks()[0]);

		const xTickDistance = x.bandwidth() / 2;

		const lineFn = d3.line()
			.x(d => isX ? (x(d[0]) + xTickDistance) : d[0])
			.y(d => y(d[1]));

		const gridLinesGroup = chart.DOM_ELEMENTS.chartGroup
			.append('g')
				.classed('gridlines', true)
				.classed(isX ? 'x' : 'y', true);

		if (conf.axis[isX ? 'x' : 'y'].gridLines) {
			const axisLimits: any = isX ? d3.extent(yAxisTicks) : [0, chart.dim.chartWidth];
			const axisTicks = isX ? xAxisTicks : yAxisTicks;
      axisTicks
        .filter((d: any, i: number) => isX || i !== 0)
        .forEach((d: any) => {
          const data = axisLimits.map((lim: any) => {
            if (isX) { return [d, lim]; }
            else { return [lim, d]; }
          });

          gridLinesGroup.append('path')
            .data([data])
            .classed('gridline', true)
            .classed(isX ? 'x' : 'y', true)
            .style('fill', 'none')
            .style('stroke', 'lightgrey')
            .style('stroke-width', '1px')
            .attr('d', lineFn);
			});
		}

		chart.DOM_ELEMENTS[isX ? 'xAxisGridLines' : 'yAxisGridLines'] = gridLinesGroup;
  }

  private static createSVG(chart: Chart) {
		const conf = chart.conf;
		const container = d3.select(conf.selector)
			.classed('plot-right-chart', true);

		const svg = container.append('svg')
			.attr('width', chart.dim.containerWidth)
			.attr('height', chart.dim.containerHeight);
		
		if (conf.title) {
			svg.append('g')
				.attr('width', chart.dim.containerWidth)
				.classed('chart-title-group', true)
				.append('text')
					.text(conf.title)
					.attr('text-anchor', 'middle')
					.attr('alignment-baseline', 'middle')
					.attr('x', Math.floor(chart.dim.containerWidth / 2))
					.attr('y', Math.floor(conf.margin.top / 2))
					.style('font-weight', 'bold')
					.style('font-size', '2em')
					.style('font-family', 'Calibri')
					.classed('chart-title', true);
		}
		
		const chartGroup = svg.append('g')
			.attr('transform', `translate(${conf.margin.left}, ${conf.margin.top})`);

		chart.DOM_ELEMENTS.svg = svg;
    chart.DOM_ELEMENTS.chartGroup = chartGroup;
  }

  private static createAxis(chart: Chart) {
		const timeFormat = d3.timeFormat('%d-%m-%Y');
		const conf = chart.conf;
		const x = d3.scaleBand()
			.rangeRound([0, chart.dim.chartWidth])
			.padding(0.1)
      .domain(
        chart.chartData
        .sort((x: any, y: any) => +x.key - +y.key)
        .map((d: any) => timeFormat(new Date(+d.key)))
      );
		const y = d3.scaleLinear()
			.range([chart.dim.chartHeight, 0])
			.domain([ 0, +(`${d3.max(chart.chartData.map((d: any) => d.value))}`) ])
			.nice();
		chart.axis.x = x;
		chart.axis.y = y;

		const axisX = d3.axisBottom(x);
		const axisY = d3.axisLeft(y);
		chart.axis.axisX = axisX;
		chart.axis.axisY = axisY;

		chart.DOM_ELEMENTS.chartGroup.append('g')
			.classed('axis', true)
			.classed('y', true)
			.classed('left', true)
			.call(chart.axis.axisY);

		chart.DOM_ELEMENTS.chartGroup.append('g')
			.attr('transform', `translate(0,${chart.dim.chartHeight})`)
			.classed('axis', true)
			.classed('x', true)
			.classed('bottom', true)
			.call(chart.axis.axisX);
	}

  public plot(chart: Chart) {
    console.log('PLOTTER:', chart);

    Plotter.createSVG(chart);
    Plotter.createAxis(chart);
    Plotter.createGridlines(chart, true);
    Plotter.createGridlines(chart);
  }

}
