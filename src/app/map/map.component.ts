import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  EventEmitter,
  Output
  } from '@angular/core';
import {
  MapService
} from '../map.service';
<<<<<<< HEAD

=======
import { AmChartsService } from "@amcharts/amcharts3-angular"
>>>>>>> fe95e97035a8d33500d9bf92dacecc9cab697455
declare var mapboxgl;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit{
  map: any;
  clearState: boolean;
  private timer: any;
  private chart: any;
  chartData: any[];
  chartstate: boolean;
  constructor(public mapservice: MapService , private AmCharts: AmChartsService) {

  }
<<<<<<< HEAD
  

  ngOnInit() {

   // intialize map

=======

  features: any[];

  ngOnInit() {
      
>>>>>>> fe95e97035a8d33500d9bf92dacecc9cab697455
    let map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [31.2408, 29.9900],
      zoom: 13,
      hash: true
    });

    // Disable default box zooming.
   map.boxZoom.disable();

    map.addControl(new mapboxgl.NavigationControl());

    this.mapservice.map = map;
    this.map = this.mapservice.map;

    //load data-source and add layers
    map.on('style.load', () => {
        map.addSource('census', {
        'type': 'vector',
        'url': 'mapbox://ibrahimmohammed.8keg391s'
      });

      map.addLayer({
        "id": "census-data",
        "type": "circle",
        "source": "census",
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

        map.addLayer({
        "id": "census-data-highlighted",
        "type": "circle",
        "source": "census",
        "source-layer": "census-bjfccr",
        "layout": {
          "visibility": "visible"
        },
        "paint": {
          "circle-color": "red",
          "circle-stroke-color": "hsl(0, 0%, 100%)",
          "circle-radius": 8,
          "circle-stroke-width": 1.5,
          "circle-opacity":0.3
        },
        "filter": ["in", "GlobalID", ""]

      })
    })


// Disable default box zooming.
map.boxZoom.disable();

// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false
});


//drawing the selection box
map.on('load', () => {
    var canvas = map.getCanvasContainer();
    
    // Variable to hold the starting xy coordinates
    // when `mousedown` occured.
    var start;

    // Variable to hold the current xy coordinates
    // when `mousemove` or `mouseup` occurs.
    var current;

    // Variable for the draw box element.
    var box;

    // Set `true` to dispatch the event before other functions
    // call it. This is necessary for disabling the default map
    // dragging behaviour.
    canvas.addEventListener('mousedown', mouseDown, true);

    // Return the xy coordinates of the mouse position
    function mousePos(e) {
        var rect = canvas.getBoundingClientRect();
        return new mapboxgl.Point(
            e.clientX - rect.left - canvas.clientLeft,
            e.clientY - rect.top - canvas.clientTop
        );
    }

    function mouseDown(e) {

        // Continue the rest of the function if the shiftkey is pressed.
        if (!(e.shiftKey && e.button === 0)) return;
        map.getCanvas().style.cursor = 'default';
        // Disable default drag zooming when the shift key is held down.
        map.dragPan.disable();

        // Call functions for the following events
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('keydown', onclick);

        // Capture the first xy coordinates
        start = mousePos(e);
    }

    var onMouseMove = (e) => {
        // Capture the ongoing xy coordinates
        current = mousePos(e);
        // Append the box element if it doesnt exist
        if (!box) {
            box = document.createElement('div');
            box.classList.add('boxdraw');
            canvas.appendChild(box);
        }
        
        map.getCanvas().style.cursor = 'default';

        var minX = Math.min(start.x, current.x),
            maxX = Math.max(start.x, current.x),
            minY = Math.min(start.y, current.y),
            maxY = Math.max(start.y, current.y);

        // Adjust width and xy position of the box element ongoing
        var pos = 'translate(' + minX + 'px,' + minY + 'px)';
        box.style.transform = pos;
        box.style.WebkitTransform = pos;
        box.style.width = maxX - minX + 'px';
        box.style.height = maxY - minY + 'px';
        box.style.background = "#4286f4";
        box.style.border = "2px",
        box.style.opacity = "0.3"
    }

    function onMouseUp(e) {
        // Capture xy coordinates
        finish([start, mousePos(e)]);
    }


    let finish = (bbox) => {
        // Remove these events now that finish has been called.
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('keydown', onclick);
        document.removeEventListener('mouseup', onMouseUp);

        this.map.setLayoutProperty('census-data-highlighted', 'visibility', 'visible');

        if (box) {
            box.parentNode.removeChild(box);
            box = null;
        }

        // If bbox exists. use this value as the argument for `queryRenderedFeatures`
        if (bbox) {
            this.features = map.queryRenderedFeatures(bbox, { layers: ['census-data'] });
            this.clearState = true;
            // Run through the selected features and set a filter
            // to match features with unique FIPS codes to activate
            // the `counties-highlighted` layer.
            var filter = this.features.reduce(function(memo, feature) {
                memo.push(feature.properties.GlobalID);
                return memo;
            }, ['in', 'GlobalID']);

            map.setFilter("census-data-highlighted", filter);
        }
        map.dragPan.enable();
        
        
        console.log(this.features)
       
        this.chartData = [];
        for( var i = 0; i < this.features.length; i++ ) {
            this.chartData.push( {
              "x": this.features[i].properties.L_M_SC,
              "y": this.features[i].properties.Outlet_Typ
            } )
          }

        this.chart = this.AmCharts.makeChart("chartdiv", {
          "type": "serial",
            "theme": "light",
            "dataProvider":this.chartData,
            "valueAxes": [ {
              "gridColor": "#FFFFFF",
              "gridAlpha": 0.2,
              "dashLength": 0
            } ],
            "gridAboveGraphs": true,
            "startDuration": 1,
            "graphs": [ {
              "balloonText": "[[category]]: <b>[[value]]</b>",
              "fillAlphas": 0.8,
              "lineAlpha": 0.2,
              "type": "column",
              "valueField": "x"
            } ],
            "chartCursor": {
              "categoryBalloonEnabled": false,
              "cursorAlpha": 0,
              "zoomable": false
            },
            "categoryField": "y",

            "export": {
              "enabled": true
            }

              });
      }
      
      this.chartstate = false;

    map.on('mousemove', (e) => {
        let features = map.queryRenderedFeatures(e.point, { layers: ['census-data-highlighted'] });
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';

        if (!features.length) {
            popup.remove();
            return;
        }

        var feature = features[0];

        popup.setLngLat(e.lngLat)
            .setText(feature.properties.Outlet_Nam)
            .addTo(map);
    });
});


    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mousemove', 'census-data', function () {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'census-data', function () {
      map.getCanvas().style.cursor = '';
      
    });

    map.on('click', 'census-data', function (e) {
      var features = e.features[0].properties.Outlet_Nam;
      new mapboxgl.Popup()
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML(e.features[0].properties.Outlet_Nam)
        .addTo(map);
    });
  }


    onshowCharts() {
    if(this.chartData.length > 0) {
      this.chartstate = true
    }
    }

  state = !this.state;
  onChange(event) {
    console.log(event)
    if (!event) {
      this.map.setLayoutProperty('census-data', 'visibility', 'none');
      this.map.setLayoutProperty('census-data-highlighted', 'visibility', 'none');
    } else {
      this.map.setLayoutProperty('census-data', 'visibility', 'visible');
    }
  }

  clearSelection() {
     this.map.setLayoutProperty('census-data-highlighted', 'visibility', 'none');
     this.clearState = false;
     this.features = [];
<<<<<<< HEAD
=======
     let chartData = [];
        
        for( var i = 0; i < this.features.length; i++ ) {
            chartData.push( {
              "x": this.features[i].properties.L_M_SC,
              "y": this.features[i].properties.Outlet_Typ
            } )
          }

          this.chart = this.AmCharts.makeChart("chartdiv", {
          "type": "serial",
            "theme": "light",
            "dataProvider":chartData,
            "valueAxes": [ {
              "gridColor": "#FFFFFF",
              "gridAlpha": 0.2,
              "dashLength": 0
            } ],
            "gridAboveGraphs": true,
            "startDuration": 1,
            "graphs": [ {
              "balloonText": "[[category]]: <b>[[value]]</b>",
              "fillAlphas": 0.8,
              "lineAlpha": 0.2,
              "type": "column",
              "valueField": "x"
            } ],
            "chartCursor": {
              "categoryBalloonEnabled": false,
              "cursorAlpha": 0,
              "zoomable": false
            },
            "categoryField": "y",

            "export": {
              "enabled": true
            }

              });
>>>>>>> fe95e97035a8d33500d9bf92dacecc9cab697455
  }


  changeStreets() {
    this.map.setStyle('mapbox://styles/mapbox/streets-v10')
  }
  changeBasic() {
    this.map.setStyle('mapbox://styles/mapbox/basic-v9')
  }
  
}
