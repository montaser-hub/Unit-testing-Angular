import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../services/hero service/hero.service';
import { StrengthPipe } from '../pipes/strength/strength.pipe';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    imports: [StrengthPipe, RouterModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
      // console.log('this.heroes: ', this.heroes);

  }
}
