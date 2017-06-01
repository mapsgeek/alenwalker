import { Injectable } from '@angular/core';
declare var mapboxgl;
import { Map } from 'mapbox-gl';

@Injectable()
export class MapService {
  map: Map;
  constructor() {
      (mapboxgl as any).accessToken = 'pk.eyJ1IjoiaWJyYWhpbW1vaGFtbWVkIiwiYSI6IllCakYtY3cifQ.G63TqPIstx6002sFwlNY1w';
  }

}
