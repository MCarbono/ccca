import StockEntry from "../domain/entities/StockEntry";
import StockRepository from "../domain/repository/StockRepository";

export default class IncrementStock {

    constructor(readonly stockRepository: StockRepository) {}

    async execute(input: Input): Promise<void>{
        for(const orderItem of input.order.orderItems) {
            await this.stockRepository.save(new StockEntry(orderItem.idItem, "in", orderItem.quantity))
        }
    }
}

type Input = {
    order: {
        orderItems: { idItem: number, quantity: number }[]
    }
}