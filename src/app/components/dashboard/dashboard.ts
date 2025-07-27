import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Ihero } from '../../models/ihero';
import { HeroService } from '../../services/hero-service/hero.service';
import { StrengthPipe } from '../../pipes/strength/strength-pipe';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    imports: [StrengthPipe, RouterModule],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  heroes: Ihero[] = [];

  constructor(private heroService: HeroService,private cdr: ChangeDetectorRef) { }
  
  ngOnInit() {
    
    this.heroService.getHeroes()
    .subscribe(heroes => {this.heroes = heroes.slice(1, 5)
      this.cdr.detectChanges()

      });
  
  
  }

}
