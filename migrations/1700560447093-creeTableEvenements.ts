import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm"

const nomIndexTypeEvenement = "IDX_EVENEMENTS_TYPE";
const nomTableEvenement = "evenements";
const nomSchema = "journal_nis2";
const dans = (schemas: string) => ({t: (table: string) => `${schemas}.${table}`})


export class CreeTableEvenements1700560447093 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            schema: nomSchema,
            name: nomTableEvenement,
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: "date",
                    type: "timestamp",
                    default: "now()",
                },
                {
                    name: "type",
                    type: "text",
                },
                {
                    name: "donnees",
                    type: "jsonb",
                },
            ]
        }), true);
        await queryRunner.createIndex(dans(nomSchema).t(nomTableEvenement), new TableIndex({name: nomIndexTypeEvenement, columnNames: ["type"]}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(dans(nomSchema).t(nomTableEvenement), nomIndexTypeEvenement)
        await queryRunner.dropTable(dans(nomSchema).t(nomTableEvenement))
    }

}
