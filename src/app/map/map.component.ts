import { Component, OnInit, Input } from '@angular/core';
import { MapService } from '../map.service';

declare var mapboxgl;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
 map:any;
 features:any[];

constructor(private mapservice: MapService) {

}

  ngOnInit() {
      let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v10',
            zoom: 5,
            center: [29.9900,31.2408],
            hash:true
          });
          map.addControl(new mapboxgl.NavigationControl());

          this.mapservice.map = map;
          this.map = this.mapservice.map;

          map.on('style.load', function() {
               map.addSource('census', {
                    'type': 'vector',
                    'url': 'mapbox://ibrahimmohammed.8keg391s'
                });
              map.addLayer({
                          "id": "census-data",
                          "type": "circle",
                          "source":"census",
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

          map.on('click', 'census-data', function (e) {
              var features = e.features[0].properties.Outlet_Nam;
              console.log()
              new mapboxgl.Popup()
           .setLngLat(e.features[0].geometry.coordinates)
           .setHTML(e.features[0].properties.Outlet_Nam)
           .addTo(map);
           });

           map.on('load', () => {
               this.features = this.map.queryRenderedFeatures({ layers: ['census-data'] });
               console.log(this.features)
           })

           // Change the cursor to a pointer when the mouse is over the places layer.
           map.on('mouseenter', 'census-data', function () {
               map.getCanvas().style.cursor = 'pointer';
           });

           // Change it back to a pointer when it leaves.
           map.on('mouseleave', 'census-data', function () {
               map.getCanvas().style.cursor = '';
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
