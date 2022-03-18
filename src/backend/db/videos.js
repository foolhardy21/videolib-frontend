import { v4 as uuid } from 'uuid'
import video from './assets/sneaker_stock.mp4'
/**
 * Videos Database can be added here.
 * You can add videos of your wish with different attributes
 * */

export const videos = [
  {
    _id: uuid(),
    videoTitle: 'air jordan 36',
    videoDescription: 'complex reviews the latest air jordans. click to watch the whole review.',
    video: video,
    category: 'nike',
  },
  {
    _id: uuid(),
    videoTitle: 'yeezy 350',
    videoDescription: 'complex reviews the most famous yeezy. click to watch the whole review.',
    video: video,
    category: 'adidas',
  },
  {
    _id: uuid(),
    videoTitle: 'nike blades',
    videoDescription: 'complex reviews the most famous yeezy. click to watch the whole review.',
    video: video,
    category: 'nike',
  },
  {
    _id: uuid(),
    videoTitle: 'adidas 700',
    videoDescription: 'complex reviews the most famous yeezy. click to watch the whole review.',
    video: video,
    category: 'adidas',
  },
  {
    _id: uuid(),
    videoTitle: 'reebok 230',
    videoDescription: 'complex reviews the most famous yeezy. click to watch the whole review.',
    video: video,
    category: 'reebok',
  },
];
