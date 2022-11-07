import HttpRequestAdapter from "../../../shared/httpRequest/HttpRequestAdapter"

test("Should calculate the freight of several items", async () => {
    const data = {
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
    const request = new HttpRequestAdapter()
    const response = await request.Do("post",  "http://localhost:3002/calculateFreight", data)
    expect(response.total).toBe(202.09100894187753)
})