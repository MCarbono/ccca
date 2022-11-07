import Coordinate from "./Coordinate";

export default class Zipcode {

    constructor(readonly code: string, readonly street: string, readonly neighborhood: string, readonly coordinate: Coordinate){}
}