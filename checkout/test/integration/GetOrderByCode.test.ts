import Checkout from "../../src/application/Checkout"
import GetOrderByCode from "../../src/application/GetOrderByCode"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import OrderRepository from "../../src/infra/repository/database/OrderRepository"
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory"
import { getItemGateway, calculateFreightGateway, queue } from "./Stubs"

let orderRepositoryDatabase: OrderRepository;
let connection: PgPromiseAdapter

test("Should return an order with it's code", async () => {
    const couponRepository = new CouponRepositoryMemory()
    const orderRepository = new OrderRepositoryMemory()
    const checkout = new Checkout(orderRepository, getItemGateway, couponRepository, calculateFreightGateway, queue)
    const input = {
        cpf: "259.556.978-37",
        orderItems: [
            { idItem: 3, quantity: 1 },
        ],
        from: "22060030",
        to: "88015600"
    }
    const getOrderByCodeInput = {
        code: "202200000001"
    }
    await checkout.execute(input)
    const getOrderByCode = new GetOrderByCode(orderRepository)
    const order = await getOrderByCode.execute(getOrderByCodeInput)
    expect(order.code.value).toBe("202200000001")
})