import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */
import newsM from './assets/news-m.jpg'
import newsS from './assets/news-s.jpg'
import artM from './assets/art-m.jpg'
import artS from './assets/art-s.jpg'
import reviewM from './assets/review-m.jpg'
import reviewS from './assets/review-s.jpg'
import podcastM from './assets/podcast-m.jpg'
import podcastS from './assets/podcast-s.jpg'
import shoppingM from './assets/shopping-m.jpg'
import shoppingS from './assets/shopping-s.jpg'

export const categories = [
  {
    _id: uuid(),
    name: "review",
    img: {
      alt: 'person giving a review',
      srcSet: `${reviewM} 300w, ${reviewS} 100w`,
      sizes: '(max-width: 768px) 100px, 300px'
    }
  },
  {
    _id: uuid(),
    name: "art",
    img: {
      alt: 'custom sneaker',
      srcSet: `${artM} 300w, ${artS} 100w`,
      sizes: '(max-width: 768px) 100px, 300px'
    }
  },
  {
    _id: uuid(),
    name: "news",
    img: {
      alt: 'magazines',
      srcSet: `${newsM} 300w, ${newsS} 100w`,
      sizes: '(max-width: 768px) 100px, 300px'
    }
  },
  {
    _id: uuid(),
    name: "podcast",
    img: {
      alt: 'a mic',
      srcSet: `${podcastM} 300w, ${podcastS} 100w`,
      sizes: '(max-width: 768px) 100px, 300px'
    }
  },
  {
    _id: uuid(),
    name: "shopping",
    img: {
      alt: 'neymar buying sneakers',
      srcSet: `${shoppingM} 300w, ${shoppingS} 100w`,
      sizes: '(max-width: 768px) 100px, 300px'
    }
  },
];
