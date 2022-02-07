import { NgModule } from '@angular/core';
import { ProvkDetailsModule } from './components/details/details.module';
import { ListProvkModule } from './components/list/list-provk.module';

@NgModule({
  declarations: [],
  imports: [ListProvkModule, ProvkDetailsModule],
  providers: [],
  exports: [],
})
export class ProvkModule {}
