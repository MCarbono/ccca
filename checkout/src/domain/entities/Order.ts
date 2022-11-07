import Coupon from "./Coupon"
import Cpf from "./Cpf"
import Item from "./Item"
import OrderCode from "./OrderCode"
import OrderCoupon from "./OrderCoupon"
import OrderItem from "./OrderItem"

export default class Order {
    orderItems: OrderItem[]
    coupon?: OrderCoupon
    freight
    cpf: Cpf
    code: OrderCode
 
    constructor(cpf: string, readonly date: Date = new Date(), readonly sequence: number = 1){
        this.cpf = new Cpf(cpf)
        this.orderItems = []
        this.freight = 0
        this.code = new OrderCode(date, sequence)
    }

    addItem(item: Item, quantity: number){
        if (this.isItemAlreadyInOrder(item.idItem)) throw new Error("Item already in the order")
        this.orderItems.push(new OrderItem(item.idItem, item.price, quantity))
    }

    addCoupon(coupon: Coupon) {
        if (coupon.isExpired(this.date)) return
        this.coupon = new OrderCoupon(coupon.code, coupon.percentage)
    }

    getTotal() {
        let total = this.orderItems.reduce((total, orderItem) => {
            total += orderItem.calculate()
            return total
        }, 0)
        total += this.freight;
        if (this.coupon) total -= this.coupon.calculateDiscount(total)
        return total
    }

    private isItemAlreadyInOrder(idItem: number) {
        return this.orderItems.some(orderItem => orderItem.idItem === idItem)
    }
}