import { Component, Input} from '@angular/core';
import { Ihero } from '../../models/ihero';

@Component({
  selector: 'app-hero',  
  templateUrl: './hero.html',
  styleUrls:  ['./hero.css']
})
export class Hero {
  @Input() hero!: Ihero;

}
