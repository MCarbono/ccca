import Dimesion from "../../src/domain/entities/Dimension"
import Item from "../../src/domain/entities/Item"

test("Should calculate the volume from an item", () => {
    const item = new Item(1, "Guitarra", 1000, new Dimesion(100, 30, 10, 3))
    expect(item.getVolume()).toBe(0.03)
})

test("Should calculate the density from an item", () => {
    const item = new Item(1, "Guitarra", 1000, new Dimesion(100, 30, 10, 3))
    expect(item.getDensity()).toBe(100)
})