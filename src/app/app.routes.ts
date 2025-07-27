import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { HeroDetail } from './components/hero-detail/hero-detail';
import { Heroes } from './components/heroes/heroes';

export const routes: Routes = [
    { path: '',  component: Dashboard },
    { path: 'dashboard', component: Dashboard },
    { path: 'detail/:id', component: HeroDetail },
    { path: 'heroes', component: Heroes }
  ];
