export enum wherePlace {
    // вместо
    instead = 'instead',
    // Внутри до
    insideFront = 'insideFront',
    // Внутри после
    insideAfter = 'insideAfter',
}

export interface MetaPlace {
    selector: string,
    count?: number,
    wherePlace: wherePlace,
    html: string
    priority: number;
    delete?: boolean;
}
export interface InputModel{
    value: string;
    error: {
        message: string[];
        flag: boolean;
    }
    name: string;
    label?: string;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    unique?: boolean
}

export function inputParse(body: any, params: InputModel[], ){

}