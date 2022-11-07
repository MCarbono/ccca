import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import ZipcodeRepositoryDatabase from "./infra/repository/database/ZipcodeRepository";
import CalculateFreight from "./application/CalculateFreight";
import FreightController from "./infra/controller/FreightController";

const connection = new PgPromiseAdapter();
const zipcodeRepository = new ZipcodeRepositoryDatabase(connection)
const httpServer = new ExpressAdapter();
const calculateFreight = new CalculateFreight(zipcodeRepository)
new FreightController(httpServer, calculateFreight);

httpServer.listen(3002);