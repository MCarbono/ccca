import Coordinate from "../../../domain/entities/Coordinate";
import Zipcode from "../../../domain/entities/Zipcode";
import ZipcodeRepository from "../../../domain/repository/ZipcodeRepository";
import Connection from "../../database/Connection";

export default class ZipcodeRepositoryDatabase implements ZipcodeRepository {

	constructor (readonly connection: Connection) {
	}


	save(zipcode: Zipcode): Promise<void> {
		throw new Error("Method not implemented.");
	}

	async getByCode(code: string): Promise<Zipcode> {
		const [zipcodeData] = await this.connection.query("select * from ccca.zipcode where code = $1", [code]);
		if (!zipcodeData) throw new Error("Zipcode not found");
		const zipcode = new Zipcode(zipcodeData.code, zipcodeData.street, zipcodeData.neighborhood, new Coordinate(parseFloat(zipcodeData.lat), parseFloat(zipcodeData.long)));
		return zipcode;
	}

	async getByCodes(codes: string): Promise<Zipcode[]> {
		const databaseZipCodes = await this.connection.query(`select * from ccca.zipcode where code::integer in (${codes})`, [])
        const zipcodes: Zipcode[] = []
        for(const databaseZipCode of databaseZipCodes) {
            zipcodes.push(new Zipcode(databaseZipCode.code, databaseZipCode.street, databaseZipCode.neighborhood, new Coordinate(parseFloat(databaseZipCode.lat), parseFloat(databaseZipCode.long))))
        }
        return zipcodes
	}
}