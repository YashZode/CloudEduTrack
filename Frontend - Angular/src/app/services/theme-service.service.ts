import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  constructor(private toastr: ToastrService){

  }
  toggleTheme(): void {
    this.isDarkTheme.next(!this.isDarkTheme.value);
    this.toastr.success('Voice Command', 'Theme Switched');
  }

  getThemeStatus() {
    return this.isDarkTheme.asObservable();
  }
}
