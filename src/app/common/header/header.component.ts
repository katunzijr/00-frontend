import { Component, inject, OnInit, } from '@angular/core';
import { NavigationStart, Router, Event as RouterEvent, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../core/service/common/common.service';
import { SidebarService } from '../../core/service/sidebar/sidebar.service';
import { AuthService } from '../../auth/auth.service';
import { AuthenticatedUser } from '../../auth/auth.interface';
import { BusinessService } from '../../panel/business/business.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalBusinessesInterface } from '../../panel/business/business.interface';
import { BusinessRoutes } from '../../panel/business/business.routes';

// const icons = {
//   User,
//   Settings
// };

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    // FeatherModule.pick(icons),
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit{
  activePath = '';
  showSearch = false;
  public changeLayout = '1';
  public darkTheme = false;
  public logoPath = '';
  public miniSidebar = false;
  private elem!: HTMLElement;
  public addClass = false;
  base = '';
  page = '';
  last = '';

  private readonly router = inject(Router);
  authService = inject(AuthService);
  businessService = inject(BusinessService);
  user: AuthenticatedUser | null = null;
  businessList: LocalBusinessesInterface[] = [];
  public businessRoutes = BusinessRoutes;
  currentBusiness: LocalBusinessesInterface | null = null;

  constructor(
    private Router: Router,
    private common: CommonService,
    private sidebar: SidebarService,
  ) {

    this.elem = document.documentElement;
    this.activePath = this.Router.url.split('/')[2];
    this.Router.events.subscribe((data: RouterEvent) => {
      if (data instanceof NavigationStart) {
        this.activePath = data.url.split('/')[2];
      }
    });
    this.sidebar.sideBarPosition.subscribe((res: string) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    this.common.base.subscribe((base: string) => {
      this.base = base;
    });
    this.common.page.subscribe((page: string) => {
      this.page = page;
    });
    this.common.last.subscribe((last: string) => {
      this.last = last;
    });

    this.user = this.authService.currentUser();
  }

  public toggleSidebar(): void {
    this.sidebar.switchSideMenuPosition();
  }

  public togglesMobileSideBar(): void {
    this.sidebar.switchMobileSideBarPosition();
  }

  public miniSideBarMouseHover(position: string): void {
    if (position == 'over') {
      this.sidebar.expandSideBar.next(true);
    } else {
      this.sidebar.expandSideBar.next(false);
    }
  }

  fullscreen() {
    if (!document.fullscreenElement) {
      this.elem.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  ngOnInit(): void {
    this.businessList = this.businessService.loadBusinessesLocally()
    this.currentBusiness = this.businessList.length > 0 ? this.businessList[0] : null;
  }

}
