import StockEntry from "../../../domain/entities/StockEntry";
import StockRepository from "../../../domain/repository/StockRepository";
import Connection from "../../database/Connection";

export default class StockEntryDatabase implements StockRepository {

    constructor(readonly connection: Connection){}

    async getStockEntries(idItem: number): Promise<StockEntry[]> {
        const entries = await this.connection.query("select * from ccca.stock_entry where id_item = $1", [idItem])
        const stockEntries = []
        for (const entry of entries) {
            stockEntries.push(new StockEntry(entry.idItem, entry.operation, entry.quantity))
        }
        return stockEntries
    }
    
    async save(stockEntry: StockEntry): Promise<void> {
        await this.connection.query("insert into ccca.stock_entry(id_item, operation, quantity) values ($1, $2, $3)", [stockEntry.idItem, stockEntry.operation, stockEntry.quantity])
    }

    async clear(): Promise<void> {
        await this.connection.query("delete from ccca.stock_entry", [])
    }
}