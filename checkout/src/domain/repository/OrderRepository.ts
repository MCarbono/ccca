import Order from "../entities/Order";

export default interface OrderRepository {
    getByCode(code: string): Promise<Order>
    save(order: Order): Promise<void>
    getByCpf(cpf: string): Promise<Order[]>
    count (): Promise<number>
    clear (): Promise<void>
}