import Zipcode from "../entities/Zipcode";

export default interface ZipcodeRepository {
	save (zipcode: Zipcode): Promise<void>;
	getByCode (code?: string): Promise<Zipcode>;
	getByCodes (codes: string): Promise<Zipcode[]>;
}