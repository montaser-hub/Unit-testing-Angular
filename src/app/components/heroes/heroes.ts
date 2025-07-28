import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Ihero } from '../../models/ihero';
import { HeroService } from '../../services/hero-service/hero.service';
import { Hero} from '../hero/hero';

@Component({
    selector: 'app-heroes',
    imports: [Hero],
    templateUrl: './heroes.html',
    styleUrls: ['./heroes.css']
})
export class Heroes implements OnInit {
  heroes: Ihero[];

  constructor(
    private heroService: HeroService,
    private cdr: ChangeDetectorRef,
  ) { 
    this.heroes=[]
  }

  ngOnInit() {
    this.getHeroes()    
  }
  
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes =>{ 
      this.heroes = heroes
      this.cdr.detectChanges()
    });
  }

  add(name: string,strength:number = 11): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name, strength } as Ihero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Ihero): void {
    this.heroes = this.heroes.filter(h => h.id !== hero.id);
    this.heroService.deleteHero(hero)
  }

}
