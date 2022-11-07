export default class Coupon {
    constructor(readonly code: string, readonly percentage: number, readonly expiresDate: Date = new Date()) {}

    isExpired(date: Date) {
        return date > this.expiresDate
    }
}