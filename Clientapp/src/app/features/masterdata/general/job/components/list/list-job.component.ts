import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Job } from 'src/app/features/masterdata/general/job/models/job.model';
import { Crud } from 'src/app/shared/classes/crud.class';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { MsgDialogService } from 'src/app/shared/services/msgdialog.service';
import { JobService } from '../../services/job.service';
import { jobs } from './sampledata';

@Component({
  selector: 'general-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['../../../../../../styles/routed-component.css'],
})
export class JobComponent extends Crud<Job> implements OnInit {
  constructor(
    msgDialogService: MsgDialogService,
    notificationService: NotificationService,
    jobService: JobService,
    loaderService: LoaderService
  ) {
    super(msgDialogService, notificationService, jobService, loaderService);
  }

  ngOnInit() {
    this.gridData = { data: jobs, total: jobs.length };
  }
}
