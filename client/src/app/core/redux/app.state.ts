import { OrderProduct, Product } from '../interfaces';

export interface AppState {  
    productsOrder: {
        products: Product[],
        orderproducts: OrderProduct[],
        viewproducts: Product[]  
    }

}