import {Component, OnInit } from '@angular/core';
import {Validators, FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { Session } from '../../models/session.model';
import { ErrorStateMatcher } from '@angular/material/core';
import {User} from '../../models/user.model';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public matcher = new MyErrorStateMatcher();
  public signupForm: FormGroup;
  public submitted: Boolean = false;
  public type_user: string;
  public user: User = new User();
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthService,
              private router: Router,
              ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      type: ['', [Validators.required]],
      district: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.pattern('[0-9]{8}$')]],
      phone: ['', [Validators.pattern("^[0-9\-\+]{9,15}$")]],
      city: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
    //this.signupForm.controls['ruc'].disable()
  }

  onSubmit(): void {
    this.submitted = true;
    console.log("click signup");
    console.log(this.signupForm.value);

    this.user.email = this.signupForm.value.email;
      this.user.name = this.signupForm.value.name;
      this.user.lastname = this.signupForm.value.lastname;
      this.user.password = this.signupForm.value.password;
      this.user.type = this.type_user;
      this.user.city = this.signupForm.value.city;
      this.user.dni = this.signupForm.value.dni;
      this.user.phone = this.signupForm.value.phone;
      this.user.district = this.signupForm.value.district;
      this.user.image = this.signupForm.value.image;
      this.authenticationService.signup(this.user).subscribe(
        data => this.correctSignup(data)
      );

  }
  getTypeUer(typeUser: string){
   this.type_user = typeUser;
   }
  private correctSignup(data: Session){
    console.log("signup right");
    console.log(data);
    this.router.navigate(['login']);
  }
}
