import ItemRepository from "../domain/repository/ItemRepository";
import ItemDTO from "./itemDTO";

export default class GetItems {

    constructor(readonly itemRepository: ItemRepository){
    }

    async execute(idItems: string): Promise<ItemDTO[]> {
        const items = await this.itemRepository.getByIds(idItems)
        return ItemDTO.fromEntities(items)
    }
}
