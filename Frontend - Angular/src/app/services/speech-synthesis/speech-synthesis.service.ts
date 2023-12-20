import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechSynthesisService {
  private voices: SpeechSynthesisVoice[] = [];
  private currentVoice: SpeechSynthesisVoice = this.voices[0];
  private currentVoiceIndex = 0;
  private maleVoiceName: string = "Microsoft David Desktop";  // Name for the male voice
  private femaleVoiceName: string = "Microsoft Zira Desktop"; // Name for the female voice
  private isMaleVoice: boolean = true;
  private currentPitch = 1;
  private currentRate = 1;

  constructor() {
    this.loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = this.loadVoices;
    }
  }

  private loadVoices() {
    this.voices = speechSynthesis.getVoices();
    console.log(this.voices)
  }

  public speak(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.currentVoice!;
    utterance.pitch = this.currentPitch
    utterance.rate = this.currentRate; // Using non-null assertion here
    speechSynthesis.speak(utterance);
  }

  public cancel(){
    speechSynthesis.cancel();
  }

  public changeVoice(): void {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const utterance = new SpeechSynthesisUtterance("Changing voice model");
    switch (this.currentVoiceIndex){
      case 0 : this.currentVoiceIndex = 4; break
      case 4 : this.currentVoiceIndex = 0; break
    }
    this.currentVoice = voices[this.currentVoiceIndex]
    utterance.voice = voices[this.currentVoiceIndex];
    utterance.pitch = this.currentPitch
    utterance.rate = this.currentRate;
    speechSynthesis.speak(utterance);
    // this.isMaleVoice = !this.isMaleVoice;
    // this.setVoice(this.isMaleVoice ? this.maleVoiceName : this.femaleVoiceName);
    // const voiceType = this.isMaleVoice ? 'Microsoft David' : 'Microsoft Zira';
    // this.speak(`Voice changed to ${voices[4].name}`);
  }

  public decreasePitch(){
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const utterance = new SpeechSynthesisUtterance("Decreasing pitch of voice modal");
    this.currentVoice = voices[this.currentVoiceIndex]
    utterance.voice = voices[this.currentVoiceIndex];
    utterance.rate = this.currentRate;
    utterance.pitch = this.currentPitch - 0.5 ;
    this.currentPitch = this.currentPitch - 0.5
    speechSynthesis.speak(utterance);
  }

  public increasePitch(){
   
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      const utterance = new SpeechSynthesisUtterance("Increasing pitch of voice modal");
      this.currentVoice = voices[this.currentVoiceIndex]
      utterance.voice = voices[this.currentVoiceIndex];
      utterance.rate = this.currentRate;
      utterance.pitch = this.currentPitch + 0.5 ;
      this.currentPitch = this.currentPitch + 0.5
      speechSynthesis.speak(utterance);
  
  }
  public resetPitch(){
    const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      const utterance = new SpeechSynthesisUtterance("Pitch of voice modal is reset");
      this.currentVoice = voices[this.currentVoiceIndex]
      utterance.voice = voices[this.currentVoiceIndex];
      utterance.rate = this.currentRate;
      utterance.pitch = 1 ;
      this.currentPitch = 1
      speechSynthesis.speak(utterance);
  }

  public decreaseRate(){
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const utterance = new SpeechSynthesisUtterance("Decreasing rate of voice modal");
    this.currentVoice = voices[this.currentVoiceIndex]
    utterance.voice = voices[this.currentVoiceIndex];
      utterance.pitch = this.currentPitch
      this.currentRate = this.currentRate - 0.3
      utterance.rate = this.currentRate;
    speechSynthesis.speak(utterance);
  }

  public increaseRate(){
   
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      const utterance = new SpeechSynthesisUtterance("Increasing rate of voice modal");
      this.currentVoice = voices[this.currentVoiceIndex]
      utterance.voice = voices[this.currentVoiceIndex];
      utterance.pitch = this.currentPitch
      this.currentRate = this.currentRate + 0.3
      utterance.rate = this.currentRate;
      speechSynthesis.speak(utterance);
  
  }
  public resetRate(){
    const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      const utterance = new SpeechSynthesisUtterance("Rate of voice modal is reset");
      this.currentVoice = voices[this.currentVoiceIndex]
      utterance.voice = voices[this.currentVoiceIndex];
      utterance.pitch = this.currentPitch
      utterance.rate = 1;
      this.currentRate = 1;
      speechSynthesis.speak(utterance);
  }

}
