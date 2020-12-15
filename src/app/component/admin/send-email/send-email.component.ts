import { Component, OnInit } from '@angular/core';
import {EmailService} from "../../../service/email.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {
  listEmail=[""];
  listEmailValue=[];
  loading =false;

  constructor(private dialogRef: MatDialogRef<SendEmailComponent>,private emailService: EmailService) { }

  ngOnInit() {
  }

  addValue(value: string, i: number){
   this.listEmailValue[i]= value;
  }

  deleteEmail(i: number) {
    this.listEmail.splice(i,1);
    this.listEmailValue.splice(i,1);
  }

  submitEmail() {
    this.loading =true;
    this.emailService.sendEmail(this.listEmailValue).subscribe(data=> {
      this.dialogRef.close(true);
      this.loading = false;
    }, error => {
      this.dialogRef.close(false);
      this.loading = false;
    })
  }

  addEmail() {
    this.listEmail.push("");
  }

  closeModal() {
    this.dialogRef.close(undefined);
  }
}
