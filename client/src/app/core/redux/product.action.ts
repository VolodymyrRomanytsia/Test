import { Action } from "@ngrx/store";
import { OrderProduct, Product } from '../interfaces';

export namespace PRODUCT_ACTION {
    export const LOAD_PRODUCTS = 'LOAD_PRODUCTS'
    export const ADD_PRODUCT = 'ADD_PRODUCT'
    export const DELETE_PRODUCT = 'DELETE_PRODUCT'
    export const ADD_VIEWED_PRODUCT = 'ADD_VIEWED_PRODUCT'
    export const FILTER_MINMAX_PRODUCT = 'FILTER_MINMAX_PRODUCT'
    export const SORT_MINMAX_PRODUCT = 'SORT_MINMAX_PRODUCT'
    export const SORT_MAXMIN_PRODUCT = 'SORT_MAXMIN_PRODUCT'
    export const DELETE_VIEWED_PRODUCT = 'DELETE_VIEWED_PRODUCT'
    export const DELETE_ORDER_PRODUCTS = 'DELETE_ORDER_PRODUCTS'
    
}

export class LoadProducts implements Action {
    readonly type = PRODUCT_ACTION.LOAD_PRODUCTS

    constructor(public payload: Product[]) {}
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

export class FilterMinMaxProduct implements Action {
    readonly type = PRODUCT_ACTION.FILTER_MINMAX_PRODUCT

    constructor(public payload: {min: number, max: number}) {}
}

export class SortMinMaxProduct implements Action {
    readonly type = PRODUCT_ACTION.SORT_MINMAX_PRODUCT
}

export class SortMaxMinProduct implements Action {
    readonly type = PRODUCT_ACTION.SORT_MAXMIN_PRODUCT
}

export class DeleteViewedProduct implements Action {
    readonly type = PRODUCT_ACTION.DELETE_VIEWED_PRODUCT

    constructor(public payload: Product) {}
}

export class DeleteOrderProducts implements Action {
    readonly type = PRODUCT_ACTION.DELETE_ORDER_PRODUCTS
}


export type ProductAction = LoadProducts | AddProduct | DeleteProduct | AddViewedProduct | FilterMinMaxProduct | SortMinMaxProduct | SortMaxMinProduct | DeleteViewedProduct | DeleteOrderProducts