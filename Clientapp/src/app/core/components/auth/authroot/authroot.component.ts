import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './authroot.animations';

@Component({
  selector: 'auth-root',
  templateUrl: './authroot.component.html',
  styleUrls: ['./authroot.component.css'],
  animations: [routeTransitionAnimations],
})
export class AuthRootComponent {
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }
}
