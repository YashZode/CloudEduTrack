import { Component, ElementRef, HostBinding, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThemeService } from 'src/app/services/theme-service.service';
import { VoiceCommandService } from 'src/app/services/voice-recognition.service';
import { ChangeDetectorRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NavigationStart, Route, Router } from '@angular/router';
import { SpeechSynthesisService } from 'src/app/services/speech-synthesis/speech-synthesis.service';
import { timeout } from 'rxjs';
import { Subscription, timer } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { QuizSubmittedComponent } from '../../modal/quiz-submitted/quiz-submitted.component';
import { BackendServiceService } from 'src/app/services/backend-service/backend-service.service';
declare var webkitSpeechRecognition: any;
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  recognition = new webkitSpeechRecognition()

  answerForm:FormGroup;
  selected_question=0;
  selected_answers:any=[];
  private tabSwitchCount = 0;
  private fullScreenExitCount = 0;
  isFullScreenRequired: boolean = false;

  // TIMER
  private countdown!: Subscription;
  timerDisplay: string = '';
  initialTime: number = 5 * 60; //TIME minutes * seconds
  questions: any= []
  // questions: any = [
  //   ['21 + 41 = ',
  //    '68', 
  //    '62', 
  //    '58', 
  //    '60'],
  //    ['75 - 29 = ',
  //    '46', 
  //    '54', 
  //    '64', 
  //    '53'],
  //    ['49 + 82 = ',
  //    '132', 
  //    '121', 
  //    '131', 
  //    '134'],
  //    ['88 - 70 = ',
  //    '18', 
  //    '16', 
  //    '19', 
  //    '28'],
  //    ['74 - 15 = ',
  //    '53', 
  //    '57', 
  //    '69', 
  //    '59'],
  //   ]

  new_questions:any
  constructor(private voiceCommandService: VoiceCommandService, private cd: ChangeDetectorRef,
    private themeService:ThemeService, private formBuilder: FormBuilder, private renderer: Renderer2, private el: ElementRef,
    private toastr: ToastrService, private router : Router,
    private speechSynthesisService: SpeechSynthesisService,
    private dialog: MatDialog,
    private backend:BackendServiceService
    ) {
   
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.speechSynthesisService.cancel();
        }
      });
    this.answerForm = this.formBuilder.group({
     
    });
   
  }
  toggleControll = new FormControl(false);
  @HostBinding('class') className = '';
  darkClassName = 'theme-dark';
  lightClassName = 'theme-light';
  urlHref: any;
  subject_name:any
  getSubjectNameAndQuestions() {
    this.urlHref = window.location.href;
    const link  = this.urlHref.split('/');
    this.subject_name = link[link.length-1]
    console.log(this.subject_name)
    this.backend.getQuestions(this.subject_name).subscribe((res:any)=>{
      const data = res
      console.log(data)
      this.new_questions = data
      for(let i = 0; i < this.new_questions.length ; i++){
        const data = [this.new_questions[i]["questionText"],this.new_questions[i]["optionA"],this.new_questions[i]["optionB"],this.new_questions[i]["optionC"],this.new_questions[i]["optionD"]]
        this.questions.push(data)
      }
      for(let x = 0; x< this.questions.length ; x++){
        this.answerForm.addControl(`Answer ${x}`, this.formBuilder.control(''));
        this.selected_answers.push('Option 0');
      }
      console.log(this.answerForm.value)
      console.log(this.selected_answers)
      this.repeatQuestion();
    this.repeatOptions();
      // this.questions = data
      // for(let x = 0; x< this.questions.length ; x++){
      //   this.answerForm.addControl(`Answer ${x}`, this.formBuilder.control(''));
      //   this.selected_answers.push('Option 0');
      // }
      // console.log(this.answerForm.value)
      // console.log(this.selected_answers)
    })
  }

  ngOnInit(): void {
    this.getSubjectNameAndQuestions()
    this.decreaseFontSize();
    // this.promptForFullScreen();
    // Detect tab switch
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.tabSwitchCount++;
      }
    });
    
    // Initialize the timer
    this.startTimer();

    this.voiceCommandService.initializeVoiceRecognition();
    
    this.voiceCommandService.commandEmitted.subscribe(command => {
      // Handle only specific commands for QuizComponent
      console.log(command)
      if (command === 'select option a' || command === 'select option 1') {
        
              this.answerForm.controls[`Answer ${this.selected_question}`].setValue(`${this.questions[this.selected_question][1]}`);
              this.selected_answers[this.selected_question ] = `${this.questions[this.selected_question][1]}`
              console.log(this.answerForm.value)
            this.toastr.success('Voice Command', `Selected Option A`);
            } else if (command === 'select option b' || command === 'select option 2') {
              this.answerForm.controls[`Answer ${this.selected_question}`].setValue(`${this.questions[this.selected_question][2]}`);
              this.selected_answers[this.selected_question ] = `${this.questions[this.selected_question][2]}`
              console.log(this.answerForm.value)
              this.toastr.success('Voice Command', `Selected Option B`);
            }
            else if (command === 'select option c' || command === 'select option 3') {
            
              console.log(this.answerForm.value)
              this.answerForm.controls[`Answer ${this.selected_question}`].setValue(`${this.questions[this.selected_question][3]}`);
              this.selected_answers[this.selected_question ] = `${this.questions[this.selected_question][3]}`
              console.log(this.answerForm.value)
              this.toastr.success('Voice Command', `Selected Option C`);
            }
            else if (command === 'select option d' || command === 'select option 4') {
              this.answerForm.controls[`Answer ${this.selected_question}`].setValue(`${this.questions[this.selected_question][4]}`);
              this.selected_answers[this.selected_question ] = `${this.questions[this.selected_question][4]}`
              console.log(this.answerForm.value)
              this.toastr.success('Voice Command', `Selected Option D`);
            }
            else if (command === 'clear response') {
              this.answerForm.controls[`Answer ${this.selected_question}`].setValue(``);
            }
            else if (command === 'show next question') {
              this.speechSynthesisService.cancel();
             this.showNextQuestion()
             console.log(this.answerForm.value)
            }
            else if (command === 'show previous question') {
              this.speechSynthesisService.cancel();
              this.showPreviousQuestion()
              console.log(this.answerForm.value)
            }
            else if (command === 'repeat question') {
              this.speechSynthesisService.cancel();
              this.repeatQuestion()
            }
            else if (command === 'repeat options') {
              this.speechSynthesisService.cancel();
              this.repeatOptions()
            }
            else if (command === 'increase font size') {
              this.increaseFontSize()
            }
            else if (command === 'decrease font size') {
              this.decreaseFontSize()
            }
            else if (command === 'submit quiz') {
              this.submitQuiz()
            }
            this.cd.detectChanges();

    });
    this.speechSynthesisService.speak("Welcome to Quiz");
    
  }
  ngOnDestroy(): void {
    // Ensure to clear the timer when the component is destroyed
    if (this.countdown) {
      this.countdown.unsubscribe();
    }
    document.removeEventListener('fullscreenchange',  this.fullScreenChangeListener, true);
  }
  private startTimer() {
    const source = timer(1000, 1000);
    this.countdown = source.subscribe(sec => {
      this.initialTime--;
      this.timerDisplay = this.formatTime(this.initialTime);

      if (this.initialTime <= 0) {
        this.countdown.unsubscribe();
        this.submitQuiz();
      }
    });
  }
  private formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  showPreviousQuestion(){
    if(this.selected_question == 0 ){
      this.selected_question = this.questions.length -1;
      this.speechSynthesisService.cancel();
      // this.answerForm.controls[`Answer ${this.selected_question}`].setValue(`${this.selected_answers[this.selected_question-1]}`);
      console.log(this.selected_question)
      this.repeatQuestion();
      this.repeatOptions();
    }
    else{
      this.selected_question = this.selected_question - 1
      this.speechSynthesisService.cancel();
      // this.answerForm.controls[`Answer ${this.selected_question}`].setValue(`${this.selected_answers[this.selected_question-1]}`);
      console.log(this.selected_question)
      this.repeatQuestion();
      this.repeatOptions();
    }
  }

  showNextQuestion(){
    if((this.selected_question + 1 )> this.questions.length - 1 ){
      this.selected_question = 0;
      // this.answerForm.controls[`Answer ${this.selected_question}`].setValue(`${this.selected_answers[this.selected_question-1]}`);
      console.log(this.selected_question)
      this.speechSynthesisService.cancel();
      this.repeatQuestion();
      this.repeatOptions();
    }
    else{
      this.selected_question = this.selected_question + 1
      // this.answerForm.controls[`Answer ${this.selected_question}`].setValue(`${this.selected_answers[this.selected_question-1]}`);
      console.log(this.selected_question)
      this.speechSynthesisService.cancel();
      this.repeatQuestion();
      this.repeatOptions();
    }
  }

  private increaseFontSize(): void {
    const elements = this.el.nativeElement.querySelectorAll('*');
    elements.forEach((el: HTMLElement) => {
      const currentSize = window.getComputedStyle(el).fontSize;
      const newSize = parseFloat(currentSize) + 2;
      this.renderer.setStyle(el, 'font-size', `${newSize}px`);
      this.renderer.setStyle(el, 'margin-top', `${newSize - 2.5}px`);
      this.renderer.setStyle(el, 'margin-bottom', `${newSize - 2.5}px`);
    });
  }

  private decreaseFontSize(){
    const elements = this.el.nativeElement.querySelectorAll('*');
    elements.forEach((el: HTMLElement) => {
      const currentSize = window.getComputedStyle(el).fontSize;
      const newSize = parseFloat(currentSize) - 6;
      this.renderer.setStyle(el, 'font-size', `${newSize}px`);
      this.renderer.setStyle(el, 'margin-top', `${newSize - 2.5}px`);
      this.renderer.setStyle(el, 'margin-bottom', `${newSize - 2.5}px`);
    });
  }

  submitQuiz(){
    // alert(`Your response has been recorded\nNumber of times tab switched: ${this.tabSwitchCount}\nNumber of times full-screen exited: ${this.fullScreenExitCount}`);
    if(this.tabSwitchCount == 0){
      this.toastr.info(`Number of times tab switched: ${this.tabSwitchCount}`, ` `);
    }else{
      this.toastr.error(`Number of times tab switched: ${this.tabSwitchCount}`, ` `)
    }
    if(this.fullScreenExitCount == 0){
      this.toastr.info(`Number of times the full-screen mode was exited: ${this.fullScreenExitCount}`, ` `);
    }else{
      this.toastr.error(`Number of times the full-screen mode was exited:${this.fullScreenExitCount}`, ` `)
    }
    this.toastr.success('Your response has been recorded', 'Quiz Submitted ')
    this.speechSynthesisService.speak(`Your response has been recorded. Thank you for submitting the quiz.`);
    this.router.navigate(['/student/dashboard'])
    this.speechSynthesisService.speak("Your quiz response has been recorded");
    document.exitFullscreen();
    
 
  }


  repeatQuestion(){
    this.speechSynthesisService.speak(`Question ${this.selected_question+1}`);
    timeout(1000)
    this.speechSynthesisService.speak(`${this.questions[this.selected_question][0]}`);
  }
  repeatOptions(){
    this.speechSynthesisService.speak(`Option A`);
    timeout(1000)
    this.speechSynthesisService.speak(`${this.questions[this.selected_question][1]}`);
    timeout(1000)
    this.speechSynthesisService.speak(`Option B`);
    timeout(1000)
    this.speechSynthesisService.speak(`${this.questions[this.selected_question][2]}`);
    timeout(1000)
    this.speechSynthesisService.speak(`Option C`);
    timeout(1000)
    this.speechSynthesisService.speak(`${this.questions[this.selected_question][3]}`);
    timeout(1000)
    this.speechSynthesisService.speak(`Option D`);
    timeout(1000)
    this.speechSynthesisService.speak(`${this.questions[this.selected_question][4]}`);
    timeout(1000)
  }

  private addFullScreenChangeListener(): void {
    document.addEventListener('fullscreenchange',this.fullScreenChangeListener, true);
  }
  private fullScreenChangeListener = () => {
    if (!document.fullscreenElement) {
      this.fullScreenExitCount++;
    }
  };
  private promptForFullScreen(): void {
    
    // const enterFullScreen = confirm("Click OK to enter full-screen mode for the quiz.");
    // if (enterFullScreen) {
      this.openFullScreen();
    // }
  }

  private openFullScreen(): void {
    const elem = document.documentElement;

    // if (elem.requestFullscreen) {
      elem.requestFullscreen();
    // } 
    // else if (elem.mozRequestFullScreen) { /* Firefox */
    //   elem.mozRequestFullScreen();
    // } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    //   elem.webkitRequestFullscreen();
    // } else if (elem.msRequestFullscreen) { /* IE/Edge */
    //   elem.msRequestFullscreen();
    // }
    this.addFullScreenChangeListener();
  }
  reEnterFullScreen(): void {
    if (this.isFullScreenRequired) {
      this.openFullScreen();
      this.isFullScreenRequired = false;
    }
  }
}

