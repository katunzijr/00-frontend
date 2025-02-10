import { Component } from '@angular/core';

import { NavigationEnd, Router, Event as RouterEvent, RouterLink } from '@angular/router';
import { url } from '../../shared/model/sidebar.model';
import { SidebarService } from '../../core/service/sidebar/sidebar.service';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';

interface MenuItem {
  menuValue: string;
  showSubRoute: boolean;
  menu: SubMenu[];
}

interface SubMenu {
  menuValue: string;
  showSubRoute: boolean;
}


@Component({
  selector: 'app-sidebar-one',
  standalone: true,
  imports: [
    CommonModule,
    NgScrollbarModule,
    RouterLink
  ],
  templateUrl: './sidebar-one.component.html',
  styleUrls: ['./sidebar-one.component.scss'],
})
export class SidebarOneComponent {

  base = '';
  page = '';
  currentUrl = '';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public side_bar_data: Array<any> = [];

  constructor(
    // private Router: Router,
    private sidebar: SidebarService,
    private router: Router
  ) {
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.getRoutes(event);
      }
    });
    this.getRoutes(this.router);
    this.side_bar_data = this.sidebar.sidebarData1;
  }

  private getRoutes(route: url): void {
    const splitVal = route.url.split('/');
    this.currentUrl = route.url;
    this.base = splitVal[1];
    this.page = splitVal[2];
  }

  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sidebar.expandSideBar.next(true);
    } else {
      this.sidebar.expandSideBar.next(false);
    }
  }

  expandSubMenus(menu: MenuItem): void {
    sessionStorage.setItem('menuValue', menu.menuValue);
    this.side_bar_data.forEach((mainMenus: MenuItem) => {
      mainMenus.menu.forEach((resMenu: SubMenu) => {
        if (resMenu.menuValue === menu.menuValue) {
          menu.showSubRoute = !menu.showSubRoute;
        } else {
          resMenu.showSubRoute = false;
        }
      });
    });
  }

  openMenuItem: MenuItem | null = null;
  openSubmenuOneItem: SubMenu[] | null = null;
  multiLevel1 = false;
  multiLevel2 = false;
  multiLevel3 = false;

  openMenu(menu: MenuItem): void {
    if (this.openMenuItem === menu) {
      this.openMenuItem = null;
    } else {
      this.openMenuItem = menu;
    }
  }

  openSubmenuOne(subMenus: SubMenu[]): void {
    if (this.openSubmenuOneItem === subMenus) {
      this.openSubmenuOneItem = null;
    } else {
      this.openSubmenuOneItem = subMenus;
    }
  }

  multiLevelOne() {
    this.multiLevel1 = !this.multiLevel1;
  }
  multiLevelTwo() {
    this.multiLevel2 = !this.multiLevel2;
  }
  multiLevelThree() {
    this.multiLevel3 = !this.multiLevel3;
  }
}
