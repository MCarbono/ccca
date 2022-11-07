import Dimesion from "../../../domain/entities/Dimension";
import Item from "../../../domain/entities/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";
import Connection from "../../database/Connection";

export default class ItemRepositoryDatabase implements ItemRepository {
    constructor(readonly connection: Connection) {}

    async getByIds(idItems: string): Promise<Item[]> {
        const databaseItems = await this.connection.query(`select * from ccca.item where id_item in (${idItems})`, [])
        const items: Item[] = []
        for(const databaseItem of databaseItems) {
            items.push(new Item(databaseItem.id_item, databaseItem.description, parseFloat(databaseItem.price), new Dimesion(databaseItem.width, databaseItem.height, databaseItem.length, databaseItem.weight)))
        }
        return items
    }
    
    async getById(idItem: number): Promise<Item> {
        const [itemData] = await this.connection.query("select * from ccca.item where id_item = $1", [idItem])
        return new Item(itemData.id_item, itemData.description, parseFloat(itemData.price), new Dimesion(itemData.width, itemData.height, itemData.length, itemData.weight))
    }

    save(item: Item): Promise<void> {
        throw new Error("Method not implemented.");
    }
}