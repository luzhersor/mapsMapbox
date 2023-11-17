import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat } from 'mapbox-gl';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent {

  @Input()  LngLat ?: [number, number];
  @ViewChild('map') divMap?: ElementRef;


  ngAfterViewInit(){

    if(!this.LngLat) throw "LngLat can't be null"
    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.LngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive: false
      });

      new Marker().setLngLat(this.LngLat).addTo(map)
  }


}
