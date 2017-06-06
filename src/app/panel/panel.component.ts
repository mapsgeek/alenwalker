import { Component, OnInit,Input,Output,EventEmitter,AfterViewChecked  } from '@angular/core';
import {
  MapService
} from '../map.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit, AfterViewChecked  {

  @Input() f:any[];
   map = this.mapservice.map

  constructor(public mapservice: MapService) { 
  }

  ngOnInit() {

  }
  
  ngAfterViewChecked() {
    
  }

}
