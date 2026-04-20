import { BaseEntity } from "@database/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm";
import { UserEntity } from "@modules/admin/system/user/entities/user.entity";

@Entity({
    schema: 'admin',
    name: '<%= dasherize(name) %>',
})
export class <%= classify(name) %>Entity extends BaseEntity {

    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: number;
<% fields.forEach(function(field){ %>
    @Column({
        name: '<%= dasherize(field) %>',
        type: 'varchar',
        length: 160,
        nullable: false,
    })
    <%= camelize(field) %>: string;
<% }) %>
    @Column({
        name: 'created_by_user_id',
        type: 'integer',
        nullable: false,
    })
    createdByUserId: number;

    @ManyToOne(() => UserEntity, { nullable: true, eager: true })
    @JoinColumn({
        name: 'created_by_user_id',
    })
    createdByUser: UserEntity;

    constructor(partial?: Partial<<%= classify(name) %>Entity>) {
        super();
        Object.assign(this, partial);
    }
}