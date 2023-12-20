import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendServiceService } from 'src/app/services/backend-service/backend-service.service';
import { LocalStorageServiceService } from 'src/app/services/local-storage-service/local-storage-service.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  speechSynthesisService: any;
  loginForm: FormGroup;


  constructor(private router: Router,
    private api :BackendServiceService,
    private localstorage :LocalStorageServiceService,
    private toastr: ToastrService,
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder){
    this.localstorage.setUserId(0)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if(this.speechSynthesisService){
          this.speechSynthesisService.cancel();
        }
      }
    });

    this.loginForm = this.formBuilder.group({
      userid: new FormControl(''),
      password: new FormControl(''),
    });
  }

  submit(){
    const data = {
      "username": `${this.loginForm.value.userid}`,
      "password":  `${this.loginForm.value.password}`
    }
    console.log(data);
    this.api.login(data).subscribe((res)=>{
      if(res != "Invalid User"){
        console.log("Response: "+ res)
        this.localstorage.setUserId(res);
        console.log(this.localstorage.getUserId());
        this.router.navigate(['/student/dashboard']).then(()=>{
          // setTimeout(() => 
          // {
          //     window.location.reload()
          // },
          // 1000);
          })
      }
      else{
        this.toastr.error("Invalid User")
      }
    },error => {
      // You can access status:
      this.toastr.error("Invalid User")
      });
  }

  login(){
    this.submit();
    // 
  }
}
