
import GetItem from "../../application/GetItem";
import GetItems from "../../application/GetItems";
import HttpServer from "../http/HttpServer";

export default class ItemController {
    constructor(
        readonly httpServer: HttpServer,
        readonly getItem: GetItem,
        readonly getItems: GetItems
    ){
        httpServer.on("get", "/item/:idItem", async (params: any, body: any, query: any) => {
            return await getItem.execute(parseFloat(params.idItem))
        })

        httpServer.on("get", "/items", async (params: any, body: any, query: any) => {
            return await getItems.execute(query["ids"])
        })
    }

}