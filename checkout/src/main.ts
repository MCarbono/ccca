import Checkout from "./application/Checkout";
import GetOrdersByCpf from "./application/GetOrdersByCpf";
import Preview from "./application/Preview";

import OrderController from "./infra/controller/OrderController";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HttpRequestAdapter from "../../shared/httpRequest/HttpRequestAdapter";
import GetItemHttpGateway from "./infra/gateway/GetItemHttpGateway";
import CalculateFreightHttpGateway from "./infra/gateway/CalculateFreightHttpGateway";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import OrderRepositoryDatabase from "./infra/repository/database/OrderRepository";
import CouponRepositoryDatabase from "./infra/repository/database/CouponRepository";
import RabbitMQAdapter from "../../shared/queue/RabbitMQAdapter";
import QueueController from "./infra/controller/QueueController";
import GetOrdersByCpfQuery from "./application/query/GetOrdersByCpfQuery";
import OrderProjection from "./application/OrderProjection";

;
(async () => {
    const httpRequestAdapter = new HttpRequestAdapter()
    const connection = new PgPromiseAdapter()
    const getItemGateway = new GetItemHttpGateway(httpRequestAdapter)
    const calculateFreightGateway = new CalculateFreightHttpGateway(httpRequestAdapter)
    const orderRepository = new OrderRepositoryDatabase(connection)
    const couponRepository = new CouponRepositoryDatabase(connection)
    const queue = new RabbitMQAdapter()
    await queue.connect()
    
    const preview = new Preview(orderRepository, getItemGateway, couponRepository, calculateFreightGateway);
    const checkout = new Checkout(orderRepository, getItemGateway, couponRepository, calculateFreightGateway, queue)
    const orderProjection = new OrderProjection(connection)
    const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
    const getOrdersByCpfQuery = new GetOrdersByCpfQuery(connection)

    const httpServer = new ExpressAdapter();
    new OrderController(httpServer, preview, checkout, getOrdersByCpf, getOrdersByCpfQuery, queue);
    new QueueController(queue, checkout, orderProjection)
    httpServer.listen(3000);
})();
