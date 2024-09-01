export type Guitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export type ItemId = Guitar["id"];

export type CartItem = Guitar & {
  cantidad: number;
};

// HEREDAR USANDO PICK
export type CartItemPick = Pick<Guitar, "id" | "name" | "price"> & {
  cantidad: number;
};
