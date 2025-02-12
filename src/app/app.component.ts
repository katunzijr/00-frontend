import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, Event as RouterEvent, RouterOutlet } from '@angular/router';
import { LoaderComponent } from './common/loader/loader.component';
import { SpinnerService } from './core/service/spinner/spinner.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Eyes On Digits';
  public page = 'Panel';

  // sleep = (delay: number | undefined) => new Promise((resolve) => setTimeout(resolve,delay))
  constructor(private router: Router, private spinner: SpinnerService) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        const URL = event.url.split('/');
        this.page = URL[1];
        this.spinner.show();
        // await this.sleep(3000)
      }
      if (event instanceof NavigationEnd) {
        this.spinner.hide();
      }
    });

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.spinner.show();
      }
      if (event instanceof NavigationEnd) {
        this.spinner.hide();
      }
    });
  }
}
