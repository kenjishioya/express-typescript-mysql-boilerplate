import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'titanic' })
export class Titanic {

    @PrimaryColumn()
    public PassengerId: number;

    @IsNotEmpty()
    @Column()
    public Survived: number;

    @Column({
        nullable: true
    })
    public Pclass: number;

    @Column({
        nullable: true
    })
    public Name: string;

    @Column({
        nullable: true
    })
    public Sex: string;

    @Column({
        nullable: true
    })
    public Age: number;

    @Column({
        nullable: true
    })
    public SibSp: number;

    @Column({
        nullable: true
    })
    public Parch: number;

    @Column({
        nullable: true
    })
    public Ticket: string;

    @Column({
        nullable: true
    })
    public Fare: number;

    @Column({
        nullable: true
    })
    public Cabin: string;

    @Column({
        nullable: true
    })
    public Embarked: string;

}
