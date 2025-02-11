import { Component } from '@angular/core';
import { SpinnerService } from '../../core/service/spinner/spinner.service';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  constructor(public spinner: SpinnerService) {}

  get loading$() {
    return this.spinner.loading$;
  }
}
