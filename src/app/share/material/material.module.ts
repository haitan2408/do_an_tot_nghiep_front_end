import { NgModule } from '@angular/core';
import {
  MatProgressBarModule, MatProgressSpinnerModule, MatButtonModule,
  MatIconModule, MatTabsModule, MatFormFieldModule, MatInputModule,
  MatCardModule, MatCheckboxModule, MatSelectModule, MatSidenavModule, MatToolbarModule,
  MatMenuModule, MatSnackBarModule, MatTooltipModule, MatStepperModule, MatDialogModule,
  MatTableModule, MatSortModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, MatListModule
}
  from '@angular/material';
import {ConfirmationDialogComponent} from '../../component/admin/confirmation-dialog/confirmation-dialog.component';
import {EditPostComponent} from '../../component/user/edit-post/edit-post.component';
import {NewPostComponent} from '../../component/user/new-post/new-post.component';
import {ChangeAvatarComponent} from '../../component/user/change-avatar/change-avatar.component';
import {ConfirmDeleteComponent} from '../../component/user/confirm-delete/confirm-delete.component';
import {ViewPostAdminComponent} from '../../component/admin/view-post-admin/view-post-admin.component';
import {ViewCommentAdminComponent} from '../../component/admin/view-comment-admin/view-comment-admin.component';
import {ViewUserComponent} from '../../component/admin/view-user/view-user.component';
import {ConfirmLockUserComponent} from '../../component/admin/confirm-lock-user/confirm-lock-user.component';
const MaterialModules = [
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatTabsModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatCheckboxModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  MatMenuModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatStepperModule,
  MatTableModule,
  MatSortModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatListModule
]
@NgModule({
  declarations: [],
  imports: [
    MaterialModules
  ],
  exports: [
    MaterialModules
  ],
  entryComponents: [ConfirmationDialogComponent, EditPostComponent, NewPostComponent, ChangeAvatarComponent, ConfirmDeleteComponent,
  ViewPostAdminComponent, ViewCommentAdminComponent, ViewUserComponent, ConfirmLockUserComponent],
})
export class MaterialModule { }
