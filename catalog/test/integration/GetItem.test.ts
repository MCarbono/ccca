import GetItem from "../../src/application/GetItem"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import ItemRepositoryDatabase from "../../src/infra/repository/database/ItemRepository"

test("Should get an item by his id", async () => {
    const connection = new PgPromiseAdapter()
    const itemRepository = new ItemRepositoryDatabase(connection)
    const getItem = new GetItem(itemRepository)
    const item = await getItem.execute(1)
    expect(item.idItem).toBe(1)
    expect(item.price).toBe(1000)
    expect(item.volume).toBe(0.03)
    expect(item.density).toBe(100)
    connection.close()
})