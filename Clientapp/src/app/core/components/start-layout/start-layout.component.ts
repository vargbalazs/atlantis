import { Component } from '@angular/core';
import { LayoutService } from '../../services/start-layout.service';

@Component({
  selector: 'layout',
  templateUrl: './start-layout.component.html',
  styleUrls: ['./start-layout.component.css'],
  providers: [LayoutService],
})
export class StartLayoutComponent {}
