import Order from "../domain/entities/Order"
import CouponRepository from "../domain/repository/CouponRepository"
import OrderRepository from "../domain/repository/OrderRepository"
import CalculateFreightGateway from "./gateway/CalculateFreightGateway";
import GetItemGateway from "./gateway/GetItemGateway"


export default class Preview {

    constructor(
        readonly orderRepository: OrderRepository, 
        readonly getItemGateway: GetItemGateway,
        readonly couponRepository: CouponRepository,
        readonly calculateFreightGateway: CalculateFreightGateway,
    ){}

    async execute(input: Input): Promise<number> {
        const orderItemsFreight = []
        const order = new Order(input.cpf, input.date)
        for (const orderItem of input.orderItems) {
            const item = await this.getItemGateway.getItem(orderItem.idItem)
            order.addItem(item, orderItem.quantity)
            orderItemsFreight.push({ volume: item.volume, density: item.density, quantity: orderItem.quantity})
        }
        order.freight = await this.calculateFreightGateway.calculate({ from: input.from, to: input.to, orderItems: orderItemsFreight})
        if(input.coupon) {
            const coupon = await this.couponRepository.getCoupon(input.coupon)
            if (coupon) order.addCoupon(coupon)
        }
        return order.getTotal()
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