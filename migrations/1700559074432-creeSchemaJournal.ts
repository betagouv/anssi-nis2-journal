import { MigrationInterface, QueryRunner } from "typeorm"
import {nomsEntites} from "../facilitateurs/constantes";

export class CreeSchemaJournal1700559074432 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log("VVV - Ici")
        await queryRunner.createSchema(nomsEntites.schemas, true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropSchema(nomsEntites.schemas, true);
    }
}
