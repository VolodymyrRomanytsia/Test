import { Action } from "@ngrx/store";
import { OrderProduct, Product } from '../interfaces';

export namespace PRODUCT_ACTION {
    export const ADD_PRODUCT = 'ADD_PRODUCT'
    export const DELETE_PRODUCT = 'DELETE_PRODUCT'
    export const ADD_VIEWED_PRODUCT = 'ADD_VIEWED_PRODUCT'
}


export class AddProduct implements Action {
    readonly type = PRODUCT_ACTION.ADD_PRODUCT

    constructor(public payload: OrderProduct) {}
}

export class DeleteProduct implements Action {
    readonly type = PRODUCT_ACTION.DELETE_PRODUCT

    constructor(public payload: OrderProduct) {}
}

export class AddViewedProduct implements Action {
    readonly type = PRODUCT_ACTION.ADD_VIEWED_PRODUCT

    constructor(public payload: Product) {}
}


export type ProductAction = AddProduct | DeleteProduct | AddViewedProduct