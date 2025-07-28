import { ChangeDetectorRef, Component, Input, provideZonelessChangeDetection } from "@angular/core";
import { HeroService } from "../../services/hero-service/hero.service";
import { Heroes } from "./heroes";
import { of } from "rxjs";
import { Ihero } from "../../models/ihero";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Hero } from "../hero/hero";
import { By } from "@angular/platform-browser";

describe('heroes component class only', () => {
  let component:Heroes
  let mockHeroService:jasmine.SpyObj<HeroService>,mockCDR:jasmine.SpyObj<ChangeDetectorRef>
  let heroesDataMock: Ihero[]
  beforeEach(()=>{
    heroesDataMock=[
      {id:10,name:"super man",strength:20},
      {id:11,name:"bat man",strength:25},
    ]
    mockHeroService= jasmine.createSpyObj(["getHeroes","addHero","deleteHero"])
    mockHeroService.getHeroes.and.returnValue( of(heroesDataMock) )

    mockCDR= jasmine.createSpyObj(["detectChanges"])
    component= new Heroes(mockHeroService,mockCDR)

  })
  it('should set heroes data in heroes array', () => {
    component.ngOnInit()
    expect(mockHeroService.getHeroes).toHaveBeenCalled()
    
    expect(component.heroes).toHaveSize(heroesDataMock.length)
    expect(component.heroes[0].name).toBe(heroesDataMock[0].name)
  });
});

@Component({
  selector:"app-hero",
  template:"<div><div>"
})
class mockHeroComponent{
 @Input() hero!: Ihero;
}

describe('heroes component', () => {
  let component:Heroes
  let mockHeroService:jasmine.SpyObj<HeroService>,mockCDR:jasmine.SpyObj<ChangeDetectorRef>
  let heroesDataMock: Ihero[]
  let fixture: ComponentFixture<Heroes>
  beforeEach(()=>{
    heroesDataMock=[
      {id:10,name:"super man",strength:20},
      {id:11,name:"bat man",strength:25},
    ]
    mockHeroService= jasmine.createSpyObj(["getHeroes","addHero","deleteHero"])
    mockHeroService.getHeroes.and.returnValue( of(heroesDataMock) )

    mockCDR= jasmine.createSpyObj(["detectChanges"])
    
    TestBed.configureTestingModule({
      imports:[Heroes,Hero],
      providers:[
        provideZonelessChangeDetection()
      ]
    }).overrideComponent(Heroes,{
      set:{
        // imports:[mockHeroComponent],
        providers:[
          {provide:HeroService,useValue:mockHeroService}
        ]
      }
    })

   fixture= TestBed.createComponent(Heroes)
   component=fixture.componentInstance
  })
  it('should set heroes data in heroes array', () => {
    component.ngOnInit()
    expect(mockHeroService.getHeroes).toHaveBeenCalled()
    
    expect(component.heroes).toHaveSize(heroesDataMock.length)
    expect(component.heroes[0].name).toBe(heroesDataMock[0].name)
    
    //heroes data in template 
    let liTags=fixture.debugElement.queryAll(By.css("li"))
    expect(liTags).toHaveSize(2)

   let children= fixture.debugElement.queryAll(By.directive(Hero))
   expect(children).toHaveSize(2)

   //access child template
   for (let i = 0; i < children.length; i++) {    
     expect(children[i].nativeElement.querySelector("div").textContent).toContain(heroesDataMock[i].name)
   }
  });
});


