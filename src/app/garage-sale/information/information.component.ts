import { Component, OnInit, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  @HostBinding('class.flex-grow-1') flexGrow1 = 'flex-grow-1';
  @HostBinding('class.d-flex') dFlex = 'd-flex';
  @HostBinding('class.flex-column') flexColumn = 'flex-column';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {

  }

}
