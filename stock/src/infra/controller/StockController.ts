import HttpServer from "../http/HttpServer";

export default class StockController {
    constructor(
        readonly httpServer: HttpServer,
    ){
        // httpServer.on("post", "/calculateFreight", async (params: any, body: any) => {
        //     return freight
        // }) 
    }

}