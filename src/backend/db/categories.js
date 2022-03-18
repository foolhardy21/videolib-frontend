import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: "nike",
  },
  {
    _id: uuid(),
    categoryName: "adidas",
  },
  {
    _id: uuid(),
    categoryName: "reebok",
  },
];
