import {Component, OnInit} from '@angular/core';
import {LoadCssService} from '../../../service/load-css.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {SendEmailComponent} from "../send-email/send-email.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RecommendService} from "../../../service/recommend.service";

declare var $: any;

// declare var $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  username = "";
  loading = false;

  constructor(private loadCssService: LoadCssService, private tokenStorageService: TokenStorageService,
              private fb: FormBuilder, private router: Router, private dialog: MatDialog, private snackBar: MatSnackBar,
              private recommendService: RecommendService) {
    this.loadCssService.loadCss('assets/vendors/bootstrap/dist/css/bootstrap.min.css');
    this.loadCssService.loadCss('assets/build/css/custom.min.css');
    this.loadCssService.loadCss('assets/vendors/font-awesome/css/font-awesome.min.css');
    this.loadCssService.loadCss('assets/vendors/nprogress/nprogress.css');
    this.loadCssService.loadCss('assets/vendors/iCheck/skins/flat/green.css');
    this.loadCssService.loadScript('assets/build/js/custom.min.js');
    this.loadCssService.loadScript('assets/vendors/jquery/dist/jquery.min.js');
    this.loadCssService.loadScript('assets/vendors/bootstrap/dist/js/bootstrap.bundle.min.js');
    this.loadCssService.loadScript('assets/vendors/fastclick/lib/fastclick.js');
    this.loadCssService.loadScript('assets/vendors/nprogress/nprogress.js');
    this.loadCssService.loadScript('assets/vendors/iCheck/icheck.min.js');
    this.loadCssService.loadScript('assets/vendors/fastclick/lib/fastclick.js');
    this.username = this.tokenStorageService.getUsername();
  }

  ngOnInit(): void {


  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl("/login");
  }

  sendEmailToCompany() {
    const dialogRef = this.dialog.open(SendEmailComponent, {
      width: '30%',
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.snackBar.open('Send email successfully!', 'delete', {
            duration: 4000,
          })
          this.ngOnInit();
        }else if(confirmed==undefined) {
          this.snackBar.open('Cancel send Email!', 'Cancel', {
              duration: 4000,
            }
          )
        } else {
          this.snackBar.open('Lỗi không gửi được mail!', '', {
              duration: 4000,
            }
          )
        }
      }
    );
  }

  updateDataRecommend() {
    this.loading = true;
    this.recommendService.updateDataRecommend().subscribe(data => {
      this.loading = false;
      this.snackBar.open('Update data recommend successfully!', 'Update', {
        duration: 4000,
      })
    }, error => {
      this.loading = false;
      this.snackBar.open('Error!', '', {
        duration: 4000,
      })
    });

  }
}
