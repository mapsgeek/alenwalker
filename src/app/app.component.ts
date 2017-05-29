import { Component, OnInit} from '@angular/core';

declare var mapboxgl

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Welcome to census dashboard built with mapbox-gl and vector-tiles!';
  desc  = "those two technologies are considered to be the future of web mapping"
  ngOnInit() {
    
  }
}
