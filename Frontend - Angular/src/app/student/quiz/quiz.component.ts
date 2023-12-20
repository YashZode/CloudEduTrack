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
import { LocalStorageServiceService } from 'src/app/services/local-storage-service/local-storage-service.service';
declare var webkitSpeechRecognition: any;
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  recognition = new webkitSpeechRecognition()
  userId: any
  answerForm:FormGroup;
  selected_question=1;
  selected_answers:any=[];
  private tabSwitchCount = 0;
  private fullScreenExitCount = 0;
  isFullScreenRequired: boolean = false;
  question_ids:any
  // TIMER
  private countdown!: Subscription;
  timerDisplay: string = '';
  initialTime: number = 10 * 60; //TIME minutes * seconds
  questions: any
  new_questions:any
  constructor(private voiceCommandService: VoiceCommandService, private cd: ChangeDetectorRef,
    private themeService:ThemeService, private formBuilder: FormBuilder, private renderer: Renderer2, private el: ElementRef,
    private toastr: ToastrService, private router : Router,
    private speechSynthesisService: SpeechSynthesisService,
    private dialog: MatDialog,
    private backend:BackendServiceService,
    private localstorage : LocalStorageServiceService
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
  final_array:any
  getSubjectNameAndQuestions() {
    this.urlHref = window.location.href;
    const link  = this.urlHref.split('/');
    this.subject_name = link[link.length-1]
    console.log(this.subject_name)
    this.backend.getQuestions(this.subject_name).subscribe((res:any)=>{
      const data = res
      console.log(data)
      this.new_questions = data
      this.questions= [''];
      this.question_ids=['']
      for(let i = 0; i < this.new_questions.length ; i++){
        const data = [this.new_questions[i]["questionText"],this.new_questions[i]["optionA"],this.new_questions[i]["optionB"],this.new_questions[i]["optionC"],this.new_questions[i]["optionD"]]
        this.questions.push(data)
        const ids = this.new_questions[i]["id"]
        this.question_ids.push(ids)
      }
      for(let x = 0; x< this.questions.length ; x++){
        this.answerForm.addControl(`Answer_${x}`, this.formBuilder.control(''));
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
    this.userId = this.localstorage.getUserId()
    this.getSubjectNameAndQuestions()
    // this.randomFontSize();
    // this.decreaseFontSize();
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
    this.speechSynthesisService.speak("Welcome to Quiz");
    this.voiceCommandService.commandEmitted.subscribe(command => {
      // Handle only specific commands for QuizComponent
      console.log(command)
      if (command === 'select option a' || command === 'select option 1') {
        
              this.answerForm.controls[`Answer_${this.selected_question}`].setValue(`${this.questions[this.selected_question][1]}`);
              this.selected_answers[this.selected_question ] = `a`
              console.log(this.answerForm.value)
              console.log(this.selected_answers)
              this.speechSynthesisService.cancel();
            this.toastr.success('Voice Command', `Selected Option A`);
            } else if (command === 'select option b' || command === 'select option 2') {
              this.answerForm.controls[`Answer_${this.selected_question}`].setValue(`${this.questions[this.selected_question][2]}`);
              this.selected_answers[this.selected_question ] = `b`
              console.log(this.answerForm.value)
              this.speechSynthesisService.cancel();
              this.toastr.success('Voice Command', `Selected Option B`);
            }
            else if (command === 'select option c' || command === 'select option 3') {
            
              console.log(this.answerForm.value)
              this.answerForm.controls[`Answer_${this.selected_question}`].setValue(`${this.questions[this.selected_question][3]}`);
              this.selected_answers[this.selected_question ] = `c`
              console.log(this.answerForm.value)
              this.speechSynthesisService.cancel();
              this.toastr.success('Voice Command', `Selected Option C`);
            }
            else if (command === 'select option d' || command === 'select option 4') {
              this.answerForm.controls[`Answer_${this.selected_question}`].setValue(`${this.questions[this.selected_question][4]}`);
              this.selected_answers[this.selected_question ] = `d`
              console.log(this.answerForm.value)
              this.speechSynthesisService.cancel();
              this.toastr.success('Voice Command', `Selected Option D`);
            }
            else if (command === 'clear response') {
              this.answerForm.controls[`Answer_${this.selected_question}`].setValue(``);
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
    
    
  }
  ngAfterViewInit(){
    this.randomFontSize();
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
    if(this.selected_question == 1 ){
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
      this.selected_question = 1;
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

  private setFontSize(): void {
    const elements = this.el.nativeElement.querySelectorAll('*');
    elements.forEach((el: HTMLElement) => {
      const currentSize = window.getComputedStyle(el).fontSize;
      const newSize = parseFloat(currentSize) + 2;
      this.renderer.setStyle(el, 'font-size', `${newSize}px`);
      this.renderer.setStyle(el, 'margin-top', `${newSize - 2.5}px`);
      this.renderer.setStyle(el, 'margin-bottom', `${newSize - 2.5}px`);
    });
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

  private randomFontSize(){
    const num = Math.floor(Math.random() * 2 );
    if(num == 0){
      const elements = this.el.nativeElement.querySelectorAll('*');
      elements.forEach((el: HTMLElement) => {
        const currentSize = window.getComputedStyle(el).fontSize;
        const min =6;
        const max = 10;
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
    const ans = []
    for(let i = 1; i< this.selected_answers.length; i++){
      const obj ={
        "questionId": this.question_ids[i],
        "selectedOption": this.selected_answers[i]
      }
      ans.push(obj)
    }
    const data ={
      "answers": ans,
      "numberOfTimesTabSwitched":  this.tabSwitchCount ,
      "userId" : this.userId,
      "subjectName": `${this.subject_name}`
    }
    console.log("SUBMITTED DATA");
    
    console.log(data)
    this.backend.submitQuizResponse(data).subscribe((res)=>{
      console.log(res)
      
    this.toastr.success('Your response has been recorded', 'Quiz Submitted ')
    this.speechSynthesisService.speak(`Your response has been recorded. Thank you for submitting the quiz.`);
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
  
     this.router.navigate(['/student/dashboard']).then(()=>{
      // setTimeout(() => 
      // {
      //     window.location.reload()
      // },
      // 4000);
      })
      this.speechSynthesisService.speak("Your quiz response has been recorded");
      if(document.activeElement){
        document.exitFullscreen();
      }

    })

    
    
 
  }

  selectOption(option:any){
    switch(option){
      case 'a':
        this.answerForm.controls[`Answer_${this.selected_question}`].setValue(`${this.questions[this.selected_question][1]}`);
        this.selected_answers[this.selected_question ] = `a`
        break;
      case 'b':
        this.answerForm.controls[`Answer_${this.selected_question}`].setValue(`${this.questions[this.selected_question][2]}`);
        this.selected_answers[this.selected_question ] = `b`
        break;
      case 'c':
        this.answerForm.controls[`Answer_${this.selected_question}`].setValue(`${this.questions[this.selected_question][3]}`);
        this.selected_answers[this.selected_question ] = `c`
        break;
      case 'd':
        this.answerForm.controls[`Answer_${this.selected_question}`].setValue(`${this.questions[this.selected_question][4]}`);
        this.selected_answers[this.selected_question ] = `d`
        break;

    }
    console.log(this.answerForm.value)
    
  }


  repeatQuestion(){
    this.speechSynthesisService.speak(`Question ${this.selected_question}`);
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

