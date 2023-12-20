import { Component, ElementRef, HostBinding, Renderer2, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'exam-management-project';

  private breakpointObserver = inject(BreakpointObserver);

isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private renderer: Renderer2, private el: ElementRef){}

toggleControl = new FormControl(false);
@HostBinding('class') className = '';
darkClassName = 'theme-dark';
lightClassName = 'theme-light';
    
ngOnInit(){
  this.toggleControl.valueChanges.subscribe((darkMode) => {
    this.className = darkMode ? this.darkClassName : this.lightClassName
    if(darkMode){
      const elements = this.el.nativeElement.querySelectorAll('*');
      elements.forEach((el:any) => {
      this.renderer.addClass(el, this.darkClassName);
    });
    }
    else{
      const elements = this.el.nativeElement.querySelectorAll('*');
      elements.forEach((el:any) => {
      this.renderer.removeClass(el, this.darkClassName);
    });
    }

  })
}
}



