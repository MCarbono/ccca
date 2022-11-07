import StockCalculator from "../../src/domain/entities/StockCalculator";
import StockEntry from "../../src/domain/entities/StockEntry";

test("Should calculate the stock of an item", () => {
    const stockEntries = [
        new StockEntry(1, "in", 10),
        new StockEntry(1, "out", 10),
        new StockEntry(1, "in", 10),
    ]
    const total = StockCalculator.calculate(stockEntries)
    expect(total).toBe(10)
})