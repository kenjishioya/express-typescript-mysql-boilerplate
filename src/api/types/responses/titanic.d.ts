export interface SurvivedValue {
    id: string
    label: string
    Survived: number
    value: number
}

export interface CountGender {
    Sex: string
    Count: number
    Survived: number
    NotSurvived: number
}

export interface CountPclass {
    Pclass: string
    Count: number
    Survived: number
    NotSurvived: number
}

export interface CountBinnedAge {
    BinnedAge: number
    Count: number
    Survived: number
    NotSurvived: number
}