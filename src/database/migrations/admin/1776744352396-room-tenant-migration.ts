import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { commonFields } from "../common.fields";

const tableName = 'admin.room_tenants';


export class RoomTenantMigration1776744352396 implements MigrationInterface {

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
                        name: 'room_id',
                        type: 'integer',
                        isNullable: false,
                    },
                     
                    {
                        name: 'tenant_name',
                        type: 'varchar',
                        length: '160',
                        isNullable: false,
                    },
                     
                    {
                        name: 'phone_number',
                        type: 'varchar',
                        length: '160',
                        isNullable: false,
                    },
                     
                    {
                        name: 'id_card_number',
                        type: 'varchar',
                        length: '160',
                        isNullable: false,
                    },
                     
                    {
                        name: 'start_date',
                        type: 'date',
                        default: null,
                        isNullable: true,
                    },
                     
                    {
                        name: 'deposit_amount',
                        type: 'decimal',
                        precision: 14,
                        scale: 2,
                        default: 0,
                        isNullable: false,
                    },
                     
                    {
                        name: 'profile',
                        type: 'varchar',
                        isNullable: true,
                    },
                     
                    {
                        name: 'attachments',
                        type: 'jsonb',
                        isNullable: true,
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
            { column: 'room_id', refTable: 'admin.rooms' },
            { column: 'status_id', refTable: 'admin.tenant_statuses' },
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
