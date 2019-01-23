import { Action } from "@ngrx/store";
import { OrderProduct } from '../interfaces';

export namespace PRODUCT_ACTION {
    export const ADD_PRODUCT = 'ADD_PRODUCT'
    export const DELETE_PRODUCT = 'DELETE_PRODUCT'
}


export class AddProduct implements Action {
    readonly type = PRODUCT_ACTION.ADD_PRODUCT

    constructor(public payload: OrderProduct) {}
}

export class DeleteProduct implements Action {
    readonly type = PRODUCT_ACTION.DELETE_PRODUCT

    constructor(public payload: OrderProduct) {}
}


export type ProductAction = AddProduct | DeleteProduct