export interface Dish {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export type ApiDish = Omit<Dish, 'id'>

export interface DishMutation {
  name: string;
  description: string;
  image: string;
  price: string;
}

export interface DishesList {
  [id: string]: ApiDish
}

export interface CartDish {
  dish: Dish;
  amount: number;
}

export interface Customer {
  name: string;
  address: string;
  phone: string;
}

export interface ApiOrder {
  customer: Customer;
  dishes: CartDish[];
}

export interface OrdersList {
  [id: string]: ApiOrder;
}

export interface Order extends ApiOrder {
  id: string;
  totalPrice: number;
}