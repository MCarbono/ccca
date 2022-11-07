import Order from "../domain/entities/Order";
import OrderRepository from "../domain/repository/OrderRepository";

export default class GetOrderByCode {

    constructor(readonly orderRepository: OrderRepository){}

    async execute(input: Input): Promise<Order> {
        return await this.orderRepository.getByCode(input.code)
    }
}

type Input = {
    code: string
}