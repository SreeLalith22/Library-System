export interface Token {
    _id: string;
    fullname: string;
    email: string;
    role: "ADMIN" | "USER";
  }

  export interface RequestBodyProduct {
    productname: string;
    price: string;
    owner: string;
    product_copies_number: number;
    quantity: number
  }
  