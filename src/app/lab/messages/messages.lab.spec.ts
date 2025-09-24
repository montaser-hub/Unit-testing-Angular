import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesForLab } from './messages.lab';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MessageService } from '../../services/message/message.service';
describe('2-message component testing:', () => {
  let component: MessagesForLab, fixture: ComponentFixture<MessagesForLab>;
  beforeEach(() => {
    //1
    TestBed.configureTestingModule({
      imports: [MessagesForLab], //component that we want to test
      providers: [
        {
          provide: MessageService,
          useValue: {
            messages: [],
            add: (msg: string) => {},
            clear: () => {},
          },
        },
        provideZonelessChangeDetection(),
      ],
    });
    //2 to create component instance
    fixture = TestBed.createComponent(MessagesForLab);
    //3 to access component instance properties
    component = fixture.componentInstance;
  });

  it('expect component template to be empty', () => {
    //Note: there is @if"messageService.messages.length" in line 1 in template
    const container = fixture.nativeElement.querySelector('#container');
    expect(container).toBeNull();
  });
  it('then expect div.msg to have the messages after setting it', () => {
    component.messageService.messages = [{ id: 1, message: 'msg 1' }];
    fixture.detectChanges();
    const msg1 = fixture.nativeElement.querySelector('.msg');
    expect(msg1.textContent).toContain('msg 1');
  });
});
