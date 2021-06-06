import {MigrationInterface, QueryRunner} from "typeorm";

export class Sample1622961886919 implements MigrationInterface {
    name = 'Sample1622961886919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `titanic` (`PassengerId` int NOT NULL, `Survived` int NOT NULL, `Pclass` int NULL, `Name` varchar(255) NULL, `Sex` varchar(255) NULL, `Age` int NULL, `SibSp` int NULL, `Parch` int NULL, `Ticket` varchar(255) NULL, `Fare` int NULL, `Cabin` varchar(255) NULL, `Embarked` varchar(255) NULL, PRIMARY KEY (`PassengerId`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `titanic`");
    }

}
