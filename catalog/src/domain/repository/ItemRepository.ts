import Item from "../entities/Item";

export default interface ItemRepository {
    getById(idItem: number): Promise<Item>
    getByIds(idItem: string): Promise<Item[]>
    save(item: Item): Promise<void>
}