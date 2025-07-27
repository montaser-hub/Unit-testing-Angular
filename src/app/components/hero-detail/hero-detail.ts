import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

import { Ihero }         from '../../models/ihero';
import { HeroService }  from '../../services/hero-service/hero.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-hero-detail',
    imports: [FormsModule, CommonModule],
    templateUrl: './hero-detail.html',
    styleUrls: ['./hero-detail.css']
})
export class HeroDetail implements OnInit {
  @Input() hero!: Ihero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private cdr: ChangeDetectorRef,
  ) {

    const id = +this.route.snapshot.paramMap.get('id')!;
    this.heroService.getHero(id)
    .subscribe(hero =>{
      this.hero = hero
      this.cdr.detectChanges()
      });
  }
  
  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
