import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Booking } from '../models/booking.model';

@Injectable()
export class BrowseDataService {
  constructor(private http: HttpClient) {}

  getBookings(plantId: number, year: number, month: number) {
    let filterCrit = { plantId: plantId, year: year, month: month };
    return this.http.get<Booking[]>(
      `${environment.apiUrl}/api/plantresult/bookings`,
      { params: filterCrit }
    );
  }

  getBookingsForCostCenter(
    costCenter: string,
    plantId: number,
    year: number,
    month: number,
    accountNumber: string
  ) {
    let filterCrit = {
      costCenter: costCenter,
      plantId: plantId,
      year: year,
      month: month,
      accountNumber: accountNumber,
    };
    return this.http.get<Booking[]>(
      `${environment.apiUrl}/api/plantresult/bookingsforcostcenter`,
      { params: filterCrit }
    );
  }

  getBookingsForAccountNumber(
    accountNumber: string,
    plantId: number,
    year: number,
    month: number
  ) {
    let filterCrit = {
      accountNumber: accountNumber,
      plantId: plantId,
      year: year,
      month: month,
    };
    return this.http.get<Booking[]>(
      `${environment.apiUrl}/api/plantresult/bookingsforaccnumb`,
      { params: filterCrit }
    );
  }
}
