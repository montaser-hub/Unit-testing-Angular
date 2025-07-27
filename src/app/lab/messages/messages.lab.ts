import { Component} from '@angular/core';
import { MessageService } from '../../services/message/message.service';


@Component({
  selector: 'app-messages-lab',
  templateUrl: './messages.lab.html',
  styleUrls: ['./messages.lab.css']
})
export class MessagesForLab {
  
  /**@param messageService: has a message string array*/
  
  constructor(public messageService: MessageService) {}


}
