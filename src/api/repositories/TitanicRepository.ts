import { Service } from 'typedi'
import { EntityRepository, Repository } from 'typeorm'

import { Titanic } from '../models/sample/Titanic'

@Service()
@EntityRepository(Titanic)
export class TitanicRepository extends Repository<Titanic> {
    public findAll(): Promise<Titanic[]> {
        return this.find()
    }

    public aggregateSurvived(): Promise<any[]> {
        return this.createQueryBuilder()
        .select(['Survived', 'COUNT(1) AS value'])
        .groupBy('Survived')
        .getRawMany()
    }

    public aggregateGender(): Promise<any[]> {
        return this.createQueryBuilder()
        .select(['Sex', 'COUNT(1) AS count', 'COUNT(IF(Survived = 1, Survived, NULL)) as Survived', 'COUNT(IF(Survived = 0, Survived, NULL)) as NotSurvived'])
        .groupBy('Sex')
        .getRawMany()
    }

    public aggregatePclass(): Promise<any[]> {
        return this.createQueryBuilder()
        .select(['Pclass', 'COUNT(1) AS count', 'COUNT(IF(Survived = 1, Survived, NULL)) as Survived', 'COUNT(IF(Survived = 0, Survived, NULL)) as NotSurvived'])
        .groupBy('Pclass')
        .getRawMany()
    }
}