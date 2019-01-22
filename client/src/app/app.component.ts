import { Component, OnInit } from '@angular/core';
import { AuthServise } from './core/services/auth.service';
import { Params, ActivatedRoute } from '@angular/router';
import { MaterialService } from './core/classes/material.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private auth: AuthServise,
              private route: ActivatedRoute) {}

  ngOnInit() {
    const potentialToken = localStorage.getItem('auth-token')
    if (potentialToken !== null) {
      this.auth.setToken(potentialToken)
    }
    const potentialId = localStorage.getItem('userId')
    if (potentialId !== null) {
      this.auth.setId(potentialId)
    }

    this.route.queryParams.subscribe( (params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Ви можете увійти в систему використовуючи свій логін і пароль')
      } else if (params['accsesDenied']) {
        MaterialService.toast('Спочатку авторизуйтеся на сайті')
      } else if (params['sesionFailed']) {
        MaterialService.toast('Будь ласка, увійдіть ще раз')
      }
    })
  }
}
