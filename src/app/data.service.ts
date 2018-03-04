import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//A service uses the @Injectable() decorator, which means we can import it into other components and access its properties and methods.
@Injectable()

export class DataService {

  //Declare a BehavioirSubject of any type to initialize the goals 
  //data variable
  private goals = new BehaviorSubject<any>(['The initial goal', 'Another silly life goal']);

  //Declare the observable goal this is the variable to be accessible 
  //from other components
  goal = this.goals.asObservable();

  constructor() { }

  changeGoal(goal) {
    this.goals.next(goal)
  }

}
