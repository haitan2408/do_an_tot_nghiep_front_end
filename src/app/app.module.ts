import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/user/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import {HttpClientModule} from '@angular/common/http';
import { PostComponent } from './component/user/post/post.component';
import { RegisterComponent } from './component/user/register/register.component';
import {MaterialModule} from './share/material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NewPostComponent } from './component/user/new-post/new-post.component';
import { ViewPostComponent } from './component/user/view-post/view-post.component';
import { ViewProfileComponent } from './component/user/view-profile/view-profile.component';
import { LayoutComponent } from './component/admin/layout/layout.component';
import { UserComponent } from './component/user/user.component';
import { AdminPostComponent } from './component/admin/admin-post/admin-post.component';
import { ConfirmationDialogComponent } from './component/admin/confirmation-dialog/confirmation-dialog.component';
import { EditPostComponent } from './component/user/edit-post/edit-post.component';
import { AngularFireModule } from "@angular/fire";
import {
  AngularFireStorageModule,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from "@angular/fire/storage";
import {environment} from '../environments/environment';
import { ChangeAvatarComponent } from './component/user/change-avatar/change-avatar.component';
import { ViewInformationComponent } from './component/user/view-information/view-information.component';
import { ConfirmDeleteComponent } from './component/user/confirm-delete/confirm-delete.component';
import { ViewPostAdminComponent } from './component/admin/view-post-admin/view-post-admin.component';
import { ViewCommentAdminComponent } from './component/admin/view-comment-admin/view-comment-admin.component';
import { ManagerUserComponent } from './component/admin/manager-user/manager-user.component';
import { ViewUserComponent } from './component/admin/view-user/view-user.component';
import { ConfirmLockUserComponent } from './component/admin/confirm-lock-user/confirm-lock-user.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PostComponent,
    RegisterComponent,
    NewPostComponent,
    ViewPostComponent,
    ViewProfileComponent,
    LayoutComponent,
    UserComponent,
    AdminPostComponent,
    ConfirmationDialogComponent,
    EditPostComponent,
    ChangeAvatarComponent,
    ViewInformationComponent,
    ConfirmDeleteComponent,
    ViewPostAdminComponent,
    ViewCommentAdminComponent,
    ManagerUserComponent,
    ViewUserComponent,
    ConfirmLockUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NgxLoadingModule.forRoot({}),
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
