import { ComponentFixture, TestBed } from "@angular/core/testing"
import { MessagesForLab } from "./messages.lab"
import { provideZonelessChangeDetection } from "@angular/core"
import { By } from "@angular/platform-browser"


describe("2-message component testing:", () => {
    let fixture: ComponentFixture<MessagesForLab>,component:MessagesForLab
   beforeEach(()=>{
    TestBed.configureTestingModule({
        imports:[MessagesForLab],
        providers:[provideZonelessChangeDetection()]
    })
    fixture= TestBed.createComponent(MessagesForLab)
    component=fixture.componentInstance
   })
     it('should create', () => {
    expect(component).toBeTruthy();
  });
    it("expect component template to be empty", () => {
        //Note: there is @if"messageService.messages.length" in line 1 in template
        fixture.detectChanges()
        let div=fixture.debugElement.query(By.css("container"))
        expect(div).toBeFalsy()
    })
    it("then expect div.msg to have the messages after setting it", () => {
        component.messageService.messages=[
            {id:10,message:"xx"},
            {id:110,message:"xxx"},
        ]
        fixture.detectChanges()
        let div=fixture.debugElement.queryAll(By.css(".msg"))
        expect(div).toHaveSize(2)
        expect(div[0].nativeElement.textContent).toBe("xx")
    })
})