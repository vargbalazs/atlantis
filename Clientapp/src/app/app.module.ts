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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalErrorHandler } from './core/error/global-error-handler';
import { ErrorPageModule } from './core/components/errorpage/errorpage.module';
import { ProductionDataModule } from './features/productiondata/productiondata.module';
import { ForecastModule } from './features/forecast/forecast.module';
import { PlanningModule } from './features/planning/planning.module';
import { PlantResultModule } from './features/plantresult/plantresult.module';
import { AdminModule } from './core/components/admin/admin.module';
import { HttpErrorInterceptor } from './core/interceptor/http-error.interceptor';
import { ConfirmDialogStyleModule } from './shared/directives/confirmdialog/confirmdialog-style.module';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { IntlModule } from '@progress/kendo-angular-intl';
import { LocaleProvider } from './core/providers/locale.provider';
import { TranslateModule } from '@ngx-translate/core';
import { HomeModule } from './features/home/home.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ErrorPageModule,
    AuthModule,
    AdminModule,
    StartLayoutModule,
    HomeModule,
    MasterDataModule,
    ProductionDataModule,
    ForecastModule,
    PlanningModule,
    PlantResultModule,
    ConfirmDialogStyleModule,
    DialogModule,
    IntlModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    LocaleProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
