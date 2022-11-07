import OrderRepository from "../domain/repository/OrderRepository";

export default class GetOrdersByCpf {

    constructor(readonly orderRepository: OrderRepository){}

    async execute(cpf: string): Promise<Output[]> {
        const output = []
        const orders = await this.orderRepository.getByCpf(cpf)
        for(const order of orders) {
            output.push({
                code: order.code.value,
                total: order.getTotal()
            })
        }
        return output
    }
}

type Output = {
    code: string
    total: number
}