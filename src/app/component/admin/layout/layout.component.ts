import { Component, OnInit } from '@angular/core';
import {LoadCssService} from '../../../service/load-css.service';
import {TokenStorageService} from '../../../auth/token-storage.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';

declare var $: any;
// declare var $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  username="";
  constructor(private loadCssService: LoadCssService, private tokenStorageService: TokenStorageService,
              private fb: FormBuilder, private router: Router) {
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
}
