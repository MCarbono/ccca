import Queue from "../../../../shared/queue/Queue";
import Checkout from "../../application/Checkout";


export default class QueueController {

    constructor(readonly queue: Queue, checkout: Checkout) {
        queue.on("placeOrder", "placeOrder.checkout", async function(msg: any) {
            await checkout.execute(msg)
        })
    }
}