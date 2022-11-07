import HttpRequestAdapter from "../../../shared/httpRequest/HttpRequestAdapter"

test("Should get an item by api endpoint", async () => {
    const request = new HttpRequestAdapter()
    const response = await request.Do("get",  "http://localhost:3001/item/1")
    expect(response.idItem).toBe(1)
    expect(response.price).toBe(1000)
    expect(response.volume).toBe(0.03)
    expect(response.density).toBe(100)
})

test("Should get items by api endpoint", async () => {
    const request = new HttpRequestAdapter()
    const response = await request.Do("get",  "http://localhost:3001/items", null, "ids", "1,2")
    expect(response[0].idItem).toBe(1)
    expect(response[0].price).toBe(1000)
    expect(response[0].volume).toBe(0.03)
    expect(response[0].density).toBe(100)
    expect(response[1].idItem).toBe(2)
    expect(response[1].price).toBe(5000)
    expect(response[1].volume).toBe(0.125)
    expect(response[1].density).toBe(160)
})