import { Component, OnInit ,Input,AfterViewChecked,OnDestroy} from '@angular/core';
import { AmChartsService } from "@amcharts/amcharts3-angular"
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit , AfterViewChecked, OnDestroy{
  @Input() data:any[];
  private timer: any;
  private chart: any;
  constructor(private AmCharts: AmChartsService) { }


 ngOnInit() {

  }

  ngOnDestroy() {
    clearInterval(this.timer);
    this.AmCharts.destroyChart(this.chart);
  }

  ngAfterViewChecked() {
  }

}
