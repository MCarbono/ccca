import Preview from "../../src/application/Preview"
import Coupon from "../../src/domain/entities/Coupon"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import OrderRepository from "../../src/infra/repository/database/OrderRepository"
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory"
import { getItemGateway, calculateFreightGateway } from "./Stubs"

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

test("Should simulate an order with a discount coupon", async () => {
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 1)
    await couponRepository.save(new Coupon("VALE20", 20, expiresDate))
    
    const preview = new Preview(orderRepositoryDatabase, getItemGateway, couponRepository, calculateFreightGateway)
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
    const total = await preview.execute(input)
    expect(total).toBe(5033.672807153502)
})

test("Should simulate an order without a discount coupon", async () => {
    const preview = new Preview(orderRepositoryDatabase, getItemGateway, couponRepository, calculateFreightGateway)
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
    const total = await preview.execute(input)
    expect(total).toBe(6292.091008941878)
})