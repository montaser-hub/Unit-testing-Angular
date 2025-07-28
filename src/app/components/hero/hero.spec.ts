import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Hero } from "./hero";
import { provideZonelessChangeDetection } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('hero component:', () => {
  let component:Hero, fixture:ComponentFixture<Hero>
  beforeEach(/* async */()=>{
   //1
   /* await  */TestBed.configureTestingModule({
      imports:[Hero],
      providers:[
        provideZonelessChangeDetection()
      ]
    })/*.compileComponents()*/

    //2
   fixture= TestBed.createComponent(Hero)
  //3
     component= fixture.componentInstance
  })
  it('should create component', () => {
    expect(component).toBeDefined();
  });
  it("should render hero data in template",()=>{
    component.hero={ id:100, name:"super man",strength:30}

    fixture.detectChanges()
    //access template
    //1
    let span=fixture.nativeElement.querySelector(".badge")
    expect(span.textContent).toBe("100")
    //2
   let div= fixture.debugElement.query( By.css("div") )
   expect(div.nativeElement.textContent).toContain("super man")
  })
});
