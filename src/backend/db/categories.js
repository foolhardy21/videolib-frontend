import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    name: "reviews",
  },
  {
    _id: uuid(),
    name: "art",
  },
  {
    _id: uuid(),
    name: "news",
  },
  {
    _id: uuid(),
    name: "podcasts",
  },
  {
    _id: uuid(),
    name: "shopping",
  },
];
