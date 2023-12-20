import { Injectable, EventEmitter, ElementRef } from '@angular/core';
import { ThemeService } from 'src/app/services/theme-service.service';
import { Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { SpeechSynthesisService } from './speech-synthesis/speech-synthesis.service';
import { LocalStorageServiceService } from './local-storage-service/local-storage-service.service';

declare var webkitSpeechRecognition: any;
@Injectable({
  providedIn: 'root'
})
export class VoiceCommandService {
  commandEmitted = new EventEmitter<string>();
 recognition = new webkitSpeechRecognition();

  private isRecognitionStarted = false;

  constructor(private themeService: ThemeService,
     private router: Router,
     private toastr: ToastrService,
     private speechSynthesisService: SpeechSynthesisService,
    private localstorage: LocalStorageServiceService
     ) {
    this.recognition = new webkitSpeechRecognition();
    this.initializeVoiceRecognition();
  }

  public initializeVoiceRecognition(): void {
    this.recognition.continuous = false;
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: any) => {
      const last = event.results.length - 1;
      const command = event.results[last][0].transcript.trim().toLowerCase();
      this.handleCommand(command);
    };

    this.recognition.onend = () => {
      console.log("Speech recognition ended");
      this.isRecognitionStarted = false;
      this.startRecognition();
    };

    this.startRecognition();
  }

  private startRecognition(): void {
    if (!this.isRecognitionStarted) {
      this.recognition.start();
      this.isRecognitionStarted = true;
    }
  }
  private handleCommand(command: string): void {
    console.log(command)
    
    switch(command) {
      case 'switch theme':
        this.themeService.toggleTheme();
       
        break;
        case 'switch team':
          this.themeService.toggleTheme();
          break;

      case 'go to dashboard':
        this.speechSynthesisService.cancel();
        this.router.navigate(['/student/dashboard']);
        this.toastr.success('Voice Command', 'Go To Dashboard');
        break;

      case 'change voice model':
        this.speechSynthesisService.cancel();
          this.speechSynthesisService.changeVoice();
          this.speechSynthesisService.speak("THIS IS THE NEW VOICE MODEL")
          break;

      case 'logout':
        this.speechSynthesisService.cancel();
          this.router.navigate(['']).then(()=>{
            window.location.reload()
            this.localstorage.setUserId(0)
          })
          this.toastr.success('Voice Command', 'Successfully Logged Out');
          break;
      case 'log out':
        this.speechSynthesisService.cancel();
        this.localstorage.setUserId('')
        this.router.navigate(['']).then(()=>{
          window.location.reload()
          this.localstorage.setUserId(0)
        })
          this.toastr.success('Voice Command', 'Successfully Logged Out');
          
          break;
      case 'increase pitch':
        this.speechSynthesisService.cancel();
         this.speechSynthesisService.increasePitch()
                      break;
      case 'decrease pitch':
        this.speechSynthesisService.cancel();
          this.speechSynthesisService.decreasePitch()
          break;
      case 'reset pitch':
        this.speechSynthesisService.cancel();
            this.speechSynthesisService.resetPitch()
            break;
      case 'increase rate':
        this.speechSynthesisService.cancel();
              this.speechSynthesisService.increaseRate()
              break;
     case 'decrease rate':
      this.speechSynthesisService.cancel();
              this.speechSynthesisService.decreaseRate()
            break;
      case 'reset rate':
        this.speechSynthesisService.cancel();
        this.speechSynthesisService.resetRate();
        break;

      default:
        this.commandEmitted.emit(command);
        break;
    }
    // recognition.abort();
    // this.recognition.start();
  }
  // private increaseFontSize(): void {
  //   const elements = this.el.nativeElement.querySelectorAll('*');
  //   elements.forEach((el: HTMLElement) => {
  //     const currentSize = window.getComputedStyle(el).fontSize;
  //     const newSize = parseFloat(currentSize) + 5;
  //     this.renderer.setStyle(el, 'font-size', `${newSize}px`);
  //     this.renderer.setStyle(el, 'margin-top', `${newSize - 2.5}px`);
  //     this.renderer.setStyle(el, 'margin-bottom', `${newSize - 2.5}px`);
  //   });
  // }
  // private decreaseFontSize(){
  //   const elements = this.el.nativeElement.querySelectorAll('*');
  //   elements.forEach((el: HTMLElement) => {
  //     const currentSize = window.getComputedStyle(el).fontSize;
  //     const newSize = parseFloat(currentSize) - 5;
  //     this.renderer.setStyle(el, 'font-size', `${newSize}px`);
  //     this.renderer.setStyle(el, 'margin-top', `${newSize - 2.5}px`);
  //     this.renderer.setStyle(el, 'margin-bottom', `${newSize - 2.5}px`);
  //   });
  // }
  // private changeFontSize(direction: number): void {
  //   const elements = document.querySelectorAll('body *'); // Adjust the selector as needed
  //   elements.forEach((el: HTMLElement) => {
  //     const currentSize = window.getComputedStyle(el).fontSize;
  //     const newSize = parseFloat(currentSize) + (direction * 2); // Adjust step size as needed
  //     this.renderer.setStyle(el, 'font-size', `${newSize}px`);
  //   });
  // }
  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
  scrollDown(): void {
    console.log('In')
    window.scrollBy({
      top: 300, // Or any other value for the scroll step
      behavior: 'smooth'
    });
  }
}
