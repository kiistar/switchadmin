import * as echarts from 'echarts/core'

import {
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  PictorialBarChart,
  GaugeChart
} from 'echarts/charts'

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  LegendPlainComponent,
  MarkLineComponent
} from 'echarts/components'

import { SVGRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  LegendPlainComponent,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  SVGRenderer,
  PictorialBarChart,
  GaugeChart,
  MarkLineComponent
])

export default echarts
