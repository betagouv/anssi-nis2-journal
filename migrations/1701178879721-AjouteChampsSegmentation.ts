import {MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex} from "typeorm"
import {nomsEntites} from "../facilitateurs/constantes";
import {dans} from "../facilitateurs/facilitateurs";

const segmentsEvenementsResultatsTests = [
    {nom: "secteur", nullable: false},
    {nom: "sousSecteur", nullable: true},
    {nom: "typeStructure", nullable: false},
    {nom: "trancheNombreEmployes", nullable: false},
    {nom: "trancheChiffreAffaire", nullable: true},
];

export class AjouteChampsSegmentation1701178879721 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const colonnesSegments = segmentsEvenementsResultatsTests.map(
            (segment) => ({name: segment.nom, type: "text", isNullable: segment.nullable}))
        await queryRunner.createTable(new Table({
            schema: nomsEntites.schemas,
            name: nomsEntites.tables.segmentsConcernesNis2,
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
            dans(nomsEntites.schemas).t(nomsEntites.tables.segmentsConcernesNis2),
            new TableForeignKey({
                columnNames: ["evenementId"],
                referencedColumnNames: ["id"],
                referencedTableName: dans(nomsEntites.schemas).t(nomsEntites.tables.Evenements),
                onDelete: "CASCADE",
            }),
        )

        for (const segment of segmentsEvenementsResultatsTests) {
            await queryRunner.createIndex(dans(nomsEntites.schemas).t(nomsEntites.tables.segmentsConcernesNis2), new TableIndex({
                name: `IDX_${nomsEntites.tables.segmentsConcernesNis2}_${segment.nom}`,
                columnNames: [segment.nom]
            }));

        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const nomTable = dans(nomsEntites.schemas).t(nomsEntites.tables.segmentsConcernesNis2);
        const table = await queryRunner.getTable(nomTable)

        if (!table) throw Error()
        const foreignKey = table.foreignKeys.find(
            (fk) => fk.columnNames.indexOf("evenementId") !== -1,
        )
        if (!foreignKey) throw Error()
        await queryRunner.dropForeignKey(nomTable, foreignKey)
        for (const segment of segmentsEvenementsResultatsTests) {
            await queryRunner.dropIndex(nomTable, `IDX_${nomsEntites.tables.segmentsConcernesNis2}_${segment.nom}`);
        }
        await queryRunner.dropTable(nomTable)
    }

}
