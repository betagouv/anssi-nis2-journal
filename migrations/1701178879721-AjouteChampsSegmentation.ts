import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm"
import {nomsEntites} from "../facilitateurs/constantes";
import {dans} from "../facilitateurs/facilitateurs";

const nomSegments = [
    "secteur",
    "sousSecteur",
    "typeStructure",
    "trancheNombreEmploye",
    "trancheChiffreAffaire",
];

export class AjouteChampsSegmentation1701178879721 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const colonnesSegments = nomSegments.map((nom) => ({name: nom, type: "text"}))
        await queryRunner.createTable(new Table({
            schema: nomsEntites.schemas,
            name: nomsEntites.tables.Nis2Concernes,
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "evenementId",
                    type: "int",
                },
                ...colonnesSegments,
            ]
        }), true);
        await queryRunner.createForeignKey(
            dans(nomsEntites.schemas).t(nomsEntites.tables.Nis2Concernes),
            new TableForeignKey({
                columnNames: ["evenementId"],
                referencedColumnNames: ["id"],
                referencedTableName: dans(nomsEntites.schemas).t(nomsEntites.tables.Evenements),
                onDelete: "CASCADE",
            }),
        )

        for(const nom of nomSegments) {
            await queryRunner.createIndex(dans(nomsEntites.schemas).t(nomsEntites.tables.Nis2Concernes), new TableIndex({
                name: `IDX_${nomsEntites.tables.Nis2Concernes}_${nom}`,
                columnNames: [nom]
            }));

        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(nomsEntites.tables.Nis2Concernes)
        const nomTable = dans(nomsEntites.schemas).t(nomsEntites.tables.Nis2Concernes);

        if (!table) throw Error()
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("evenementId") !== -1,
        )
        if (!foreignKey) throw Error()
        await queryRunner.dropForeignKey(nomTable, foreignKey)
        for(const nom of nomSegments) {
            await queryRunner.dropIndex(nomTable, `IDX_${nomsEntites.tables.Nis2Concernes}_${nom}`);
        }
        await queryRunner.dropTable(nomTable)
    }

}
