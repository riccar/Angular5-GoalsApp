import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [

    trigger('goalsAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([ //during the .6s ease-in animation, execute the following 3 keyframes
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}), //it will come from the top since translateY is negative. Offset is the starting position [0-1]
            style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}), //To bouce a 35px down from its original position
            style({opacity: 1, transform: 'translateY(0)', offset: 1.0}), //The htnml element is finally located in its right position on the Y axis
          ]))]), {optional: true}),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([ //during the .6s ease-in animation, execute the following 3 keyframes
            style({opacity: 1, transform: 'translateY(0)', offset: 0}), //it will come from the top since translateY is negative. Offset is the starting position
            style({opacity: .5, transform: 'translateY(35px)', offset: 0.3}), //To bouce a 35px down from its original position
            style({opacity: 0, transform: 'translateY(-75%)', offset: 1.0}), //The htnml element is finally located in its right position on the Y axis
          ]))]), {optional: true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add an item';
  goalText: string = 'My first life goal';
  //Declare goals as an array to hold all the goals added by the user
  goals = [];

  constructor(private _data: DataService) { }

  //The following funtion runs when the component is loaded
  //Use it to initialize variables
  ngOnInit() {
    this.itemCount = this.goals.length;
    this._data.goal.subscribe(res => this.goals = res);
    this._data.changeGoal(this.goals);
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

  removeItem(i) {
    //splice adds or remove items within an array.
    //the first parameter is the index of the item to be removed
    //the second is how many items will be affected
    //the third are the items to be added. If nothing is provided the item on the position i is removed. 
    this.goals.splice(i , 1);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
  }

}
