import { Component, ElementRef, HostBinding, Renderer2, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ThemeService } from 'src/app/services/theme-service.service';
import { VoiceCommandService } from 'src/app/services/voice-recognition.service';
declare var webkitSpeechRecognition: any;
@Component({
  selector: 'app-student-navigation',
  templateUrl: './student-navigation.component.html',
  styleUrls: ['./student-navigation.component.scss'],
})
export class StudentNavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);
  // recognition = new webkitSpeechRecognition()
  need_help:boolean = false
  themecolor:any

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(private voiceCommandService: VoiceCommandService,private themeService: ThemeService,private renderer: Renderer2, private el: ElementRef){}

  toggleControl = new FormControl(false);
  @HostBinding('class') className = '';
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';
      
  ngOnInit(){
    this.themeService.getThemeStatus().subscribe(isDark => {
      this.toggleControl.setValue(isDark, { emitEvent: false });
      
      const classToAdd = isDark ? this.darkClassName : this.lightClassName;
      const classToRemove = isDark ? this.lightClassName : this.darkClassName;
      const elements = this.el.nativeElement.querySelectorAll('*');
          elements.forEach((el:any) => {
          this.renderer.addClass(el,classToAdd);
          this.renderer.removeClass(el, classToRemove);
          
        });
        
      // const appRootElement = this.el.nativeElement.closest('.app-root'); // Adjust the selector as per your root element
      // this.renderer.addClass(appRootElement, classToAdd);
      // this.renderer.removeClass(appRootElement, classToRemove);
    });

    this.toggleControl.valueChanges.subscribe(darkMode => {
      this.themeService.toggleTheme(); // Update the theme status in the service
    });
    this.voiceCommandService.initializeVoiceRecognition();
    this.voiceCommandService.commandEmitted.subscribe(command => {
      // Handle only specific commands for QuizComponent
      // console.log(command)
      // if (command === 'help') {
      //   this.need_help= true
      //   console.log('Im in help')
      //   console.log(this.need_help)
      //   // this.displayHelp()
      // }  else if (command === 'close help') {
      //   this.need_help= false
      // } 
    });
  }

 
}
