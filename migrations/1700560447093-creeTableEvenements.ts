import {MigrationInterface, QueryRunner, Table, TableIndex} from "typeorm"
import {nomIndexTypeEvenement, nomsEntites} from "../facilitateurs/constantes";
import {dans} from "../facilitateurs/facilitateurs";

export class CreeTableEvenements1700560447093 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            schema: nomsEntites.schemas,
            name: nomsEntites.tables.Evenements,
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
        await queryRunner.createIndex(dans(nomsEntites.schemas).t(nomsEntites.tables.Evenements), new TableIndex({name: nomIndexTypeEvenement, columnNames: ["type"]}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(dans(nomsEntites.schemas).t(nomsEntites.tables.Evenements), nomIndexTypeEvenement)
        await queryRunner.dropTable(dans(nomsEntites.schemas).t(nomsEntites.tables.Evenements))
    }

}
