import { OrderProduct, Product } from '../interfaces';

export interface AppState {  
    productsOrder: {
        products: OrderProduct[],
        viewproducts: Product[]  
    }

}