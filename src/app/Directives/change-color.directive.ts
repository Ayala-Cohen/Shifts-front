import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective {

  constructor(private tdElement:ElementRef) { }
  // @HostListener('click', ['$event']) markCan()
  // {
  //   debugger
  //   let color = this.tdElement.nativeElement.style.backgroundColor;
  //   if(color == "rgb(212, 241, 255)")
  //     this.tdElement.nativeElement.style.backgroundColor = "rgb(255, 255, 255)"
  //   else
  //     this.tdElement.nativeElement.style.backgroundColor = "rgb(212, 241, 255)"
  // }
  // @HostListener('click', ['$event']) markCanNot()
  // {
  //   debugger
  //   let color = this.tdElement.nativeElement.style.backgroundColor;
  //   if(color == "rgb(152, 200, 210)")
  //     this.tdElement.nativeElement.style.backgroundColor = "rgb(255, 255, 255)"
  //   else
  //     this.tdElement.nativeElement.style.backgroundColor = "rgb(152, 200, 210)"
  // }
  // @HostListener('click', ['$event']) markPrefer()
  // {
  //   debugger
  //   let color = this.tdElement.nativeElement.style.backgroundColor;
  //   if(color == "rgb(120, 157, 163)")
  //     this.tdElement.nativeElement.style.backgroundColor = "rgb(255, 255, 255)"
  //   else
  //     this.tdElement.nativeElement.style.backgroundColor = "rgb(120, 157, 163)"
  // }
  @HostListener('click', ['$event']) markPreferNot()
  {
    debugger
    let color = this.tdElement.nativeElement.style.backgroundColor;
    if(color == "rgb(120, 157, 163)")
      this.tdElement.nativeElement.style.backgroundColor = "rgb(255, 255, 255)"
    else
      this.tdElement.nativeElement.style.backgroundColor = "rgb(120, 157, 163)"
  }
}
