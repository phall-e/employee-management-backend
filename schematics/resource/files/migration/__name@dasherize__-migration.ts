import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { commonFields } from "../common.fields";

const tableName = 'admin.<%= dasherize(name) %>';


export class <%= classify(name) %>Migration<%= timestamp %> implements MigrationInterface {

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
                    <% fields.forEach(field => { %> 
                    {
                        name: '<%= dasherize(field) %>',
                        type: 'varchar',
                        isNullable: false,
                    },
                    <% }) %>
                    ...commonFields,
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(tableName);
        if (!table) return;

        await queryRunner.dropTable(tableName, true);
    }

}
