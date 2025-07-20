import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit{
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router){}
  submitted: boolean = false;
  adminId: any;
  createNoteForm: FormGroup = new FormGroup({});
ngOnInit(): void {
    this.adminId = sessionStorage.getItem("adminId");
    this.createNoteForm = this.fb.group({
      'note': new FormControl('', [Validators.required, Validators.minLength(10)])
    });
}

message: string = "";
createNote(){
  this.submitted = true;
  if(this.createNoteForm.invalid){
    return;
  }
  this.auth.createNote(this.createNoteForm.value).subscribe(res=>{
    this.message = "Notes created successfully..! rediecting to dashboard..!";
    setTimeout(()=>{
      this.router.navigate(['/dashboard/' + this.adminId + "/home"]);
    }, 1000);
  });
}
}
