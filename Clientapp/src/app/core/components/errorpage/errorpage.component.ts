import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'error-page',
  templateUrl: './errorpage.component.html',
  styleUrls: [
    '../../../styles/routed-component.css',
    './errorpage.component.css',
  ],
})
export class ErrorPageComponent {
  error: any;
  isHttpError!: boolean;

  constructor(private router: Router) {
    this.error = this.router.getCurrentNavigation()?.extras.state?.error;
    this.isHttpError = this.error instanceof HttpErrorResponse;
  }
}
