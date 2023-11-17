import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapServiceComponent } from '../../services/map.service/map.service.component';


interface MenuItem{
  name: string,
  route: string;
}

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

  public selectedMapStyle: string = 'streets'; // valor predeterminado

  constructor(private mapService: MapServiceComponent) {}


  //Contiene muchos objetos de tipo MenuItem
  public menuItems: MenuItem[] = [
    {route: '/maps/fullscreen', name: 'Full Screen'},
    {route: '/maps/zoom-range', name: 'Zoom Range'},
    {route: '/maps/markers', name: 'Markers'},
    {route: '/maps/properties', name: 'House'},

  ]


  ngOnInit() {
    // Lógica de inicialización si es necesaria
  }

  changeMapStyle() {

    this.mapService.selectedMapStyle = this.selectedMapStyle;

    this.mapService.changeMapStyle();

    /* const map = new mapboxgl.Map({
      container: 'map',
      style: `mapbox://styles/mapbox/${this.selectedMapStyle}-v11`,
      center: [-74.5, 40],
      zoom: 9
    }); */
  }

  handleMapStyleChange(style: string, event: Event) {
    event.preventDefault();
    this.changeMapStyle();
  }

}
