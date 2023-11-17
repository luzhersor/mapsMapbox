import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';
import { MapServiceComponent } from '../../services/map.service/map.service.component';

interface MarkerAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[]
}




@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {

  ngOnDestroy(): void {
    this.map?.remove();
  }

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-122.43, 37.75) //[lng, lat]
  constructor(private mapService: MapServiceComponent) { }


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
      zoom: this.mapService.zoom,
    });

    // Registra el mapa en el servicio
    this.mapService.setMap(this.map);

    this.readFromLocalStorage();

  }

  createMarket() {
    if (!this.map) return;
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const LngLat = this.map.getCenter();
    this.addMarker(LngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true
    }).setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({
      color: color,
      marker: marker
    })

    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
      console.log(marker.getLngLat());
    })
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1)
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()
    })
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers))
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color);

    })

    console.log(plainMarkers);
  }

}


