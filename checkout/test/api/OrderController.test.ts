import axios from "axios"
import Queue from "../../../shared/queue/Queue";
import RabbitMQAdapter from "../../../shared/queue/RabbitMQAdapter";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import OrderRepository from "../../src/infra/repository/database/OrderRepository"

let orderRepositoryDatabase: OrderRepository;
let connection: PgPromiseAdapter
let queue: Queue

beforeEach(async () => {
    connection = new PgPromiseAdapter()
    orderRepositoryDatabase = new OrderRepository(connection)
    queue = new RabbitMQAdapter()
    await queue.connect()
    await orderRepositoryDatabase.clear()
})

afterEach(async() => {
    await orderRepositoryDatabase.clear()
    await connection.close()
    await queue.close()
})

test("Should simulate an order", async () => {
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
    const response = await axios.post("http://localhost:3000/preview", input)
    expect(response.status).toBe(200)
    expect(response.data).toBe(6292.091008941878)
})

test("Should simulate an order with discount", async () => {
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
    const response = await axios.post("http://localhost:3000/preview", input)
    expect(response.status).toBe(200)
    expect(response.data).toBe(5033.672807153502)
})

test("Should create an order with an discount coupon", async () => {
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
    await axios.post("http://localhost:3000/checkout", input)
    await new Promise(resolve => setTimeout(resolve, 500));
    const order = await axios.get("http://localhost:3000/orders/25955697837")
    expect(order.data[0].code).toBe("202200000001")
    expect(order.data[0].total).toBe(5033.672807153502)
})

test("Should create an order without a coupon", async () => {
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
    await axios.post("http://localhost:3000/checkout", input)
    await new Promise(resolve => setTimeout(resolve, 500));
    const order = await axios.get("http://localhost:3000/orders/25955697837")
    expect(order.data[0].code).toBe("202200000001")
    expect(order.data[0].total).toBe(6292.091008941878)
})

