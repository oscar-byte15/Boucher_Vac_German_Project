import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../../services/user.service';
import {StorageService} from '../../../services/storage.service';
import {User} from '../../../models/user.model';

import {UpdateUserDialogComponent} from '../update-dialog/update-user-dialog/update-user-dialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public currentUser: User;

  // tslint:disable-next-line:max-line-length
  constructor( public dialog: MatDialog, public userService: UserService, public storageService: StorageService){}
  ngOnInit(): void {
    this.currentUser = this.storageService.getCurrentUser();
    this.getUserInformation();
  }
  getUserInformation(): void{
    this.userService.getUserById(this.storageService.getCurrentUser().id).subscribe();
  }
  updateDialog(): void{
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(res => {
      this.getUserInformation();
      this.storageService.loadSessionData();
      location.reload();
    });
  }
}
