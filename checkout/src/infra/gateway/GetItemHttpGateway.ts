import GetItemGateway from "../../application/gateway/GetItemGateway";
import Item from "../../domain/entities/Item";
import HttpRequest from "../../../../shared/httpRequest/HttpRequest"

export default class GetItemHttpGateway implements GetItemGateway {

    constructor(readonly httpRequest: HttpRequest){}

    async getItems(idItems: string): Promise<Item[]> {
        const response = await this.httpRequest.Do("get", `http://localhost:3001/items`, null, "ids", idItems)
        const items: Item[] = []
        for(const item of response) {
            items.push(new Item(item.idItem, item.description, item.price, item.volume, item.density))
        }
        return items
    }
    
    async getItem(idItem: number): Promise<Item> {
        const response = await this.httpRequest.Do("get", `http://localhost:3001/item/${idItem}`)
        return new Item(response.idItem, response.description, response.price, response.volume, response.density)
    }
}