import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { commonFields } from "../common.fields";

const tableName = 'admin.room_types';


export class RoomTypeMigration1776732497915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                        isNullable: false,
                    },
                     
                    {
                        name: 'code',
                        type: 'varchar',
                        length: '160',
                        isUnique: true,
                        isNullable: false,
                    },
                     
                    {
                        name: 'name_en',
                        type: 'varchar',
                        length: '160',
                        isNullable: false,
                    },
                     
                    {
                        name: 'name_kh',
                        type: 'varchar',
                        length: '160',
                        isNullable: false,
                    },
                     
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '160',
                        isNullable: true,
                    },
                    
                    {
                        name: 'created_by_user_id',
                        type: 'integer',
                        isNullable: false,
                    },
                    ...commonFields,
                ],
            }),
            true,
        );

        const foreignKeys = [
            { column: 'created_by_user_id', refTable: 'admin.users' },
        ];  

        for (const fk of foreignKeys) {
            await queryRunner.createForeignKey(
                tableName,
                new TableForeignKey({
                    columnNames: [fk.column],
                    referencedColumnNames: ['id'],
                    referencedTableName: fk.refTable,
                    onDelete: 'SET NULL'
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(tableName);
        if (table) {
            for (const fk of table.foreignKeys) {
                await queryRunner.dropForeignKey(tableName, fk);
            }
            await queryRunner.dropTable(tableName);
        }
    }

}
