import ItemRepository from "../domain/repository/ItemRepository";
import ItemDTO from "./itemDTO";

export default class GetItem {

    constructor(readonly itemRepository: ItemRepository){}

    async execute(idItem: number): Promise<ItemDTO> {
        const item = await this.itemRepository.getById(idItem)
        return ItemDTO.fromEntity(item)
    }
}

