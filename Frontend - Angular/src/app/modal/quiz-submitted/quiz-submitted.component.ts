import { ChangeDetectorRef, Component } from '@angular/core';
import { QuizComponent } from '../../student/quiz/quiz.component';
import { MatDialogRef } from '@angular/material/dialog';
import { VoiceCommandService } from 'src/app/services/voice-recognition.service';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-quiz-submitted',
  templateUrl: './quiz-submitted.component.html',
  styleUrls: ['./quiz-submitted.component.scss']
})
export class QuizSubmittedComponent {
  chart: any = []
  constructor(
   public dialogRef: MatDialogRef<QuizComponent>,
   private cd: ChangeDetectorRef,
   private voiceCommandService: VoiceCommandService
  ){

  }
  
  ngOnInit(){
    this.intitializeChart();
    this.voiceCommandService.initializeVoiceRecognition();
    this.voiceCommandService.commandEmitted.subscribe(command => {
      // Handle only specific commands for QuizComponent
      if(command == "enter full screen" || command == "inter full screen"){
        this.enterFullScreen()
      }

    });
  }

  onNoClick(): void {
   
    this.dialogRef.close();
  }
  enterFullScreen(){
    const enterFullScreen = true
    // console.log()
    if (enterFullScreen){
      const elem = document.documentElement;
      elem.requestFullscreen();
      // this.openFullScreen();
      // this.isFullScreenRequired = true; // Indicate that full screen is required
      // this.reEnterFullScreen();
     
    } 
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
}
