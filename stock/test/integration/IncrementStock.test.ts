import DecrementStock from "../../src/application/DecrementStock"
import GetStock from "../../src/application/GetStock"
import IncrementStock from "../../src/application/IncrementStock"
import StockRepository from "../../src/domain/repository/StockRepository"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import StockEntryDatabase from "../../src/infra/repository/database/StockEntryDatabase"

let connection: PgPromiseAdapter
let stockRepository: StockRepository

beforeEach(async () => {
    connection = new PgPromiseAdapter()
    stockRepository = new StockEntryDatabase(connection)
})

afterEach(async() => {
    await stockRepository.clear()
    await connection.close()
})

test("Should increment an item in stock", async () => {
    const input = {
        order: {
            orderItems: [
                {
                    idItem: 1,
                    quantity: 10
                }
            ]
        }
    }
    const incrementStock = new IncrementStock(stockRepository)
    await incrementStock.execute(input)
    const getStock = new GetStock(stockRepository)
    const stock = await getStock.execute(1)
    expect(stock.total).toBe(10)
})