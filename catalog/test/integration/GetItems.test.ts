import GetItems from "../../src/application/GetItems"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepository"

test.only("Should get items by his ids", async () => {
    const connection = new PgPromiseAdapter()
    const itemRepository = new ItemRepositoryDatabase(connection)
    const getItems = new GetItems(itemRepository)
    const ids =  "1,2"
    const items = await getItems.execute(ids)
    expect(items[0].idItem).toBe(1)
    expect(items[0].price).toBe(1000)
    expect(items[0].volume).toBe(0.03)
    expect(items[0].density).toBe(100)
    expect(items[1].idItem).toBe(2)
    expect(items[1].price).toBe(5000)
    expect(items[1].volume).toBe(0.125)
    expect(items[1].density).toBe(160)
    connection.close()
})