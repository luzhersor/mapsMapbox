import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'app-map.service',
  templateUrl: './map.service.component.html',
  styleUrls: ['./map.service.component.css']
})

@Injectable({
  providedIn: 'root',
})
export class MapServiceComponent {
  public map?: Map;
  public zoom: number = 10;
  public currentLngLat: LngLat = new LngLat(-122.43, 37.75);
  public selectedMapStyle: string = 'streets';

  setMap(map: Map) {
    this.map = map;
  }

  changeMapStyle() {
    if (this.map) {
      this.map.setStyle(`mapbox://styles/mapbox/${this.selectedMapStyle}-v11`);

    }
  }
}

