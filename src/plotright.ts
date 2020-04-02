import d3 from 'd3';
import { timeRollup } from './utils/time/time_utils';
import { Chart } from './utils/chart';
import { Renderer } from './renderer/renderer';
import { Plotter } from './plotter/plotter';

export class PlotRight {

  private renderer: Renderer;
  private plotter: Plotter;

  constructor() {
    this.renderer = new Renderer();
    this.plotter = new Plotter();
  }

  private processData(conf: any) {
    let data = [...conf.data];
		data.forEach((d: any) => {
			d.category = timeRollup(conf.category(d), conf.granularity).getTime();
		});

		console.log(JSON.stringify(data));

		data = d3.nest()
			.key(function(d: any) { return d.category; })
			.rollup(conf.value)
			.entries(conf.data);

		return data;
  }

  draw(conf: any) {
		if(!d3) {
			console.error('DEPENDENCY: D3 not available!');
			return;
		}

		console.info("PlotRight - DRAW", conf);

    const chart = new Chart(conf);
		chart.chartData = this.processData(conf);
		console.log("DATA:", chart.chartData);

		this.plotter.plot(chart);
		this.renderer.render(chart);

		return chart;
  }

}
