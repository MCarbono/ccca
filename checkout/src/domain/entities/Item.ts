export default class Item {
    constructor(
        readonly idItem: number, 
        readonly description: string, 
        readonly price: number,
        readonly volume?: number,
        readonly density?: number,
    ){}

    
}