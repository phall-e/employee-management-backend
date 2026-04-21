import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { commonFields } from "../common.fields";

const tableName = 'admin.rooms';


export class RoomMigration1776735702059 implements MigrationInterface {

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
                        name: 'room_number',
                        type: 'varchar',
                        length: '160',
                        isUnique: true,
                        isNullable: false,
                    },
                     
                    {
                        name: 'building_id',
                        type: 'integer',
                        isNullable: false,
                    },

                    {
                        name: 'floor_id',
                        type: 'integer',
                        isNullable: false,
                    },

                    {
                        name: 'room_type_id',
                        type: 'integer',
                        isNullable: false,
                    },
                     
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 14,
                        scale: 2,
                        default: 0,
                        isNullable: false,
                    },
                     
                    {
                        name: 'status_id',
                        type: 'integer',
                        isNullable: false,
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
            { column: 'building_id', refTable: 'admin.buildings' },
            { column: 'floor_id', refTable: 'admin.floors' },
            { column: 'status_id', refTable: 'admin.room_statuses' },
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
