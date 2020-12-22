import { Component, OnInit } from "@angular/core";
import { UserService } from "../service/user.service";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {


 
   
   changeListener(event) {
    
     var file = event.target.files[0];
     var reader = new FileReader();
     reader.onloadend = function() {
       console.log('RESULT', reader.result)
        var  files = reader.result;
     }
     reader.readAsDataURL(file);

 }
    

    registerForm = new FormGroup({
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    file: new FormControl("", [Validators.required])
    });

  constructor(private userService: UserService, private router: Router) {}


    ngOnInit() {}

    userRegister() {

   
    let file = (<HTMLInputElement>document.getElementById('myfileinput')).files[0];
     let base64;
     console.log(file)
      debugger;
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => {
         console.log(reader.result);
           base64 = reader.result;
      // alert(base64);
    
       
       debugger;
      //formData.append('email', this.registerForm.value.email);
      // formData.append('username', this.registerForm.value.username);
      // formData.append('password', this.registerForm.value.password);
      // console.log(formData)
       this.registerForm.value.file = base64;
       alert(  this.registerForm.value.file)
    
       if (this.registerForm.valid) {
        this.userService.register(  this.registerForm.value ).subscribe(res => {
          this.registerForm.reset();
          debugger;
        
          this.router.navigate(["user/login"]);
        });
      }
    }
    
      };


   
}
