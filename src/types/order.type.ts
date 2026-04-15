export interface OrderI {
  _id: string;
  id: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  shippingAddress: {
    details: string;
    phone: string;
    city: string;
  };
  cartItems: {
    count: number;
    _id: string;
    price: number;
    product: {
      imageCover: string;
      title: string;
      category: {
        name: string;
      };
      [key: string]: any;
    };
  }[];
  user: {
    _id: string;
    name: string;
    email: string;
  };
}
