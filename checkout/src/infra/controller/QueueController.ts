import Queue from "../../../../shared/queue/Queue";
import Checkout from "../../application/Checkout";
import OrderProjection from "../../application/OrderProjection";


export default class QueueController {

    constructor(
        readonly queue: Queue, 
        readonly checkout: Checkout,
        readonly orderProjection: OrderProjection
    ) {
        queue.on("placeOrder", "placeOrder.checkout", async function(msg: any) {
            await checkout.execute(msg)
        })
        queue.on("orderPlaced", "orderPlaced.orderProjection", async function(msg: any) {
            await orderProjection.execute(msg)
        })
    }
}