import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroService } from "../services/hero service/hero.service";
import { HeroesComponent } from "./heroes.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "../hero/hero.component";
import { Component, Input } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('heroes component class only', () => {
  let component:HeroesComponent,mockHeroService:jasmine.SpyObj<HeroService>
  let mockHeroes:Hero[]
  beforeEach(()=>{
    mockHeroes=[
      {id:1,name:"super man",strength:20},
      {id:2,name:"bat man",strength:12},
    ]
    mockHeroService= jasmine.createSpyObj(["deleteHero","addHero","getHeroes"])
    mockHeroService.getHeroes.and.returnValue( of(mockHeroes) )

    component= new HeroesComponent(mockHeroService)
  })
  it('after calling ngOninit should call getHeroes in service then set heroes array', () => {
    component.ngOnInit()


    expect(mockHeroService.getHeroes).toHaveBeenCalled()
    expect(component.heroes).toEqual(mockHeroes)
  });
});

 @Component({
  selector:"app-hero",
  template:"<div></div>"
}) class mockHeroComponent{
  @Input() hero!:Hero
}
describe('heroes component',()=>{
  let fixture:ComponentFixture<HeroesComponent>,component:HeroesComponent,mockHeroService:jasmine.SpyObj<HeroService>
  let mockHeroes:Hero[]
  beforeEach(()=>{
    mockHeroes=[
      {id:1,name:"super man",strength:20},
      {id:2,name:"bat man",strength:12},
    ]
    mockHeroService= jasmine.createSpyObj(["deleteHero","addHero","getHeroes"])
    mockHeroService.getHeroes.and.returnValue( of(mockHeroes) )

    TestBed.configureTestingModule({imports:[HeroesComponent,HeroComponent]})
    .overrideComponent(HeroesComponent,{set:{
      imports:[mockHeroComponent],
      providers:[
        {provide:HeroService,useValue:mockHeroService}
      ]
    }})

    fixture=TestBed.createComponent(HeroesComponent)
    component= fixture.componentInstance
  })

  it('after calling ngOninit should call getHeroes in service then set heroes array then template detect', () => {
    component.ngOnInit()


    expect(mockHeroService.getHeroes).toHaveBeenCalled()
    expect(component.heroes).toEqual(mockHeroes)

    fixture.detectChanges()
    //access li tags
   let liTags= fixture.debugElement.queryAll(By.css("li"))

   expect(liTags).toHaveSize(mockHeroes.length)

  //  children components
    let childrenComponent=fixture.debugElement.queryAll(By.directive(mockHeroComponent))
//
    expect(childrenComponent[0].componentInstance.hero.name).toBe(mockHeroes[0].name)

  });
})
