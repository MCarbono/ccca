export default interface CalculateFreightGateway {
    calculate(input: Input): Promise<number>
}

export type Input = {
    from: string,
    to: string,
    orderItems: {
        volume?: number,
        density?: number,
        quantity: number
    }[]
}