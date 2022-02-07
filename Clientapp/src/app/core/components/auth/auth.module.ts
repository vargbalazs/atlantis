import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRootModule } from './authroot/authroot.module';
import { AuthRootComponent } from './authroot/authroot.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRootModule],
  providers: [],
  exports: [AuthRootComponent],
})
export class AuthModule {}
