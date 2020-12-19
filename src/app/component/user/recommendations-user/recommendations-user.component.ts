import {Component, Inject, OnInit} from '@angular/core';
import {ViewRecommendationRecordComponent} from "../view-recommendation-record/view-recommendation-record.component";
import {RecommendService} from "../../../service/recommend.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-recommendations-user',
  templateUrl: './recommendations-user.component.html',
  styleUrls: ['./recommendations-user.component.css']
})
export class RecommendationsUserComponent implements OnInit {
  loading = false;
  email = "";
  formRecommendations: FormGroup;
  listReply = ["Không biết", "Có nghe qua", "Đã xem qua", "Thực hành cơ bản", "Thực hành nâng cao", "Pro"];
  listLanguage = ["java", "html", "css", "sqlServer", "mySql", "javaScript", "python", "cplus", "c", "net", "php", "swift",
    "rubyOnRails", "typeScript", "angular", "go", "shell", "mongoDB", "perl", "groovy", "crystal", "kotlin", "mathLab", "assembly"];
  listResult = [0, 1, 2, 3, 4, 5];

  constructor(private recommendService: RecommendService, private dialog: MatDialog, private snackBar: MatSnackBar,
              private route: ActivatedRoute, private fb: FormBuilder) {
    this.email = this.route.snapshot.params['email'];
  }

  ngOnInit() {
    this.createFormRecommend();
  }

  createFormRecommend() {
    this.formRecommendations = this.fb.group({
      emailAddress: new FormControl(this.email, Validators.compose([
        Validators.required,
      ])),
      java: new FormControl("0", Validators.compose([
        Validators.required,
      ])),
      html: new FormControl("0", Validators.compose([
        Validators.required
      ])),
      css: new FormControl("0", Validators.compose([
        Validators.required
      ])),
      sqlServer: new FormControl("0", Validators.compose([
        Validators.required
      ])),
      mySql: new FormControl("0", Validators.compose([
        Validators.required,
      ])),
      javaScript: new FormControl("0", Validators.compose([
        Validators.required
      ])),
      python: new FormControl("0", Validators.compose([
        Validators.required,
      ])),
      cplus: new FormControl("0", Validators.compose([
        Validators.required,
      ])),
      c: new FormControl("0", Validators.compose([
        Validators.required,
      ])),
      net: new FormControl("0", Validators.compose([
        Validators.required
      ])),
      php: new FormControl("0", Validators.compose([
        Validators.required
      ])),
      swift: new FormControl("0", Validators.compose([
        Validators.required
      ])),
      rubyOnRails: new FormControl("0", Validators.compose([
        Validators.required,
      ])),
      typeScript: new FormControl("0", Validators.compose([
        Validators.required
      ])),
      angular: new FormControl("0", Validators.compose([
        Validators.required,
      ])),
      go: new FormControl("0", Validators.compose([
        Validators.required,
      ])),
      shell: new FormControl("0", Validators.compose([
        Validators.required,
      ])),
      mongoDB: new FormControl("0", Validators.compose([
        Validators.required,
      ])),
      perl: new FormControl("0", Validators.compose([
        Validators.required
      ])),
      groovy: new FormControl("0", Validators.compose([
        Validators.required
      ])),
      crystal: new FormControl("0", Validators.compose([
        Validators.required
      ])),
      kotlin: new FormControl("0", Validators.compose([
        Validators.required,
      ])),
      mathLab: new FormControl("0", Validators.compose([
        Validators.required
      ])),
      assembly: new FormControl("0", Validators.compose([
        Validators.required,
      ])),
      timestamp: new FormControl("", Validators.compose([
        ]))
    })
  }


  onSubmitRecommendations() {
    this.loading = true;
    this.formRecommendations.value.timestamp = new Date().toLocaleString();
    if(this.formRecommendations.valid) {
      this.recommendService.recommendations(this.formRecommendations.value).subscribe(data => {
        const dialogRef = this.dialog.open(ViewRecommendationRecordComponent, {
          data: data
        });
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        });
        this.loading = false;
      }, error => {
        this.snackBar.open('Bad request!', 'Error', {
          duration: 4000,
        });
        this.loading = false;
      });
    } else {
      this.snackBar.open('Bad request!', 'Error', {
        duration: 4000,
      });
      this.loading = false;
    }

  }

  clearForm() {
    this.createFormRecommend();
  }
}
