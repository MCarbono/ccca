import OrderCoupon from "../../src/domain/entities/OrderCoupon"

test("Deve criar um cupom de desconto do pedido", () => {
    const coupon = new OrderCoupon("VALE20", 20)
    const discount = coupon.calculateDiscount(1000)
    expect(discount).toBe(200)
})