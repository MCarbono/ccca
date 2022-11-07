import RabbitMQAdapter from "../../shared/queue/RabbitMQAdapter";
import DecrementStock from "./application/DecrementStock";
import QueueController from "./infra/controller/QueueController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import StockEntryDatabase from "./infra/repository/database/StockEntryDatabase";

;
(async () => {
    const connection = new PgPromiseAdapter()
    const stockRepository = new StockEntryDatabase(connection)
    const decrementStock = new DecrementStock(stockRepository)
    const queue = new RabbitMQAdapter()
    await queue.connect()
    new QueueController(queue, decrementStock)
    const httpServer = new ExpressAdapter();
    httpServer.listen(3003);
})();
