import HttpRequestAdapter from "../../../shared/httpRequest/HttpRequestAdapter"
import Queue from "../../../shared/queue/Queue"
import Item from "../../src/domain/entities/Item"
import CalculateFreightHttpGateway from "../../src/infra/gateway/CalculateFreightHttpGateway"
import GetItemHttpGateway from "../../src/infra/gateway/GetItemHttpGateway"

const items: Item[] = [
    new Item(1, "Guitarra", 1000, 0.03, 100),
    new Item(2, "Amplificador", 5000, 0.125, 160),
    new Item(3, "Cabo", 30, 0.001, 1000),
]

const getItemGateway: GetItemHttpGateway = {
    async getItems() {
        return items
    },
    httpRequest: new HttpRequestAdapter(),
    async getItem(idItem) {
        const item = items.find(item => item.idItem == idItem)
        if(!item) throw new Error()
        return item
    },
}

const calculateFreightGateway: CalculateFreightHttpGateway = {
    httpRequest: new HttpRequestAdapter(),
    async calculate() {
        return 202.091008941878
    }

}

const queue: Queue = {
    async publish () {
        return
    },
    async close() {
        return
    },
    async connect() {
        return 
    },
    async on() {
        return
    }
}

export { getItemGateway, calculateFreightGateway, queue }