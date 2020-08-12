import { Component, OnDestroy, OnInit } from '@angular/core';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { ToastrService } from '../../core/services/toastr.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Toastr, ToastrType } from '../../core/models/toastr';

@Component({
  selector: 'job-hub-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss'],
  animations: [
    trigger('fly_toastr', [
      state('show', style({transform: 'translateY(0)'})),
      transition('void => *', [
        animate(400, keyframes([
          style({opacity: 0, transform: 'translateY(60px)', offset: 0}),
          style({opacity: 1, transform: 'translateY(-15px)', offset: 0.3}),
          style({opacity: 1, transform: 'translateY(0)', offset: 1.0})
        ]))
      ]),
      transition('* => void', [
        animate(400, keyframes([
          style({opacity: 1, transform: 'translateY(0)', offset: 0}),
          style({opacity: 1, transform: 'translateY(15px)', offset: 0.7}),
          style({opacity: 0, transform: 'translateY(-60px)', offset: 1.0})
        ]))
      ])
    ])
  ]
})
export class ToastrComponent implements OnInit, OnDestroy {

  toastrs: Toastr[] = [];

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.toastr.sendToastr$.asObservable().pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(toastr => {
      this.toastrs.push(toastr);
      setTimeout(() => {
        this.toastrs.splice(0, 1);
      }, 6000);
    });

  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  close(toastr: Toastr, index) {
    this.toastrs.splice(index, 1);
  }

}
