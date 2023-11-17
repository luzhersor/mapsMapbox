import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {LngLat, Map} from 'mapbox-gl'
import { MapServiceComponent } from '../../services/map.service/map.service.component';



@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})

export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    this.map?.remove();
  }

  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map ?: Map;
  public currentLngLat: LngLat = new LngLat(-43.5, -22.5) //[lng, lat]

  public selectedMapStyle: string = 'streets'; // valor predeterminado


 /*  ngAfterViewInit(): void {
    console.log(this.divMap);
     //Si esto no existe
     if( !this.divMap) throw 'El elemento HTML no fue encontrado';

     this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      //style: 'mapbox://styles/mapbox/streets-v12', // style URL
      style: `mapbox://styles/mapbox/${this.selectedMapStyle}-v11`,
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      });

      this.mapListeners();
    //throw new Error('Method not implemented.');
  } */

  constructor(private mapService: MapServiceComponent) {}

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement,
      style: `mapbox://styles/mapbox/${this.mapService.selectedMapStyle}-v11`,
      center: this.currentLngLat,
      zoom: this.mapService.zoom,
    });

    this.mapListeners();

    // Registra el mapa en el servicio
    this.mapService.setMap(this.map);

  }

  updateMapState() {
    if (this.map) {
      this.mapService.zoom = this.map.getZoom();
      this.mapService.currentLngLat = this.map.getCenter();
      this.mapService.changeMapStyle();
    }
  }


  mapListeners(){
    if(!this.map) throw "Mapa no inicializad aqui";

    this.map.on('zoom', (ev)=> {
      // ! Significa que siempre se va a tener un valor allí
      this.zoom = this.map!.getZoom();
    });


    this.map.on('zoomend', (ev)=> {
      if(this.map!.getZoom()<18) return;
      this.map!.zoomTo(18);
      // ! Significa que siempre se va a tener un valor allí
    });

    this.map.on("move", () =>{
      this.currentLngLat = this.map!.getCenter();
      const {lng, lat} = this.currentLngLat;
    })

  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }

  zoomChanged(value:string){
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom)
  }


}
