import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-printable-map',
  templateUrl: './printable-map.component.html',
  styleUrls: ['./printable-map.component.css']
})
export class PrintableMapComponent implements OnInit {

  @HostBinding('class.flex-grow-1') flexGrow1 = 'flex-grow-1';

  constructor() { }

  ngOnInit() {
  }

}
