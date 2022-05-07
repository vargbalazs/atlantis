import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { SalesProduct } from 'src/app/features/masterdata/production/salesproduct/models/salesproduct.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { CopyEntity } from '../../../../../../shared/models/copy.model';
import { SalesProductService } from '../../services/salesproduct.service';

@Component({
  selector: 'production-salesproduct',
  templateUrl: './list-salesproduct.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class SalesProductComponent
  extends Crud<SalesProduct>
  implements OnInit
{
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    private salesProductService: SalesProductService,
    loaderService: LoaderService,
    translateService: TranslateService
  ) {
    super(
      msgDialogService,
      notificationService,
      salesProductService,
      loaderService,
      translateService
    );
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.salesProductService.getSalesProducts().subscribe((salesProducts) => {
      salesProducts.forEach(
        (salesProduct) =>
          (salesProduct.yearDate = new Date(salesProduct.yearDate!))
      );
      this.gridData = { data: salesProducts, total: salesProducts.length };
    });
  }
}
