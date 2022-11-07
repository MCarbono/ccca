import DistanceCalculator from "../domain/entities/DistanceCalculator";
import FreightCalculator from "../domain/entities/FreightCalculator";
import ZipcodeRepository from "../domain/repository/ZipcodeRepository";

export default class CalculateFreight {

    constructor(
        readonly zipcodeRepository: ZipcodeRepository
    ) {}

    async execute(input: Input): Promise<Output> {
        let freight = 0
        const zipcodes = await this.zipcodeRepository.getByCodes(`${input.from},${input.to}`)
        const from = zipcodes.find(zipcode => zipcode.code == input.from)
        if (!from) throw new Error(`Zipcode ${input.from} was not found`)
        const to = zipcodes.find(zipcode => zipcode.code == input.to)
        if (!to) throw new Error(`Zipcode ${input.to} was not found`)
        const distance = DistanceCalculator.calculate(from.coordinate, to.coordinate)
        for(const orderItem of input.orderItems) {
            freight += FreightCalculator.calculate(orderItem.volume, orderItem.density, distance) * orderItem.quantity
        }
        return {
            total: freight
        }
    }
}

type Input = {
    orderItems: {  volume: number, density: number, quantity: number }[]
    from: string
    to: string
}

type Output = {
    total: number
}