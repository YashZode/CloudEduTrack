import { ChangeDetectorRef, Component, ElementRef, HostBinding, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { VoiceCommandService } from '../../services/voice-recognition.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentNavigationComponent } from '../student-navigation/student-navigation.component';
// import { BreakpointObserver } from '@angular/cdk/layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ThemeService } from 'src/app/services/theme-service.service';
import { ToastrService } from 'ngx-toastr';
import { SpeechSynthesisService } from 'src/app/services/speech-synthesis/speech-synthesis.service';
import Chart from 'chart.js/auto';
import { MatDialog } from '@angular/material/dialog';
import { PerformanceComponent } from 'src/app/modal/performance/performance.component';
import { QuizSubmittedComponent } from 'src/app/modal/quiz-submitted/quiz-submitted.component';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service/local-storage-service.service';
import { BackendServiceService } from 'src/app/services/backend-service/backend-service.service';
// declare var webkitSpeechRecognition: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @ViewChild(StudentNavigationComponent) studentNavigationComponent!: StudentNavigationComponent;

  chart: any = []
  // userId: any
  selected_question=0;
  selected_answers:any=[];
  empty:any
  math_attempted: any
  quiz_api_result:any
  math_result:any
  english_attempted: any
  english_result: any
  // questions: any = [['Question 1', 'Option 1', 'Option 2', 'Option 3', 'Option 4'],['Question 2', 'Option 5', 'Option 6', 'Option 7', 'Option 8'],['Question 3', 'Option 9', 'Option 10', 'Option 11', 'Option 12']]
  constructor(private cd: ChangeDetectorRef,private dialog: MatDialog, private themeService: ThemeService,private formBuilder: FormBuilder, 
    private renderer: Renderer2, private el: ElementRef, private router: Router, 
    private toastr: ToastrService,
    private voiceCommandService: VoiceCommandService,
    private speechSynthesisService: SpeechSynthesisService,
    private localstorage: LocalStorageServiceService,
    private backend: BackendServiceService
    ) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.speechSynthesisService.cancel();
        }
      });
    
  }
  toggleControll = new FormControl(false);
  @HostBinding('class') className = '';
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';
  ngOnInit(): void {
    // this.intitializeChart()
    // this.userId = this.localstorage.getUserId()
    this.quizResult()
    
    this.voiceCommandService.initializeVoiceRecognition();
    
    this.voiceCommandService.commandEmitted.subscribe(command => {
      // Handle only specific commands for QuizComponent
      console.log(command)
      if (command === 'increase font size' ) {
        this.increaseFontSize()
        this.toastr.success('Voice Command', 'Font Size Increased');
      }else if(command === 'go to quiz one' || command === 'go to quiz 1'){
        if(this.math_attempted== true){
          console.log('You have already attempted this quiz')
          this.toastr.error('You have already attempted this quiz');
        }else{
          this.speechSynthesisService.cancel();
          this.router.navigate(['/student/quiz/math'])
          this.toastr.success('Voice Command', 'Go To Quiz 1');
        }
      } 
      else if(command === 'go to quiz two' || command === 'go to quiz 2'){
        if(this.english_attempted == true){
          console.log('You have already attempted this quiz')
          this.toastr.error('You have already attempted this quiz');
        }else{
          this.speechSynthesisService.cancel();
          this.router.navigate(['/student/quiz/english'])
          this.toastr.success('Voice Command', 'Go To Quiz 2');
        }
      }
      else if(command === 'decrease font size')
      {
        this.decreaseFontSize();
        this.toastr.success('Voice Command', 'Font Size Decreased');
      }
      else if(command === 'show performance' || command === 'display performance')
      {
        this.goToBottom();
       
      }
      else if(command === 'reload page' || command === 'refresh page')
      {
        window.location.reload();
       
      }
      // ... other quiz-specific commands
      this.cd.detectChanges();
    });
    this.speechSynthesisService.speak("Welcome to dashboard");
    // this.intitializeChart();
  }

  private quizResult(){
    this.backend.getResultById().subscribe((res)=>{
      console.log(res)
      this.quiz_api_result = res
      
      if(this.quiz_api_result.math){
        console.log(this.quiz_api_result);
        
        this.math_attempted = true
        this.math_result = this.quiz_api_result.math[0]
        console.log(this.math_result);
        
        this.cd.detectChanges();
      }else{
        this.math_attempted = false
        this.cd.detectChanges();
      }

      if(this.quiz_api_result.english){
        
        this.english_attempted = true
        this.english_result = this.quiz_api_result.english[0]
        console.log(this.quiz_api_result.english);
        
        this.cd.detectChanges();
      }else{
        this.english_attempted = false
        this.cd.detectChanges();
      }
      this.randomFontSize()
    })
  }

  private openDialog(){
    const dialogRef = this.dialog.open(PerformanceComponent, {
      width: '700px',
      // disableClose: true
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

   private increaseFontSize(): void {
    // this.toastr.success('Voice Command ', 'Font Size Increased');
    const elements = this.el.nativeElement.querySelectorAll('*');
    elements.forEach((el: HTMLElement) => {
      const currentSize = window.getComputedStyle(el).fontSize;
      const newSize = parseFloat(currentSize) + 5;
      this.renderer.setStyle(el, 'font-size', `${newSize}px`);
      
      // this.renderer.setStyle(el, 'margin-top', `${newSize - 2.5}px`);
      // this.renderer.setStyle(el, 'margin-bottom', `${newSize - 2.5}px`);
    });
   
  }

  private decreaseFontSize(){
    const elements = this.el.nativeElement.querySelectorAll('*');
    elements.forEach((el: HTMLElement) => {
      const currentSize = window.getComputedStyle(el).fontSize;
      const newSize = parseFloat(currentSize) - 5;
      this.renderer.setStyle(el, 'font-size', `${newSize}px`);
      // this.renderer.setStyle(el, 'margin-top', `${newSize - 2.5}px`);
      // this.renderer.setStyle(el, 'margin-bottom', `${newSize - 2.5}px`);
    });
    
  }

 intitializeChart(){
  this.chart = new Chart('canvas', {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'March', 'April', 'May', 'Jun'],
      datasets: [
        {
          label: 'Overall Performance',
          data: [2.8, 3, 3.25, 3.4, 3.5, 3.6],
          borderWidth: 4,
          tension: 0.1,
         
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
 }
 goToBottom(){
  this.openDialog()
  }

  private randomFontSize(){
    const num = Math.floor(Math.random() * 2 );
    if(num == 0){
      const elements = this.el.nativeElement.querySelectorAll('*');
      elements.forEach((el: HTMLElement) => {
        const currentSize = window.getComputedStyle(el).fontSize;
        const min =3;
        const max = 6;
        const randomFont =Math.floor(Math.random() * (max - min + 1) + min);
        const newSize = parseFloat(currentSize) - randomFont;
        this.renderer.setStyle(el, 'font-size', `${newSize}px`);
        // this.renderer.setStyle(el, 'margin-top', `${newSize - 2.5}px`);
        // this.renderer.setStyle(el, 'margin-bottom', `${newSize - 2.5}px`);
      });
    }else if(num == 1){
      const elements = this.el.nativeElement.querySelectorAll('*');
    elements.forEach((el: HTMLElement) => {
      const currentSize = window.getComputedStyle(el).fontSize;
      const min = 3;
        const max = 7;
        const randomFont =Math.floor(Math.random() * (max - min + 1) + min);
        const newSize = parseFloat(currentSize)+ randomFont;
      this.renderer.setStyle(el, 'font-size', `${newSize}px`);
      // this.renderer.setStyle(el, 'margin-top', `${newSize + 2.5}px`);
      // this.renderer.setStyle(el, 'margin-bottom', `${newSize + 2.5}px`);
    });
    }
    
  }

}
