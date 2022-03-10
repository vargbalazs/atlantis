export class User {
  constructor(
    public id?: number,
    public userId?: string,
    public firstName?: string,
    public lastName?: string,
    public currentUserName?: string,
    public userName?: string,
    public email?: string,
    public userEmail?: string,
    public password?: string,
    public passwordConfirm?: string,
    public lastLoginDate?: Date,
    public lastLoginDateDisplay?: Date,
    public joinDate?: Date,
    public active?: boolean,
    public isActive?: boolean,
    public notLocked?: boolean,
    public isNotLocked?: boolean,
    public firstLogin?: boolean,
    public isFirstLogin?: boolean,
    public role?: string,
    public authorities?: []
  ) {}
}
