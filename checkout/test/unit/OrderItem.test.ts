import OrderItem from "../../src/domain/entities/OrderItem"

test("Deve criar um item do pedido", () => {
    const orderItem = new OrderItem(1, 10, 2)
    expect(orderItem.calculate()).toBe(20)
})

test("Não deve criar um item do pedido com quantidade negativa", () => {
    expect(() => new OrderItem(1, 10, -1)).toThrow(new Error("Invalid item quantity"))
})