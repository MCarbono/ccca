import Connection from "../infra/database/Connection";


export default class OrderProjection {

   constructor(readonly connection: Connection) {}

   async execute(input: Input) {
      const orderProjection = {
         orderItems: input.order.orderItems,
         date: input.order.date,
         freight: input.order.freight,
         coupon: input.order.coupon,
         sequence: input.order.sequence,
         total: input.total
      }
      await this.connection.query("insert into ccca.order_projection (cpf, code, data) values ($1, $2, $3)", [input.order.cpf.value, input.order.code.value, JSON.stringify(orderProjection)])
   }
}

type Input = {
   order: {
      cpf: { value: string }
      orderItems: { id: number, price: number, quantity: number }[]
      coupon?: { code: string, percentage: number }
      date?: Date
      code: { value: string }
      freight: number,
      sequence: number,
   }
   total: number,
}