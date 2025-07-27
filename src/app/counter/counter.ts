import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',

  templateUrl: './counter.html',
  styleUrls: ['./counter.css'],
})
export class Counter  {
  counter: number;
  constructor() {
    this.counter = 0;
  }


  increase() {
    this.counter++;
  }

  decrease() {
    this.counter--;
  }
}
