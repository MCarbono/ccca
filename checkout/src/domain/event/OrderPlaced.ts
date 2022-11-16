import DomainEvent from "./DomainEvent"
import Order from "../entities/Order"

export default class OrderPlaced implements DomainEvent {
    name = "orderPlaced"

    constructor(readonly order: Order, readonly total?: number) {
    }
}