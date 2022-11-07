import StockEntry from "./StockEntry";

export default class StockCalculator {

    static calculate(stockEntries: StockEntry[]) {
        let total = 0;
        for (const stockEntry of stockEntries) {
            stockEntry.operation == "in" ? total += stockEntry.quantity : total -= stockEntry.quantity
        }
        return total
    }
}