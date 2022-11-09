import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  count = 0;
  sub = new BehaviorSubject('');

  constructor() {
    this.sub
      .pipe(
        tap(msg => {
          switch (msg) {
            case 'add':
              this.count += 1;
              break;
            case 'error':
              throw new Date().valueOf();
            default:
              break;
          }
        }),
        finalize(() => {
          console.log('finalize');
        })
      )
      .subscribe(
        value => {
          console.log('next', value);
        },
        error => {
          console.log('error', error);
        },
        () => {
          console.log('complete');
        }
      );
  }

  add() {
    this.sub.next('add');
  }

  error() {
    this.sub.next('error');
  }

  complete() {
    this.sub.complete();
  }
}
