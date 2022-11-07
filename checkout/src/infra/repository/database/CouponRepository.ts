import Coupon from "../../../domain/entities/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";
import Connection from "../../database/Connection";

export default class CouponRepositoryDatabase implements CouponRepository {
    constructor(readonly connection: Connection) {}

    save(coupon: Coupon): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getCoupon(code: string): Promise<Coupon | undefined> {
        const [couponData] = await this.connection.query("select * from ccca.coupon where code = $1", [code])
        if (!couponData) return
        return new Coupon(couponData.code, parseFloat(couponData.percentage), couponData.expire_date)
    }
    
}