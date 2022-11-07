import Coupon from "../../src/domain/entities/Coupon"
import Item from "../../src/domain/entities/Item"
import Order from "../../src/domain/entities/Order"

test("Não deve criar um pedido com cpf inválido", () => {
    expect(() => new Order("111.222.333-98", new Date())).toThrow(new Error("Invalid Cpf"))
})

test("Não deve ser possível criar um pedido com item em quantidade negativa", () => {
    const order = new Order("078.100.277-00", new Date())
    expect(() => order.addItem(new Item(1, "Guitarra", 1000), -1)).toThrow(new Error("Invalid item quantity"))
})

test("Não deve ser possível criar um pedido com itens repetidos", () => {
    const order = new Order("078.100.277-00", new Date())
    order.addItem(new Item(1, "Guitarra", 1000), 1)
    expect(() => order.addItem(new Item(1, "Guitarra", 1000), 1)).toThrow(new Error("Item already in the order"))
})

test("Deve criar um pedido com 1 item sem cupom", () => {
    const order = new Order("078.100.277-00", new Date())
    order.addItem(new Item(1, "Guitarra", 1000), 1)
    const total = order.getTotal()
    expect(total).toBe(1000)
})

test("Deve criar um pedido com 3 itens sem cupom", () => {
    const order = new Order("078.100.277-00", new Date())
    order.addItem(new Item(1, "Guitarra", 1000), 1)
    order.addItem(new Item(2, "Caixa de som", 5000), 1)
    order.addItem(new Item(3, "Cabo", 30), 3)
    const total = order.getTotal()
    expect(total).toBe(6090)
})

test("Deve criar um pedido com 1 item e aplicar cupom de 20% de desconto", () => {
    const order = new Order("078.100.277-00", new Date())
    order.addItem(new Item(1, "Guitarra", 1000), 1)
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 1)
    order.addCoupon(new Coupon("VALE20", 20, expiresDate))
    const total = order.getTotal()
    expect(total).toBe(800)
})

test("Deve criar um pedido com 3 itens e adicionar 20% de desconto", () => {
    const order = new Order("078.100.277-00", new Date())
    order.addItem(new Item(1, "Guitarra", 1000), 1)
    order.addItem(new Item(2, "Caixa de som", 5000), 1)
    order.addItem(new Item(3, "Cabo", 30), 3)
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 1)
    order.addCoupon(new Coupon("VALE20", 20, expiresDate))
    const total = order.getTotal()
    expect(total).toBe(4872)
})

test("Deve criar um pedido com 3 itens e não aplicar o cupom de desconto pois está vencido", () => {
    const order = new Order("078.100.277-00", new Date())
    order.addItem(new Item(1, "Guitarra", 1000), 1)
    order.addItem(new Item(2, "Caixa de som", 5000), 1)
    order.addItem(new Item(3, "Cabo", 30), 3)
    order.addCoupon(new Coupon("VALE20", 20, new Date("2022-03-03T10:00:00")))
    const total = order.getTotal()
    expect(total).toBe(6090)
})
