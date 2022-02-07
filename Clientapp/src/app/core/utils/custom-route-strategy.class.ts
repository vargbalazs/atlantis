import {
  ActivatedRouteSnapshot,
  BaseRouteReuseStrategy,
} from '@angular/router';

export class CustomRouteReuseStrategy extends BaseRouteReuseStrategy {
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    // Reuse the route of the RouteConfig is the same, or if both routes use the
    // same component, because the latter can have different RouteConfigs.
    return (
      future.routeConfig === curr.routeConfig ||
      (!!future.routeConfig?.component &&
        future.routeConfig?.component === curr.routeConfig?.component)
    );
  }
}
