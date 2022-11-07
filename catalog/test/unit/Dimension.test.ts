import Dimesion from "../../src/domain/entities/Dimension"

test("Should not create an dimension with a invalid width", () => {
    expect(() => new Dimesion(-1, 10, 10, 10)).toThrow(new Error("Invalid dimension"))
})

test("Should not create an dimension with a invalid height", () => {
    expect(() => new Dimesion(10, -1, 10, 10)).toThrow(new Error("Invalid dimension"))
})

test("Should not create an dimension with a invalid length", () => {
    expect(() => new Dimesion(10, 10, -1, 10)).toThrow(new Error("Invalid dimension"))
})

test("Should not create an dimension with a invalid weight", () => {
    expect(() => new Dimesion(10, 10, 10, -1)).toThrow(new Error("Invalid dimension"))
})