import Connection from "../../infra/database/Connection";

export default class GetOrdersByCpfQuery {

    constructor(readonly connection: Connection){}

    async execute(cpf: string): Promise<Output[]> {
        const getOrdersByCpfDTO = await this.connection.query("select * from ccca.order_projection where cpf = $1", [cpf])
        return getOrdersByCpfDTO
    }
}

type Output = {
    code: string
    cpf: string
    order: {
        orderItems: { id: number, price: number, quantity: number }[]
        coupon?: { code: string, percentage: number }
        date?: Date
        freight: number
        sequence: number
        total: number
    }
}