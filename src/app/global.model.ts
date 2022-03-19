export class field {
    _id?:any;
    name?:any;
    type?:any;
    icon?:any;
    toggle?:any;
    required?:any;
    validation?:any;
    regex?:any;
    errorText?:any;
    label?:any;
    description?:any;
    placeholder?:any;
    className?:any;
    subtype?:any;
    handle?:any;
    min?:number;
    max?:number;
    inline?:any;
    value?:any;
    values?:Array<value>;
}

export class value{
    label?:any="";
    value?:any="";
}
export class section {
    name?: any = '';
    description?: any = '';
    id?: any = '';
    attributes?: field[] = [];
}