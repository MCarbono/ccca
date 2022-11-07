import Checkout from "../../src/application/Checkout"
import GetOrdersByCpf from "../../src/application/GetOrdersByCpf"
import Coupon from "../../src/domain/entities/Coupon"
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"
import OrderRepository from "../../src/infra/repository/database/OrderRepository"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import { getItemGateway, calculateFreightGateway, queue } from "./Stubs"

let orderRepositoryDatabase: OrderRepository;
let connection: PgPromiseAdapter
let couponRepository: CouponRepositoryMemory;

beforeEach(async () => {
    couponRepository = new CouponRepositoryMemory()
    connection = new PgPromiseAdapter()
    orderRepositoryDatabase = new OrderRepository(connection)
})

afterEach(async() => {
    await orderRepositoryDatabase.clear()
    await connection.close()
})

test("Should create an order", async () => {
    const checkout = new Checkout(orderRepositoryDatabase, getItemGateway, couponRepository, calculateFreightGateway, queue)
    const input = {
        cpf: "259.556.978-37",
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 }
        ],
        from: "22060030",
        to: "88015600"
    }
    await checkout.execute(input)
    const getOrdersByCpf = new GetOrdersByCpf(orderRepositoryDatabase)
    const orders = await getOrdersByCpf.execute("25955697837")
    expect(orders).toHaveLength(1)
    expect(orders[0].total).toBe(6292.091008941878)
})

test("Should create an order with a discount coupon", async () => {
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 1)
    await couponRepository.save(new Coupon("VALE20", 20, expiresDate))
    const checkout = new Checkout(orderRepositoryDatabase, getItemGateway, couponRepository, calculateFreightGateway, queue)
    const input = {
        cpf: "259.556.978-37",
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 }
        ],
        coupon: "VALE20",
        from: "22060030",
        to: "88015600"
    }
    await checkout.execute(input)
    const getOrdersByCpf = new GetOrdersByCpf(orderRepositoryDatabase)
    const orders = await getOrdersByCpf.execute("25955697837")
    expect(orders).toHaveLength(1)
    expect(orders[0].total).toBe(5033.672807153502)
})

test("Should create an order with an expired discount coupon", async () => {
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() - 1)
    const checkout = new Checkout(orderRepositoryDatabase, getItemGateway, couponRepository, calculateFreightGateway, queue)
    const input = {
        cpf: "259.556.978-37",
        orderItems: [
            { idItem: 1, quantity: 1 },
            { idItem: 2, quantity: 1 },
            { idItem: 3, quantity: 3 }
        ],
        coupon: "VALE20",
        from: "22060030",
        to: "88015600"
    }
    await checkout.execute(input)
    const getOrdersByCpf = new GetOrdersByCpf(orderRepositoryDatabase)
    const orders = await getOrdersByCpf.execute("25955697837")
    expect(orders).toHaveLength(1)
    expect(orders[0].total).toBe(6292.091008941878)
})

test("Should create two orders with order codes", async () => {
    const checkout = new Checkout(orderRepositoryDatabase, getItemGateway, couponRepository, calculateFreightGateway, queue)
    const input = {
        cpf: "259.556.978-37",
        orderItems: [
            { idItem: 1, quantity: 1 },
        ],
        date: new Date("2022-03-01T10:00:00"),
        from: "22060030",
        to: "88015600"
    }
    await checkout.execute(input)
    await checkout.execute(input)
    const getOrdersByCpf = new GetOrdersByCpf(orderRepositoryDatabase)
    const orders = await getOrdersByCpf.execute("25955697837")
    expect(orders).toHaveLength(2)
    expect(orders[0].code).toBe("202200000001")
    expect(orders[1].code).toBe("202200000002")
})