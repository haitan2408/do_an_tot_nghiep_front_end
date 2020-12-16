import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './component/user/login/login.component';
import {PostComponent} from './component/user/post/post.component';
import {RegisterComponent} from './component/user/register/register.component';
import {NewPostComponent} from './component/user/new-post/new-post.component';
import {ViewPostComponent} from './component/user/view-post/view-post.component';
import {ViewProfileComponent} from './component/user/view-profile/view-profile.component';
import {LayoutComponent} from './component/admin/layout/layout.component';
import {UserComponent} from './component/user/user.component';
import {AdminPostComponent} from './component/admin/admin-post/admin-post.component';
import {ViewInformationComponent} from './component/user/view-information/view-information.component';
import {AuthGuard} from './auth/auth.guard.service';
import {AdminAuthService} from './auth/admin-auth.service';
import {ManagerUserComponent} from './component/admin/manager-user/manager-user.component';
import {RecommendationsUserComponent} from "./component/user/recommendations-user/recommendations-user.component";


const routes: Routes = [
  {
    path: '', component: UserComponent, children: [
      {path: 'login', component: LoginComponent},
      {path: '', component: PostComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'new-post', component: NewPostComponent,canActivate: [AuthGuard]},
      {path: 'view-post/:id', component: ViewPostComponent},
      {path: 'view-profile/:email', component: ViewProfileComponent},
      {path: 'view-information/:email', component: ViewInformationComponent},
      {path: 'recommendations/:email', component: RecommendationsUserComponent, canActivate: [AuthGuard]}
    ]
  },
  {
    path: 'admin', component: LayoutComponent, canActivate: [AdminAuthService], children: [
      {path: 'post', component: AdminPostComponent},
      {path: 'user', component: ManagerUserComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
