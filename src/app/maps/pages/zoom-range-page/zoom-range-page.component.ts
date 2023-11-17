import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {LngLat, Map} from 'mapbox-gl'



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
  public currentLngLat: LngLat = new LngLat(-122.43, 37.75) //[lng, lat]

  public selectedMapStyle: string = 'streets'; // valor predeterminado


  ngAfterViewInit(): void {
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
