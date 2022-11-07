import StockEntry from "../entities/StockEntry";

export default interface StockRepository {
    getStockEntries(idItem: number): Promise<StockEntry[]>
    save(stockEntry: StockEntry): Promise<void>
    clear(): Promise<void>
}