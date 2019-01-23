export interface User {
    username: string
    password: string
    id?: string
}

export interface Message {
    message: string
  }

export interface Product {
    title: string
    description: string
    image: string
    price: number
    _id?: string
}

export interface OrderProduct {
    title: string
    price: number
    quantity: number
    _id?: string
}

export interface Products {
    products: Product[]
}

