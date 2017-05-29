import { Component, OnInit } from '@angular/core';
declare var mapboxgl;

import { MapService } from '../map.service';
declare var MapboxGeocoder

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
 map:any;
  constructor(private mapservice: MapService) { }

  ngOnInit() {
      let map = new mapboxgl.Map({
            container: 'map',
            style: './assets/style/style.json',
            zoom: 5,
            center: [29.9900-31.2408],
            hash:true
          });

          this.mapservice.map = map;
          this.map = this.mapservice.map;

          map.addControl(new MapboxGeocoder({
                accessToken: mapboxgl.accessToken
         }));
  }

  addlayers(){
      let layer = this.map.getLayer('census-bjfccr')
      this.map.addLayer(layer.id);
  }

  removelayers(){
     this.map.removeLayer('census-bjfccr');
  }

  query(){
      var features = this.map.querySourceFeatures('contours',"",["all"]);
      console.log(features);
  }
}
