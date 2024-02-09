
type Select = {
    type: string, // example multiple select
    options: string[]
}

type SelectRange = {
    unit?: string,
    min: number,
    max: number
}




type SelectionVariable = {
    name: string,
    value: any ,
    type?: string,
    select?: Select,
    selectRange?: SelectRange,
    filled?: boolean;
}


type SubscriptionPlan = {
    id: number,
    name: string,
    price: string,
    description: string,
    features: string[],
}