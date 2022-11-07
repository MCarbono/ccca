import FreightCalculator from "../../src/domain/entities/FreightCalculator"

test("Should calculate the freight from a certain item volume, density and address distance", () => {
    const freight = FreightCalculator.calculate(0.03, 100, 748.2217780081631)
    expect(freight).toBe(22.446653340244893)
})

test("Should calculate the minimum freight of a item", () => {
    const freight = FreightCalculator.calculate(0.01, 100, 748.2217780081631) 
    expect(freight).toBe(10)
})

