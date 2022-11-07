import Queue from "../../../../shared/queue/Queue";
import DecrementStock from "../../application/DecrementStock";

export default class QueueController {

    constructor(
        readonly queue: Queue,
        readonly decrementStock: DecrementStock
    ){
        queue.on("orderPlaced", "orderPlaced.decrementStock", async function(msg: any) {
            await decrementStock.execute(msg)
        })
    }
}