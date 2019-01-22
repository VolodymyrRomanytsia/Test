import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthServise } from '../core/services/auth.service';
import { MaterialService } from '../core/classes/material.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(private auth: AuthServise,
              private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null,  [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
      confirmPassword: new FormControl(null, [Validators.required])
    }, {validators: passwordMatchValidator});

    function passwordMatchValidator (AC: AbstractControl) {
      let password = AC.get('password').value;
      let confirmPassword = AC.get('confirmPassword').value; 
       if(password != confirmPassword) {
           AC.get('confirmPassword').setErrors( {MatchPassword: true} )
       } else {
           return null
       }
      }
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.register(this.form.value).subscribe(
      () => this.router.navigate(['login'], {
        queryParams: {
          registered: true
        }
      }),
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      } 
    )
  }

}
