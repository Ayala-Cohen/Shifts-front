import { Directive, ElementRef, HostListener } from '@angular/core';
import { IntegrationService } from '../Services/integration.service';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective {

  constructor(private tdElement:ElementRef, private integration_service:IntegrationService) { }
  @HostListener('click', ['$event']) mark()
  {
    let color = this.tdElement.nativeElement.style.backgroundColor;
    if(color == this.integration_service.color)
      this.tdElement.nativeElement.style.backgroundColor = "rgb(255, 255, 255)"
    else
      this.tdElement.nativeElement.style.backgroundColor = this.integration_service.color
  }
}
