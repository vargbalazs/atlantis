import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './core/components/auth/auth.module';
import { StartLayoutModule } from './core/components/start-layout/start-layout.module';
import { RouteReuseStrategy } from '@angular/router';
import { MasterDataModule } from './features/masterdata/masterdata.module';
import { CustomRouteReuseStrategy } from './core/utils/custom-route-strategy.class';
import { HttpClientModule } from '@angular/common/http';
import { GlobalErrorHandler } from './core/error/global-error-handler';
import { ErrorPageModule } from './core/components/errorpage/errorpage.module';
import { ProductionDataModule } from './features/productiondata/productiondata.module';
import { ForecastModule } from './features/forecast/forecast.module';
import { PlanningModule } from './features/planning/planning.module';
import { PlantResultModule } from './features/plantresult/plantresult.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ErrorPageModule,
    AuthModule,
    StartLayoutModule,
    MasterDataModule,
    ProductionDataModule,
    ForecastModule,
    PlanningModule,
    PlantResultModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
