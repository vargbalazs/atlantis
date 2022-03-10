import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const routeTransitionAnimations = trigger('triggerName', [
  transition(
    'LoginPage <=> SignUpPage, LoginPage <=> ForgotPwd, LoginPage <=> FirstLogin',
    [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
      ]),
      query(':enter', [style({ left: '-30%', opacity: 0 })]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('0.8s ease-out', style({ left: '30%', opacity: 0 })),
        ]),
        query(':enter', [
          animate('0.8s ease-out', style({ left: '0%', opacity: 1 })),
        ]),
      ]),
      query(':enter', animateChild()),
    ]
  ),
]);
