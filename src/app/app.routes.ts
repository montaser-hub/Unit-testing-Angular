import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { HeroDetail } from './hero-detail/hero-detail';
import { Heroes } from './heroes/heroes';

export const routes: Routes = [
    { path: '',  component: Dashboard },
    { path: 'dashboard', component: Dashboard },
    { path: 'detail/:id', component: HeroDetail },
    { path: 'heroes', component: Heroes }
  ];
