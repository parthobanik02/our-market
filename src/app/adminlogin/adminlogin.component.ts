import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RestService} from '../rest.service';
import { Router} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  adminloginForm: FormGroup;
  invalidLogin: boolean = false; 
  constructor(private formBuilder: FormBuilder,private router: Router,private apiService: RestService) {
    this.adminloginForm = this.formBuilder.group({
      admin_email: ['', Validators.compose([Validators.required])],
      admin_password: ['', Validators.required]
    });
   }

  onSubmit() {
    if (this.adminloginForm.invalid) {
      return;
    }
    const adminloginPayload = {
      admin_email: this.adminloginForm.controls.admin_email.value,
      admin_password: this.adminloginForm.controls.admin_password.value
    }
    this.apiService.adminlogin(adminloginPayload).subscribe(data => {
      console.log(data);
      if(data.result === 200) {
        window.localStorage.setItem('token', data.result.token);
        this.router.navigate(['home']);
      }else {
        this.invalidLogin = true;
        alert(data.message);
      }
    });
  }

  ngOnInit() {
    window.localStorage.removeItem('token');
    this.adminloginForm = this.formBuilder.group({
      admin_email: ['', Validators.compose([Validators.required])],
      admin_password: ['', Validators.required]
    });
  }

}
