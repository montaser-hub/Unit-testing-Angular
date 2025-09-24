import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Hero } from "./hero";
import { provideZonelessChangeDetection } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('hero component:', () => {
  /* while we work in test environment so we need to simulate that actual happenes during runtime so */
  let component:Hero, fixture:ComponentFixture<Hero>
  beforeEach(/* async */()=>{
    //1 use  testbed configure module to provide the dependencies for this component
   /* await */ TestBed.configureTestingModule({
      imports:[Hero],//components
      providers:[
        provideZonelessChangeDetection()// regarding angular changes to avoid use zone
      ]
    })/* .compileComponents() */ //used in case we need to run test with another way instead of ng test
    //2 create component to simulate actual runtime instance creation (standard name is fixture)
     fixture=TestBed.createComponent(Hero)
    //3 get component instance properties and methods
    component= fixture.componentInstance

  })
   it('should create', () => {
    expect(component).toBeTruthy();
  });
    it('after setting hero , should render in template', () => {
      component.hero={ id : 100, name: "bat man",strength:20}

      fixture.detectChanges()// to track template changes
      //1 way
     let span= fixture.debugElement.query( By.css(".badge") )
     expect(span.nativeElement.textContent).toBe("100")

     //2 way
     let div=fixture.nativeElement.querySelector("div")
     expect(div.textContent).toContain("bat man")
  });
});
