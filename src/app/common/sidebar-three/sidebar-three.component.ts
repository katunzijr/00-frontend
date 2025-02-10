import { Component } from '@angular/core';
import { NavigationStart, Router, Event as RouterEvent, RouterLink } from '@angular/router';
import { SidebarService } from '../../core/service/sidebar/sidebar.service';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';


@Component({
  selector: 'app-sidebar-three',
  standalone: true,
  imports: [
    CommonModule,
    NgScrollbarModule,
    RouterLink
  ],
  templateUrl: './sidebar-three.component.html',
  styleUrls: ['./sidebar-three.component.scss'],
})
export class SidebarThreeComponent {
  opendSubMenu: Array<string | number> = [];
  public activePath = '';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public sidebarData: Array<any> = [];
  constructor(private sidebar: SidebarService, private router: Router) {
    this.activePath = this.router.url.split('/')[1];
    this.router.events.subscribe((data: RouterEvent) => {
      if (data instanceof NavigationStart) {
        this.activePath = data.url.split('/')[1];
      }
      this.opendSubMenu[0] = ''
    });
    this.sidebarData = this.sidebar.sidebarData3;
  }

  showMenu(val: string): void {
    if (this.opendSubMenu[0] != val) {
      this.opendSubMenu[0] = val;
    } else {
      this.opendSubMenu[0] = '';
    }
  }

  showSubMenu(val: string): void {
    if (this.opendSubMenu[1] != val) {
      this.opendSubMenu[1] = val;
    } else {
      this.opendSubMenu[1] = '';
    }
  }
}
