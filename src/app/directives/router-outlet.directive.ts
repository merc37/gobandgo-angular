import { Directive, ElementRef, AfterContentChecked, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInformation]'
})
export class RouterOutletDirective implements AfterContentChecked {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngAfterContentChecked() {
    this.renderer.setAttribute(this.elementRef, 'fxFlex', 'true');
  }

}
