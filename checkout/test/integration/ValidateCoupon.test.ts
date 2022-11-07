import ValidateCoupon from "../../src/application/ValidateCoupon"
import Coupon from "../../src/domain/entities/Coupon"
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"

test("Deve retornar a validade do coupon como verdadeira", async () => {
    const couponRepository = new CouponRepositoryMemory()
    const validateCoupon = new ValidateCoupon(couponRepository)
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 1)
    await couponRepository.save(new Coupon("VALE20", 20, expiresDate))
    const input = {
        code: "VALE20",
        date: new Date()
    }
    const isValid = await validateCoupon.execute(input)
    expect(isValid).toBeTruthy()
})

test("Deve retornar a validade do coupon como falsa", async () => {
    const couponRepository = new CouponRepositoryMemory()
    const validateCoupon = new ValidateCoupon(couponRepository)
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() - 1)
    await couponRepository.save(new Coupon("VALE20", 20, expiresDate))
    const input = {
        code: "VALE20",
        date: new Date()
    }
    const isValid = await validateCoupon.execute(input)
    expect(isValid).toBeFalsy()
})