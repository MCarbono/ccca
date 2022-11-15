import Checkout from "../../src/application/Checkout"
import GetOrderByCode from "../../src/application/GetOrderByCode"
import GetOrdersByCpfQuery from "../../src/application/query/GetOrdersByCpfQuery"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import OrderRepository from "../../src/infra/repository/database/OrderRepository"
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"
import OrderRepositoryMemory from "../../src/infra/repository/memory/OrderRepositoryMemory"
import { getItemGateway, calculateFreightGateway, queue } from "./Stubs"

let orderRepositoryDatabase: OrderRepository;
let connection: PgPromiseAdapter

beforeEach(async () => {
    connection = new PgPromiseAdapter()
    orderRepositoryDatabase = new OrderRepository(connection)
})

afterEach(async() => {
    await orderRepositoryDatabase.clear()
    await connection.close()
})
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

test("Should return an order with it's code by customer cpf", async () => {
    const couponRepository = new CouponRepositoryMemory()
    const checkout = new Checkout(orderRepositoryDatabase, getItemGateway, couponRepository, calculateFreightGateway, queue)
    const input = {
        cpf: "259.556.978-37",
        orderItems: [
            { idItem: 3, quantity: 1 },
        ],
        from: "22060030",
        to: "88015600"
    }
    await checkout.execute(input)
    const getOrderByCpfQuery = new GetOrdersByCpfQuery(connection)
    const order = await getOrderByCpfQuery.execute("25955697837")
   expect(order[0].code).toBe("202200000001")
})