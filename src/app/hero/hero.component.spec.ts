import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { By } from "@angular/platform-browser";

describe('hero component:', () => {
  let fixture:ComponentFixture<HeroComponent>,component:HeroComponent
  beforeEach(/* async */()=>{
    // 1
   /* await */ TestBed.configureTestingModule({imports:[HeroComponent]})/* .compileComponents() */

  //  2
    fixture= TestBed.createComponent(HeroComponent)
  //  3
   component= fixture.componentInstance
  })
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("after setting hero property template should detect",()=>{
    let mockHero={id:2,name:"super man",strength:30}

    component.hero=mockHero

    expect(component.hero.name).toBe(mockHero.name)
    fixture.detectChanges()
    //access template
      // 1-
      let div=fixture.nativeElement.querySelector("div")
      expect(div.textContent).toContain(mockHero.name)
      // 2-
     let span= fixture.debugElement.query( By.css(".badge") )
     expect(span.nativeElement.textContent).toContain(mockHero.id)
    
  })
});
