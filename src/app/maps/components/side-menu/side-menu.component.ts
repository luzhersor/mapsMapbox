import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


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
    //mapboxgl.accessToken = 'pk.eyJ1IjoibHV6aGVyc29yIiwiYSI6ImNsbno1YTVjcjBjNGwyaXFyc2p3aDUxM2wifQ.b2Jr8KfxgSMUYIN2dquE8g';

    //mapboxgl.accessToken = 'pk.eyJ1IjoibHV6aGVyc29yIiwiYSI6ImNsbno1YTVjcjBjNGwyaXFyc2p3aDUxM2wifQ.b2Jr8KfxgSMUYIN2dquE8g';

    const map = new mapboxgl.Map({
      container: 'map',
      style: `mapbox://styles/mapbox/${this.selectedMapStyle}-v11`,
      center: [-74.5, 40],
      zoom: 9
    });
  }

}
