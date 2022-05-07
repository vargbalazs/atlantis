import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Job } from 'src/app/features/masterdata/general/job/models/job.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'general-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class JobComponent extends Crud<Job> implements OnInit {
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    private jobService: JobService,
    loaderService: LoaderService,
    translateService: TranslateService
  ) {
    super(msgDialogService, notificationService, jobService, loaderService, translateService);
  }

  ngOnInit() {
    this.gridData = { data: [], total: 0 };
    this.jobService.getJobs().subscribe((jobs) => {
      this.gridData = { data: jobs, total: jobs.length };
    });
  }
}
