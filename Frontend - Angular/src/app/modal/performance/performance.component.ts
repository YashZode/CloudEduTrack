import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VoiceCommandService } from 'src/app/services/voice-recognition.service';
import { DashboardComponent } from 'src/app/student/dashboard/dashboard.component';
import Chart from 'chart.js/auto';
import { StudentNavigationComponent } from 'src/app/student/student-navigation/student-navigation.component';
@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  chart: any = []
  constructor(
   public dialogRef: MatDialogRef<StudentNavigationComponent>,
   private cd: ChangeDetectorRef,
   private voiceCommandService: VoiceCommandService
  ){
    // this.ngOnInit()
    
  }
  
  ngOnInit(){
    this.voiceCommandService.initializeVoiceRecognition();
    
    this.voiceCommandService.commandEmitted.subscribe(command => {
      // Handle only specific commands for QuizComponent
      if(command == "exit" || command == "escape"){
       this.onNoClick()
      }
    });
    // this.cd.detectChanges();
    this.intitializeChart();
    // this.cd.detectChanges();
  }
  ngAfterViewInit() {
    // Initialize chart here
    console.log("this is after view init");
    
    
    this.cd.detectChanges();
  }
  onNoClick(): void {
   
    this.dialogRef.close();
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
    console.log("I'm in ")
   }
}
