import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapService } from './map.service';
import { PanelComponent } from './panel/panel.component';
import { ChartsComponent } from './charts/charts.component';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PanelComponent,
    ChartsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AmChartsModule
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
