import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl'; // ;"

//import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
//(mapboxgl as any).accessToken = 'pk.eyJ1IjoibHV6aGVyc29yIiwiYSI6ImNsbno1YTVjcjBjNGwyaXFyc2p3aDUxM2wifQ.b2Jr8KfxgSMUYIN2dquE8g';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  ngAfterViewInit(): void {

    console.log(this.divMap);

     //Si esto no existe
     if( !this.divMap) throw 'El elemento HTML no fue encontrado';
    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-100, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
      });
    //throw new Error('Method not implemented.');
  }


}
