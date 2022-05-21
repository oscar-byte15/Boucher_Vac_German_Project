import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../../services/storage.service';

import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import {AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  userImage: any;
  userName: any;
  userType: any;
  constructor(private router: Router, private storageService: StorageService, private observer: BreakpointObserver) { }
  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }
  ngOnInit(): void {
    console.log(this.storageService.getCurrentUser().name);
    this.userName = this.storageService.getCurrentUser().name;
    this.userImage = this.storageService.getCurrentUser().image;
    this.userType = this.storageService.getCurrentUser().type;
  }
  closeSession(): void{
    this.router.navigate(['login']);
  }
  getUser(): any {
    return this.storageService.getCurrentUser();
  }
  getRouter(): any {
    return this.router;
  }

  seeData(): void{
    this.router.navigate(['main']);
  }

  seeMyUserProfile(): void{
  this.router.navigate(['user-profile']);
  }

}
