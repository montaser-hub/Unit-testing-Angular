import { ChangeDetectionStrategy, Component} from '@angular/core';
import { MessageService } from '../../services/message/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.html',
  styleUrls: ['./messages.css'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class Messages  {
  
  /**@param messageService has a message string array*/
  
  constructor(public messageService: MessageService) {}

}