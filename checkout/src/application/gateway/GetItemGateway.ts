import Item from "../../domain/entities/Item";

export default interface GetItemGateway {
    getItem(idItem: number): Promise<Item>
    getItems(idItems: string): Promise<Item[]>
}