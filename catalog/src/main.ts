
import GetItem from "./application/GetItem";
import GetItems from "./application/GetItems";
import ItemController from "./infra/controller/ItemController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import ItemRepositoryDatabase from "./infra/repository/database/ItemRepository";

const connection = new PgPromiseAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);
const getItem = new GetItem(itemRepository)
const getItems = new GetItems(itemRepository)

const httpServer = new ExpressAdapter();
new ItemController(httpServer, getItem, getItems);
httpServer.listen(3001);