import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message/message.service';


@Component({
  selector: 'app-messages-lab',
  templateUrl: './messages.lab.component.html',
  styleUrls: ['./messages.lab.component.css']
})
export class MessagesComponentForLab implements OnInit {
  
  /**@param messageService: has a message string array*/
  
  constructor(public messageService: MessageService) {}

  ngOnInit() {
  }

}
