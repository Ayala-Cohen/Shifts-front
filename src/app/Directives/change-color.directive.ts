import { Directive, ElementRef, HostListener } from '@angular/core';
import { ConstraintsService } from '../Services/constraints.service';
import { IntegrationService } from '../Services/integration.service';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective {

  constructor(private tdElement: ElementRef, private integration_service: IntegrationService, private cosntraints_service: ConstraintsService) { }
  @HostListener('click', ['$event']) mark() {
    let color = this.tdElement.nativeElement.style.backgroundColor;
    if (this.integration_service.toChange && this.cosntraints_service.toChange)
      if (color == this.integration_service.color)
        this.tdElement.nativeElement.style.backgroundColor = "rgb(255, 255, 255)"
      else
        this.tdElement.nativeElement.style.backgroundColor = this.integration_service.color
  }
}
