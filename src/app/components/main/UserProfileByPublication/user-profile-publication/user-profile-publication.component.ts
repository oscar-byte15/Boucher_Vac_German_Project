import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../../../../models/user.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../../../../services/user.service';
import {StorageService} from '../../../../services/storage.service';



@Component({
  selector: 'app-user-profile-publication',
  templateUrl: './user-profile-publication.component.html',
  styleUrls: ['./user-profile-publication.component.css']
})
export class UserProfilePublicationComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  public user_publication: User;
  // tslint:disable-next-line:max-line-length
  constructor( public dialog: MatDialog, public userService: UserService, public storageService: StorageService,
               @Inject(MAT_DIALOG_DATA) public data){}
  ngOnInit(): void {
    this.getUserInformation();
  }
  getUserInformation(): void{
    this.userService.getUserById(this.data).subscribe(res => {
      this.user_publication = res;
      console.log(this.user_publication);
    });
  }
  onNoClick(): void{

  }
  updateDialog(): void{

  }

}
