import { of } from "rxjs";
import { Ihero } from "../ihero";
import { HeroService } from "../services/hero-service/hero.service";
import { Heroes } from "./heroes";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Hero } from "../hero/hero";
import { ChangeDetectorRef, Component, Input, provideZonelessChangeDetection } from "@angular/core";
import { By } from "@angular/platform-browser";
import { provideHttpClient } from "@angular/common/http";

describe('heroes component class only', () => {
  let component:Heroes,mockHeroService:jasmine.SpyObj<HeroService>
  let mockCH:jasmine.SpyObj<ChangeDetectorRef>
  let mockHeroes:Ihero[]
  beforeEach(()=>{
    mockCH=jasmine.createSpyObj(["detectChanges"])
    mockHeroes=[
      {id:1,name:"super man",strength:20},
      {id:2,name:"bat man",strength:12},
    ]
    mockHeroService= jasmine.createSpyObj(["deleteHero","addHero","getHeroes"])
    mockHeroService.getHeroes.and.returnValue( of(mockHeroes) )

    component= new Heroes(mockHeroService,mockCH)
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
  let fixture:ComponentFixture<Heroes>,component:Heroes,mockHeroService:jasmine.SpyObj<HeroService>
  let mockHeroes:Ihero[]
  beforeEach(()=>{
    mockHeroes=[
      {id:1,name:"super man",strength:20},
      {id:2,name:"bat man",strength:12},
    ]
    mockHeroService= jasmine.createSpyObj(["deleteHero","addHero","getHeroes"])
    mockHeroService.getHeroes.and.returnValue( of(mockHeroes) )

    TestBed.configureTestingModule({imports:[Heroes,Hero],
        providers:[provideZonelessChangeDetection()]
    })
    .overrideComponent(Heroes,{set:{//
    //   imports:[mockHeroComponent],
      providers:[
        {provide:HeroService,useValue:mockHeroService}
      ]
    }})

    fixture=TestBed.createComponent(Heroes)
    component= fixture.componentInstance
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('after calling ngOninit should call getHeroes in service then set heroes array then template detect', () => {
      
    component.ngOnInit()

    expect(mockHeroService.getHeroes).toHaveBeenCalled()
    expect(component.heroes).toEqual(mockHeroes)

    fixture.detectChanges()//no need (there is cdr.detectChanges() in onInit()) but put it any way
//     //access li tags
   let liTags= fixture.debugElement.queryAll(By.css("li"))

   expect(liTags).toHaveSize(mockHeroes.length)

//   //  children components
    let childrenComponent=fixture.debugElement.queryAll(By.directive(Hero))
// // //
    expect(childrenComponent[0].componentInstance.hero.name).toBe(mockHeroes[0].name)

  });
})
