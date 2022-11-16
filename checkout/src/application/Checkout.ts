import Order from "../domain/entities/Order"
import CouponRepository from "../domain/repository/CouponRepository"
import OrderRepository from "../domain/repository/OrderRepository"
import CalculateFreightGateway from "./gateway/CalculateFreightGateway"
import GetItemGateway from "./gateway/GetItemGateway"
import Queue from "../../../shared/queue/Queue"
import OrderPlaced from "../domain/event/OrderPlaced"

export default class Checkout {

    constructor(
        readonly orderRepository: OrderRepository, 
        readonly getItemGateway: GetItemGateway, 
        readonly couponRepository: CouponRepository,
        readonly calculateFreightGateway: CalculateFreightGateway,
        readonly queue: Queue
    ){}

    async execute(input: Input): Promise<void> {
        const nextSequence = (await this.orderRepository.count()) + 1
        const order = new Order(input.cpf, input.date, nextSequence)
        const orderItemsIds = this.orderItemsIdsToString(input.orderItems)
        const items = await this.getItemGateway.getItems(orderItemsIds)
        const orderItemsFreight = []
        for (const [key,value] of Object.entries(input.orderItems)) {
            const item = items[+key]
            order.addItem(item, value.quantity)
            orderItemsFreight.push({ volume: item.volume, density: item.density, quantity: value.quantity})
        }
        order.freight = await this.calculateFreightGateway.calculate({ from: input.from, to: input.to, orderItems: orderItemsFreight })
        if(input.coupon) {
            const coupon = await this.couponRepository.getCoupon(input.coupon)
            if (coupon) order.addCoupon(coupon)
        }
        await this.orderRepository.save(order)
        await this.queue.publish("orderPlaced", new OrderPlaced(order, order.getTotal()))
    }

    orderItemsIdsToString(orderItems: Input["orderItems"]) {
        const ids = orderItems.map(orderItem => orderItem.idItem.toString()).join(",")
        return ids
    }
}

type Input = {
    cpf: string
    orderItems: { idItem: number, quantity: number }[]
    coupon?: string
    date?: Date
    from: string
    to: string
}