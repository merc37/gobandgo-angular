import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @HostBinding('class.flex-grow-1') flexGrow1 = 'flex-grow-1';

  constructor() { }

  ngOnInit() {
  }

}
