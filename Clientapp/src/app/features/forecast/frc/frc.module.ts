import { NgModule } from '@angular/core';
import { FrcDetailsModule } from './components/details/details.module';
import { ListFrcModule } from './components/list/list-frc.module';

@NgModule({
  declarations: [],
  imports: [ListFrcModule, FrcDetailsModule],
  providers: [],
  exports: [],
})
export class FrcModule {}
