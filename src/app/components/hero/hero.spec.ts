import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Hero } from "./hero";
import { provideZonelessChangeDetection } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('hero component:', () => {
  let component:Hero, fixture:ComponentFixture<Hero>
  beforeEach(/* async */()=>{
    //1
   /* await */ TestBed.configureTestingModule({
      imports:[Hero],
      providers:[
        provideZonelessChangeDetection()

      ]
    })/* .compileComponents() */
    //2
     fixture=TestBed.createComponent(Hero)
    //3
    component= fixture.componentInstance
    
  })
   it('should create', () => {
    expect(component).toBeTruthy();
  });
    it('after setting hero , should render in template', () => {
      component.hero={ id : 100, name: "bat man",strength:20}

      fixture.detectChanges()
      //1 way
     let span= fixture.debugElement.query( By.css(".badge") )
     expect(span.nativeElement.textContent).toBe("100")

     //2 way
     let div=fixture.nativeElement.querySelector("div")
     expect(div.textContent).toContain("bat man")
  });
});
