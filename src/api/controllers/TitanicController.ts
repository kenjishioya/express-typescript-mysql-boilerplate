import { Service } from 'typedi'
import {
    Authorized,
    Get,
    JsonController
} from 'routing-controllers';

import { TitanicService } from '../services/TitanicService';

@Authorized()
@JsonController('/titanic')
@Service()
export class TitanicController {

    constructor(
        private titanicService: TitanicService
    ) {}

    @Get()
    async getAll() {
        const titanic = await this.titanicService.find()
        return titanic
    }

    @Get('/countSurvived')
    async countSurvived() {
        const count = await this.titanicService.countSurvived()
        return count
    }

    @Get('/countGender')
    async countGender() {
        const count = await this.titanicService.countGroupByGender()
        return count
    }

    @Get('/countPclass')
    async countPclass() {
        const count = await this.titanicService.countGroupByPclass()
        return count
    }

    @Get('/countBinnedAge')
    async countBinnedAge() {
        const count = await this.titanicService.countBinnedAge()
        return count
    }

    @Get('/importSampleData')
    async importSampleData() {
        const messaga = await this.titanicService.insertSampleData()
        return messaga
    }
}