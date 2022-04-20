import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartLayoutComponent } from 'src/app/core/components/start-layout/start-layout.component';
import { AuthGuard } from '../../guards/auth.guard';
import { UserListComponent } from './userlist/userlist.component';

const routes: Routes = [
  {
    path: '',
    component: StartLayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'admin/userlist',
        component: UserListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
