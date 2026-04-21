import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { commonFields } from "../common.fields";

const tableName = 'admin.room_payments';


export class RoomPaymentMigration1776754686301 implements MigrationInterface {

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
                        name: 'room_tenant_id',
                        type: 'integer',
                        isNullable: false,
                    },
                     
                    {
                        name: 'amount',
                        type: 'decimal',
                        precision: 14,
                        scale: 2,
                        default: 0,
                        isNullable: true,
                    },
                     
                    {
                        name: 'month',
                        type: 'date',
                        isNullable: false,
                    },
                     
                    {
                        name: 'paid_date',
                        type: 'date',
                        default: null,
                        isNullable: true,
                    },
                     
                    {
                        name: 'note',
                        type: 'varchar',
                        length: '160',
                        default: null,
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
            { column: 'room_tenant_id', refTable: 'admin.room_tenants' },
            { column: 'status_id', refTable: 'admin.payment_statuses' },
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
