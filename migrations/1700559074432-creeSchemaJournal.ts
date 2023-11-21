import { MigrationInterface, QueryRunner } from "typeorm"

export class CreeSchemaJournal1700559074432 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createSchema("journal_nis2", true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropSchema("journal_nis2", true);
    }
}
