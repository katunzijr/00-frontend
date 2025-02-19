import { CommonModule } from '@angular/common';
import { Component, inject, Renderer2, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router, Event as RouterEvent, NavigationStart, NavigationEnd } from '@angular/router';
import { BehaviorSubject, firstValueFrom, lastValueFrom } from 'rxjs';
import { SettingsService } from '../core/service/settings/settings.service';
import { SidebarService } from '../core/service/sidebar/sidebar.service';
import { CommonService } from '../core/service/common/common.service';
import { url } from '../shared/model/sidebar.model';
import { SidebarOneComponent } from '../common/sidebar-one/sidebar-one.component';
import { HeaderComponent } from '../common/header/header.component';
import { LayoutComponent } from '../common/layout/layout.component';
import { BusinessComponent } from './business/business.component';
import { BusinessService } from './business/business.service';
import { LocalBusinessesInterface } from './business/business.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    HeaderComponent,
    SidebarOneComponent,
    LayoutComponent
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  public miniSidebar = false;
  public expandMenu = false;
  public mobileSidebar = false;
  public sideBaractivePath = false;
  public themeMode: string = '';
  public layoutMode: string = '';
  public navigationColor: string = '';
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this._loading.asObservable();

  base = '';
  page = '';
  last = '';

  // businessService = inject(BusinessService);

  constructor(
    private Router: Router,
    private settings: SettingsService,
    private sidebar: SidebarService,
    private common: CommonService,
    private renderer: Renderer2
  ) {
    this.sidebar.toggleMobileSideBar.subscribe((res: string) => {
      if (res == 'true' || res == 'true') {
        this.mobileSidebar = true;
      } else {
        this.mobileSidebar = false;
      }
    });
    this.sidebar.expandSideBar.subscribe((res: boolean) => {
      this.expandMenu = res;
    });
    this.Router.events.subscribe((data: RouterEvent) => {
        if (data instanceof NavigationStart) {
          this.getRoutes(data);
        }
        if (data instanceof NavigationEnd) {
          localStorage.removeItem('isMobileSidebar');
          this.mobileSidebar = false;
        }
        if (this.page === 'pos') {
          localStorage.removeItem('sideBarPosition');
        }
    });
    this.sidebar.sideBarPosition.subscribe((res: string) => {
      if (res == 'true' && this.page !== 'pos') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    this.settings.themeMode.subscribe((mode) => {
      this.themeMode = mode;
    });
    this.settings.layoutMode.subscribe((layout) => {
      this.layoutMode = layout;
    });
    this.settings.navigationColor.subscribe((color) => {
      this.navigationColor = color;
    });
    this.settings.themeMode.subscribe((res: string) => {
      if (res === 'dark_mode') {
        this.renderer.addClass(document.body, 'dark-select');
      } else {
        this.renderer.removeClass(document.body, 'dark-select');
      }
    });
    this.getRoutes(this.Router);
  }
  private getRoutes(data: url): void {
    const splitVal = data.url.split('/');
    this.base = splitVal[1];
    this.page = splitVal[2];
    this.last = splitVal[3];
    this.common.base.next(splitVal[1]);
    this.common.page.next(splitVal[2]);
    this.common.last.next(splitVal[3]);
    if (
      data.url.split('/')[1] === 'errorpages' ||
      data.url.split('/')[2] === 'pos' ||
      data.url.split('/')[1] === 'auth'
    ) {
      this.sideBaractivePath = true;
    } else {
      this.sideBaractivePath = false;
    }
    if (data.url.split('/')[2] === 'pos') {
      this.sideBaractivePath = true;
    }
    if (this.page === 'pos') {
      this.miniSidebar = false;
    }
  }

  isCollapsed: boolean = false;

  async ngOnInit(): Promise<void> {

    this.sidebar.collapse$.subscribe((collapse: boolean) => {
      this.isCollapsed = collapse;
    });

  }

  showLoader() {
    this._loading.next(true);
  }

  hideLoader() {
    setTimeout(() => {
      this._loading.next(false);
      window.scrollTo(0, 0);
    }, 1200);
  }
}
