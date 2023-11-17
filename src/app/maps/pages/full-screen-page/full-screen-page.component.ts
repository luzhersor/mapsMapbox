import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl'; // ;"
import { MapServiceComponent } from '../../services/map.service/map.service.component';


//import * as mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
//(mapboxgl as any).accessToken = 'pk.eyJ1IjoibHV6aGVyc29yIiwiYSI6ImNsbno1YTVjcjBjNGwyaXFyc2p3aDUxM2wifQ.b2Jr8KfxgSMUYIN2dquE8g';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  constructor(private mapService: MapServiceComponent) { }
  public zoom: number = 7.5;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-98.15975753659461, 19.186802016509247) //[lng, lat]

  ngAfterViewInit(): void {
    console.log(this.divMap);
    //Si esto no existe
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    /* this.map = new Map({
     container: this.divMap?.nativeElement, // container ID
     style: 'mapbox://styles/mapbox/streets-v12', // style URL
     center: this.currentLngLat, // starting position [lng, lat]
     zoom: this.zoom, // starting zoom
     }); */

    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: `mapbox://styles/mapbox/${this.mapService.selectedMapStyle}-v11`,
      center: this.currentLngLat,
      zoom: this.zoom,
    });

    // Registra el mapa en el servicio
    this.mapService.setMap(this.map);



  }


}
