import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  @HostBinding('class.flex-grow-1') flexGrow1 = 'flex-grow-1';

  constructor() { }

  ngOnInit() {
  }

}
