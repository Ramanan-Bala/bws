import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[autoFocus]',
})
export class AutoFocusDirective implements AfterContentInit {
  @Input() public autoFocus: boolean;
  public constructor(private el: ElementRef) {}
  ngAfterContentInit(): void {
    setTimeout((_) => {
      this.el.nativeElement.focus();
    }, 500);
  }
}
