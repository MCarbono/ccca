import Connection from "../../src/infra/database/Connection";

export default async function clearDatabaseTable(connection: Connection, tableName: string): Promise<void> {
    await connection.query(`delete from ${tableName}`, [])
}