import HttpRequest from "../../../../shared/httpRequest/HttpRequest";
import CalculateFreightGateway, { Input } from "../../application/gateway/CalculateFreightGateway";

export default class CalculateFreightHttpGateway implements CalculateFreightGateway {

    constructor(readonly httpRequest: HttpRequest) {}

    async calculate(input: Input): Promise<number> {
        const response = await this.httpRequest.Do("post", `http://localhost:3002/calculateFreight`, input)
        return response.total
    }
}