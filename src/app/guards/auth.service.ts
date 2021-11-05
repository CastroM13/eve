import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  async authenticate() {
    await Storage.set({
      key: 'auth',
      value: '1',
    });
    this.router.navigate(['home'])
  }

  checkAuth = async () => {
    const { value } = await Storage.get({ key: 'auth' });
    console.log('checkAuth', value)
    if (value && value === '1') {
      console.log('passou')
      return true;
    } else {
      return false;
    }
  };

  async canActivate() {
    if (this.checkAuth()) {
      return true
    } else {
      this.router.navigate([''])
      return false;
    }
  }

  async canActivateChild() {
    if (await this.checkAuth()) {
      console.log(true);
      return true
    } else {
      this.router.navigate([''])
      return false;
    }
  }
}