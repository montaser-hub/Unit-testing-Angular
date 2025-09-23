import { ChangeDetectorRef } from "@angular/core";
import { Heroes } from "./heroes";
import { HeroService } from "../../services/hero-service/hero.service";
import { Hero } from "../hero/hero";
import { Ihero } from "../../models/ihero";
import { of } from "rxjs";
import { TestBed } from "@angular/core/testing";

describe('heroes component', () => {
  let mockCDRService:jasmine.SpyObj<ChangeDetectorRef>,mockHeroService:jasmine.SpyObj<HeroService>,component:Heroes
  let heroes:Ihero[]
  beforeEach(()=>{
    heroes=[
      {id:100,name:"super man",strength:20},
      {id:102,name:"bat man",strength:15}
    ]
      mockHeroService= jasmine.createSpyObj(["getHeroes","addHero","deleteHero"])
      mockHeroService.getHeroes.and.returnValue( of(heroes) )

       mockCDRService= jasmine.createSpyObj(["detectChanges"])

    component= new Heroes(mockHeroService,mockCDRService)
  })
    it('ngOninit set heroes', () => {

     component.ngOnInit()

     expect(mockHeroService.getHeroes).toHaveBeenCalled()
      expect(component.heroes).toEqual(heroes)

  });
});


