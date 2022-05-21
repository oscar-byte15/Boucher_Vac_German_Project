import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {StorageService} from '../../../../services/storage.service';
import {User} from '../../../../models/user.model';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.css']
})
export class UpdateUserDialogComponent implements OnInit {

  UserProfileForm: any;
  currentUser: any;
  public userModel: User = new User();
  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
              public storageService: StorageService,
              public userService: UserService
              ) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getCurrentUser();
    this.UserProfileForm = this.formBuilder.group({
      Email: ['', Validators.required],
      City: ['', Validators.required],
      District: ['', Validators.required],
      Dni: ['', Validators.required],
      Phone: ['', Validators.required],
      Name: ['', Validators.required],
      LastName: ['', Validators.required]
    });
    this.UserProfileForm.controls['Email'.toString()].setValue(this.storageService.getCurrentUser().email);
    this.UserProfileForm.controls['City'.toString()].setValue(this.storageService.getCurrentUser().city);
    this.UserProfileForm.controls['District'.toString()].setValue(this.storageService.getCurrentUser().district);
    this.UserProfileForm.controls['Dni'.toString()].setValue(this.storageService.getCurrentUser().dni);
    this.UserProfileForm.controls['Phone'.toString()].setValue(this.storageService.getCurrentUser().phone);
    this.UserProfileForm.controls['Name'.toString()].setValue(this.storageService.getCurrentUser().name);
    this.UserProfileForm.controls['LastName'.toString()].setValue(this.storageService.getCurrentUser().lastname);
  }
  onNoClick(): void{
    this.dialogRef.close();


  }
  updatePublication(): void{
  this.userModel.id = this.storageService.getCurrentUser().id;
  this.userModel.user = this.storageService.getCurrentUser().user;
  this.userModel.password = this.storageService.getCurrentUser().password;
  this.userModel.email = this.UserProfileForm.value.Email;
  this.userModel.dni = this.UserProfileForm.value.Dni;
  this.userModel.name = this.UserProfileForm.value.Name;
  this.userModel.lastname = this.UserProfileForm.value.LastName;
  this.userModel.phone = this.UserProfileForm.value.Phone;
  this.userModel.city = this.UserProfileForm.value.City;
  this.userModel.district = this.UserProfileForm.value.District;
  this.userService.updateUserById(this.userModel.id, this.userModel).subscribe();
  alert('User ' + this.userModel.id + ' has been updated');

  }

}
