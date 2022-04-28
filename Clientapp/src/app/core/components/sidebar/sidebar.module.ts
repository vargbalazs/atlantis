import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { SideBarComponent } from './sidebar.component';
import { IconsModule } from '@progress/kendo-angular-icons';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { HighlightSearch } from 'src/app/shared/pipes/highlight-search.pipe';
import { MasterDataRoutingModule } from 'src/app/features/masterdata/masterdata-routing.module';
import { RouterModule } from '@angular/router';
import { ProductionDataRoutingModule } from 'src/app/features/productiondata/productiondata-routing.module';
import { ForecastRoutingModule } from 'src/app/features/forecast/forecast-routing.module';
import { PlanningRoutingModule } from 'src/app/features/planning/planning-routing.module';
import { PlantResultRoutingModule } from 'src/app/features/plantresult/plantresult-routing.module';
import { AdminRoutingModule } from '../admin/admin-routing.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [SideBarComponent, HighlightSearch],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    IconsModule,
    TooltipModule,
    InputsModule,
    MasterDataRoutingModule,
    ProductionDataRoutingModule,
    ForecastRoutingModule,
    PlanningRoutingModule,
    PlantResultRoutingModule,
    AdminRoutingModule,
    TranslateModule,
  ],
  providers: [TranslateService],
  exports: [SideBarComponent],
})
export class SideBarModule {}
