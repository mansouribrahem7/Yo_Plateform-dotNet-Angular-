import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appLightBox]',
})
export class LightBoxDirective {
  constructor(public elementRef: ElementRef) {}
  @HostListener('mouseover') onMouseOver() {
    this.elementRef.nativeElement.style.background = 'skyblue';
    this.elementRef.nativeElement.style.cursor = 'pointer';
  }
  @HostListener('mouseout') onMouseup() {
    this.elementRef.nativeElement.style.background = 'none';
  }
}
