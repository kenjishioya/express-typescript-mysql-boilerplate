import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Titanic } from '../models/sample/Titanic'
import { TitanicRepository } from '../repositories/TitanicRepository'
import {
    SurvivedValue,
    CountGender,
    CountPclass,
    CountBinnedAge
} from '../types/responses/titanic'

import orderBy from 'lodash/orderBy'
import { Logger, LoggerInterface } from '../../decorators/Logger';

import fs from 'fs'
import parse from 'csv-parse/lib/sync'

@Service()
export class TitanicService {
    constructor(
        @InjectRepository() private titanicRepository: TitanicRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {}

    public find(): Promise<Titanic[]> {
        return this.titanicRepository.findAll()
    }

    public async countSurvived(): Promise<SurvivedValue[]> {
        this.log.info('countSurvived start')
        const titanic = await this.titanicRepository.aggregateSurvived()
        return titanic.map(data => ({
            id: data.Survived === 0? 'NotSurvived':'Survived',
            label: data.Survived === 0? 'NotSurvived':'Survived',
            Survived: data.Survived,
            value: +data.value
        }))

    }

    public async countGroupByGender(): Promise<CountGender[]> {
        this.log.info('countGroupByGender start')
        const rawCountGender = await this.titanicRepository.aggregateGender()
        return rawCountGender.map(data => ({
            Sex: data.Sex,
            Count: +data.Count,
            Survived: +data.Survived,
            NotSurvived: +data.NotSurvived
        }))
    }

    public async countGroupByPclass(): Promise<CountPclass[]> {
        this.log.info('countGroupByPclass start')
        const rawCountPclass= await this.titanicRepository.aggregatePclass()
        return rawCountPclass.map(data => ({
            Pclass: data.Pclass,
            Count: +data.Count,
            Survived: +data.Survived,
            NotSurvived: +data.NotSurvived
        }))
    }

    public async countBinnedAge(): Promise<CountBinnedAge[]> {
        this.log.info('countBinnedAge start')
        const titanic = await this.titanicRepository.findAll()
        const ageBinnedTitanic = titanic.map(data => {
            const BinnedAge = Math.floor(+data.Age / 5) * 5
            return {...data, BinnedAge}
          })
          console.log('ageBinnedTitanic',ageBinnedTitanic)
        
          //groupBy
          let binnedAgeCount = ageBinnedTitanic.reduce((result: CountBinnedAge[], current) => {
        
            //部署がprevにあるか
            const element: CountBinnedAge | undefined = result.find((value: CountBinnedAge) => value.BinnedAge === current.BinnedAge);
        
            if (element) {
                //ある時（下記、初期データを操作）
                element.Count++;
                current.Survived === 1 ? element.Survived++ : element.NotSurvived++
            } else {
                //無いとき（新規に初期データを作成）
                const [Survived, NotSurvived] = current.Survived === 1 ? [1,0]: [0,1]
                result.push({
                  BinnedAge: current.BinnedAge,
                  Count: 1,
                  Survived,
                  NotSurvived
                })
            }
            return result;
        
          }, []); //初期値は[]
          return orderBy(binnedAgeCount, ['BinnedAge'], ['asc'])
    }

    public async insertSampleData() {
        const allData = await this.titanicRepository.findAll()
        if (allData.length > 0) return 'データが存在します。'

        if (fs.existsSync('./src/database/sampleData/train.csv')) {
            const rawData = fs.readFileSync('./src/database/sampleData/train.csv')
            const data = parse(rawData, { skipEmptyLines: true, from_line: 2 })
            const newData = data.map((row: string[]) => {
                const titanic = new Titanic()
                titanic.PassengerId = +row[0]
                titanic.Survived= +row[1]
                titanic.Pclass = +row[2]
                titanic.Name = row[3]
                titanic.Sex = row[4]
                titanic.Age = +row[5]
                titanic.SibSp = +row[6]
                titanic.Parch = +row[7]
                titanic.Ticket = row[8]
                titanic.Fare = +row[9]
                titanic.Cabin = row[10]
                titanic.Embarked = row[11]
                return titanic
            })
            console.log(newData)
            await this.titanicRepository.save(newData)
        }else{
            new Error('No file found for import data')
        }
        return 'データの作成が完了しました。'
    }
}