import { PRODUCT_ACTION, ProductAction } from './product.action';

const initialState = {
    products: [],
    orderproducts: [],
    viewproducts: []
}

export function productReduser(state = initialState, action: ProductAction) {
    switch (action.type) {
        case PRODUCT_ACTION.LOAD_PRODUCTS:
            return{
                ...state,
                products: [...action.payload]
            }
        case PRODUCT_ACTION.ADD_PRODUCT:
            return{
                ...state,
                orderproducts: [...state.orderproducts, action.payload]
            }
        case PRODUCT_ACTION.DELETE_PRODUCT:
            return{
                ...state,
                orderproducts: [...state.orderproducts.filter(c => c._id !== action.payload._id)]
            } 
        case PRODUCT_ACTION.ADD_VIEWED_PRODUCT:
            return{
                ...state,
                viewproducts: [...state.viewproducts, action.payload]
            }
        case PRODUCT_ACTION.FILTER_MINMAX_PRODUCT:
            return{
                ...state,
                products: [...state.products.filter(c =>  c.price < action.payload.max && c.price > action.payload.min)]
            }
        default:
            return state;
    }
}