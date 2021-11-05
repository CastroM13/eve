import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth.service';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule),
    canActivate: [AuthGuardService],
    canActivateChild: [AuthGuardService]
  },
  {path: '**', redirectTo: '/404'},
  {path: '404', component: NotfoundComponent, canActivate: [AuthGuardService]},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
