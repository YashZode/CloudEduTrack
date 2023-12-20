import { TestBed } from '@angular/core/testing';

import { VoiceCommandService } from './voice-recognition.service';

describe('VoiceRecognitionService', () => {
  let service: VoiceCommandService;
  VoiceCommandService
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VoiceCommandService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
