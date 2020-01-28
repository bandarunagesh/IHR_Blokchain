import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export let ROUTES: RouteInfo[];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor(private router: Router) { }

    ngOnInit() {
        if (sessionStorage.getItem('usertype') == 'member') {
            ROUTES = [
                { path: '/user/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
                // { path: '/user/user-profile', title: 'User Profile', icon: 'person', class: '' },
                { path: '/user/table-list', title: 'Medical Records', icon: 'content_paste', class: '' },
                // { path: '/user/typography', title: 'History', icon: 'library_books', class: '' },
                { path: '/user/maps', title: 'Nearest Providers', icon: 'location_on', class: '' },
                // { path: '/user/notifications', title: 'Notifications', icon: 'notifications', class: '' },
                // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
            ];
        }
        else if (sessionStorage.getItem('usertype') == 'provider') {
            ROUTES = [
                { path: '/pro/prodashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
                // { path: '/pro/prouser-profile', title: 'User Profile', icon: 'person', class: '' },
                { path: '/pro/protable-list', title: 'Medical Records', icon: 'content_paste', class: '' },
                // { path: '/pro/typography', title: 'History', icon: 'library_books', class: '' },
                // { path: '/pro/pronotifications', title: 'Notifications', icon: 'notifications', class: '' },
                // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
            ];
        }
        else {
            ROUTES = [];
        }
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    logout() {
        sessionStorage.clear();
        this.router.navigate(['/login']);
    }
}
