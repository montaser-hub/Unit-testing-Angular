import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Counter } from "./counter";
import { provideZonelessChangeDetection } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('counter component: ', () => {
  let component:Counter, fixture:ComponentFixture<Counter>
  beforeEach(()=>{
    //1
    TestBed.configureTestingModule({
      imports:[Counter],
      providers:[
        provideZonelessChangeDetection()
      ]
    })
    //2
    fixture=TestBed.createComponent(Counter)
    //3
    component=fixture.componentInstance
  })
    it('counter=0 should render in template', () => {
    
      fixture.detectChanges()
      let p= fixture.nativeElement.querySelector("p")
      expect(p.textContent).toContain(0)
  });
  it("after clicking btn + should counter++ and in template",()=>{
    //access btn
    let btn= fixture.debugElement.query( By.css("#inc") )
    //fire click
    btn.triggerEventHandler("click")
    btn.triggerEventHandler("click")
    btn.triggerEventHandler("click")
    //assert counter+
    expect(component.counter).toBe(3)
    //assert in template
    fixture.detectChanges()
    let p= fixture.nativeElement.querySelector("p")
      expect(p.textContent).toContain(3)
  })
});
