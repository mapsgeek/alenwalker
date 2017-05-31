import { Component, OnInit } from '@angular/core';
import { MapService } from '../map.service';

declare var mapboxgl;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
 map:any;

constructor(private mapservice: MapService) {

}

  ngOnInit() {
      let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            zoom: 5,
            center: [29.9900-31.2408],
            hash:true
          });
          map.addControl(new mapboxgl.NavigationControl());

          this.mapservice.map = map;
          this.map = this.mapservice.map;

          map.on('style.load', function() {
              map.addLayer({
                          "id": "census-data",
                          "type": "circle",
                          "source": {
                              type: 'vector',
                              url: 'mapbox://ibrahimmohammed.8keg391s'
                          },
                          "source-layer": "census-bjfccr",
                          "layout": {
                              "visibility": "visible"
                          },
                          "paint": {
                              "circle-color": "hsl(247, 54%, 42%)",
                              "circle-stroke-color": "hsl(0, 0%, 100%)",
                              "circle-radius": 4,
                              "circle-stroke-width": 1.5
                          }
                      })
          });
  }


    state = !this.state;
    onChange(event){
        console.log(event)
        if(!event){
            this.map.setLayoutProperty('census-data', 'visibility', 'none');
        }else {
            this.map.setLayoutProperty('census-data', 'visibility', 'visible');
        }
    }

  changeStreets(){
      this.map.setStyle('mapbox://styles/mapbox/streets-v10')
  }
  changeBasic(){
      this.map.setStyle('mapbox://styles/mapbox/basic-v9')
  }

}
