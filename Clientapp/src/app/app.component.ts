import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Atlantis';

  constructor(private router: Router) {}

  ngOnInit() {
    //this.router.navigate(['/auth/login'], { skipLocationChange: true });
    this.router.navigate(['/plantresult/plantpl'], {
      skipLocationChange: true,
    });
  }
}
