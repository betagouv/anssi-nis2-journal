import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm"
import {nomIndexTypeEvenement, nomSchema, nomTableEvenement} from "./constantes";
import {dans} from "./facilitateurs";

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
