export class Booking {
  constructor(
    public id?: number,
    public companyId?: number,
    public plantId?: number,
    public year?: number,
    public month?: number,
    public costCenter?: string,
    public accountNumber?: string,
    public accountName?: string,
    public amount?: number,
    public currency?: string,
    public transAmount?: number,
    public transCur?: string,
    public bookingNr?: string,
    public refNr?: string,
    public bookingText?: string,
    public partnerObj?: string,
    public partnerObjName?: string,
    public contAccNumb?: string,
    public contAccName?: string,
    public period?: number,
    public bookingDate?: Date,
    public docDate?: Date,
    public postingDate?: Date,
    public userName?: string
  ) {}
}
