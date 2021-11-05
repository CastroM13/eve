import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthGuardService } from '../guards/auth.service';
import { Storage } from '@capacitor/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  authCode: string;

  constructor(private router: Router, public toastController: ToastController, public authGuardService: AuthGuardService) { }

  async ngOnInit() {
    const { value } = await Storage.get({ key: 'auth' });
    console.log('valu', value)
    if (value) {
      this.router.navigate(['/home']);
    }
  }

  async authenticate() {
    const a = new Date();
    if (!(document.getElementById("authCode")["value"])) {
      const toast = await this.toastController.create({
        message: 'Preencha o campo!',
        duration: 2000,
        color: 'warning',
      });
      toast.present();
    } else
    if (document.getElementById("authCode")["value"] === a.getMinutes().toString().padStart(2, '0').split('').reverse().join('') + a.getHours().toString().padStart(2, '0').split('').reverse().join('') + a.getDay().toString().padStart(2, '0').split('').reverse().join('')) {
      this.authGuardService.authenticate()
    } else {
      const toast = await this.toastController.create({
        message: 'Autenticação Inválida!',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }

  focus() {
    document.getElementById("placeholder-label").classList.add("active");
  }

  blur() {
    if (!document.getElementById("authCode")["value"]) {
      document.getElementById("placeholder-label").classList.remove("active");
    }
  }

}
