
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
    type?: string,
    price: string,
    description: string,
    features: string[],
}


type RequestDemoObj = {
    organizationName: string,
    requestorRole: string,
    domainName?: string,
    requestorName: string,
    requestorProfessionalEmail: string,
    requestorTemporaryPassword: string,
    requestorTemporaryPasswordConfirm: string,
    subscriptionType?: string
}