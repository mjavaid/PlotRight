import { ChartConfig } from "./chart.config";
import d3 from "d3";

export interface ChartDimensions {
  containerWidth: number;
  containerHeight: number;
  chartWidth: number;
  chartHeight: number;
}

export class Chart {

  private static defaultConfig: ChartConfig = {
    selector: '',
    margin: {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50
    },
    type: 'line',
    data: [],
    axis: {
      x: {
        gridLines: true
      },
      y: {
        gridLines: true
      }
    }
  };

  conf: ChartConfig;
  chartData: any = [];
  DOM_ELEMENTS: any = {};

  dim: ChartDimensions;

  axis: any;

  constructor(conf: ChartConfig) {
    Object.assign(conf, Chart.defaultConfig);
    this.conf = conf;

    this.DOM_ELEMENTS.container = d3.select(conf.selector);
    this.dim = this.computeDims();
  }

  private computeDims(): ChartDimensions {
    const containerWidth = this.conf.width || this.DOM_ELEMENTS.container.node().clientWidth;
    const containerHeight = this.conf.height || 400;
    const chartWidth = containerWidth - this.conf.margin.left - this.conf.margin.right;
		const chartHeight = containerHeight - this.conf.margin.top - this.conf.margin.bottom;

    return {
      containerWidth,
      containerHeight,
      chartWidth,
      chartHeight
    };
  }

  update(conf: ChartConfig) {}

}
