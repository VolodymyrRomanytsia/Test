import { OrderProduct } from '../interfaces';

export interface AppState {  
    productsOrder: {
        products: OrderProduct[] 
    }
}