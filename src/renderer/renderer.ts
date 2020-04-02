import { Chart } from "../utils/chart";

export abstract class RenderEngine {
  
  constructor(
    public readonly type: string
  ) {
    Renderer.registerEngine(this);
  }

  abstract draw(chart: Chart): void;

}

export class Renderer {

  public static RENDER_ENGINES: { [key: string] : RenderEngine } = {};

  constructor() {}

  public static registerEngine(engine: RenderEngine) {
    Renderer.RENDER_ENGINES[engine.type] = engine;
  }

  public render(chart: Chart) {
    console.log('RENDERER:', chart);

    chart.conf.type = chart.conf.type === undefined
      || Renderer.RENDER_ENGINES[chart.conf.type] === undefined
      ? 'line' : chart.conf.type;
    
    Renderer.RENDER_ENGINES[chart.conf.type].draw(chart);
  }

}
