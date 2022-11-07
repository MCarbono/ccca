import CalculateFreight from "../../src/application/CalculateFreight"
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter"
import ZipcodeRepositoryDatabase from "../../src/infra/repository/database/ZipcodeRepository"

test("Should calculate the freight of an item", async() => {
    const connection = new PgPromiseAdapter()
    const zipcodeRepository = new ZipcodeRepositoryDatabase(connection)
    const calculateFreight = new CalculateFreight(zipcodeRepository)
    const input = {
        orderItems: [
            { 
                volume: 0.03, 
                density: 100,
                quantity: 1
            },
        ],
        from: "22060030",
        to: "88015600"
    }
    const freight = await calculateFreight.execute(input)
    expect(freight.total).toBe(22.446653340244892)
    await connection.close()
})

test("Should calculate the freight of several items", async() => {
    const connection = new PgPromiseAdapter()
    const zipcodeRepository = new ZipcodeRepositoryDatabase(connection)
    const calculateFreight = new CalculateFreight(zipcodeRepository)
    const input = {
        orderItems: [
            { 
                volume: 0.03, 
                density: 100,
                quantity: 1
            },
            { 
                volume: 0.125, 
                density: 160,
                quantity: 1
            },
            { 
                volume: 0.01, 
                density: 1,
                quantity: 3
            },
        ],
        from: "22060030",
        to: "88015600"
    }
    const freight = await calculateFreight.execute(input)
    expect(freight.total).toBe(202.09100894187753)
    await connection.close()
})

test("Should calculate the minimum freight of an item", async() => {
    const connection = new PgPromiseAdapter()
    const zipcodeRepository = new ZipcodeRepositoryDatabase(connection)
    const calculateFreight = new CalculateFreight(zipcodeRepository)
    const input = {
        orderItems: [
            { 
                volume: 0.01, 
                density: 1,
                quantity: 1
            },
        ],
        from: "22060030",
        to: "88015600"
    }
    const freight = await calculateFreight.execute(input)
    expect(freight.total).toBe(10)
    await connection.close()
})
