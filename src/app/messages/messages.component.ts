import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  
  /**@param messageService has a message string array*/
  
  constructor(public messageService: MessageService) {}

  ngOnInit() {
  }

}
