export interface Configuration {
  cooksNumber: number;
  pizzasNumber: number;
  minimalPizzaCreationTime: number;
  randomGenerationStrategy: boolean;
  intervalGenerationStrategy: boolean;
}

export interface ClientOrder {
  clientName: string;
  order: Order;
}

export interface Order {
  totalPrice: number;
  orderState: orderState;
  orderMode: OrderMode;
  priority: number;
  pizzas: Pizza[];
}

export interface Pizza {
  pizzaType: PizzaType;
  timeToCreate: number;
  price: number;
  pizzaState: PizzaState;
  cookingStartTime: string;
  cookingEndTime: string;
}

export enum OrderMode {
  PARTIAL_PROCESSING = 'PARTIAL_PROCESSING',
  FULL_PROCESSING = 'FULL_PROCESSING',
}

export enum orderState {
  ORDER_ACCEPTED = 'ORDER_ACCEPTED',
  PREPARING_ORDER = 'PREPARING_ORDER',
  ORDER_FINISHED = 'ORDER_FINISHED',
}

export enum PizzaState {
  ASSEMBLING = 'ASSEMBLING',
  MAKING_DOUGH = 'MAKING_DOUGH',
  PREPARE_TOPPINGS = 'PREPARE_TOPPINGS',
  BAKING = 'BAKING',
  DONE = 'DONE',
}

export enum PizzaType {
  MARGHERITA = 'MARGHERITA',
  PEPPERONI = 'PEPPERONI',
  VEGGIE = 'VEGGIE',
  SUPREME = 'SUPREME',
  BBQ_CHICKEN = 'BBQ_CHICKEN',
  HAWAIIAN = 'HAWAIIAN',
  MEXICAN = 'MEXICAN',
  MUSHROOM_OLIVE = 'MUSHROOM_OLIVE',
  FOUR_CHEESE = 'FOUR_CHEESE',
  SPINACH_ARTICHOKE = 'SPINACH_ARTICHOKE',
}

export interface Cook {
  cookId: string;
  cookState: CookState;
}

export enum CookState {
  COOKING = 'COOKING',
  ON_BREAK = 'ON_BREAK',
}

export const pizzaImg = {
  [PizzaType.MARGHERITA]: 'margarita.jpeg',
  [PizzaType.PEPPERONI]: 'pepperoni.jpeg',
  [PizzaType.VEGGIE]: 'veggie.jpeg',
  [PizzaType.SUPREME]: 'napoli.jpeg',
  [PizzaType.BBQ_CHICKEN]: 'bbq.jpeg',
  [PizzaType.HAWAIIAN]: 'hawaii.jpeg',
  [PizzaType.MEXICAN]: 'mexicana.jpeg',
  [PizzaType.MUSHROOM_OLIVE]: 'mushroom-olive.jpeg',
  [PizzaType.FOUR_CHEESE]: 'four-cheese.jpeg',
  [PizzaType.SPINACH_ARTICHOKE]: 'spinach.jpeg',
};
