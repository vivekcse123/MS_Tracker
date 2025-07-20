import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrl: './user-notes.component.css'
})
export class UserNotesComponent implements OnInit{
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}
    submitted: boolean = false;
    userId: any;
    createNoteForm: FormGroup = new FormGroup({});
  ngOnInit(): void {
      this.userId = sessionStorage.getItem("userId");
      this.createNoteForm = this.fb.group({
        'userid': new FormControl(this.userId),
        'note': new FormControl('', [Validators.required, Validators.minLength(10)])
      });
  }
  
  message: string = "";
  createNote(){
    this.submitted = true;
    if(this.createNoteForm.invalid){
      return;
    }
    this.auth.createUserNote(this.createNoteForm.value).subscribe(res=>{
      this.message = "Notes created successfully..! rediecting to home page..!";
      setTimeout(()=>{
        this.router.navigate(['/user/' + this.userId + "/home"]);
      }, 1000);
    });
  }
}
