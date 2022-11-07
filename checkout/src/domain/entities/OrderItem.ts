export default class OrderItem {
    constructor(readonly idItem: number, readonly price: number, readonly quantity: number){
        if(this.quantity < 1) throw new Error("Invalid item quantity")
    }

    calculate() {
        return this.price * this.quantity
    }
}