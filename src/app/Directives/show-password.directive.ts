import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appShowPassword]'
})
export class ShowPasswordDirective {

  constructor(private passswordElement: ElementRef) {
  }
  @HostListener('mouseover', ['$event']) showPassword() //input הצגת הסיסמה בעת שהעכבר עובר על  ה
  {   
      this.passswordElement.nativeElement.setAttribute("type", "text")
  }
  @HostListener('mouseout',['$event']) hidePassword()//input הסתרת הסיסמה בעת שהעכבר יוצא מה
  {
    this.passswordElement.nativeElement.setAttribute("type", "password")
  }


}
