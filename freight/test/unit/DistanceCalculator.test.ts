import Coordinate from "../../src/domain/entities/Coordinate"
import DistanceCalculator from "../../src/domain/entities/DistanceCalculator"

test("Should calculate the distance between two destinations", () => {
    const from = new Coordinate(-22.9129, -43.2003)
    const to = new Coordinate(-27.5945, -48.5477)
    const distance = DistanceCalculator.calculate(from, to)
    expect(distance).toBe(748.2217780081631)
})