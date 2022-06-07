import { v4 as uuid } from 'uuid'
import shoppingVideo1 from './assets/shop1.mp4'
import shoppingVideo2 from './assets/shop2.mp4'
import shoppingVideo3 from './assets/shop3.mp4'
import artVideo1 from './assets/art1.mp4'
import artVideo2 from './assets/art2.mp4'
import artVideo3 from './assets/art3.mp4'
import newsVideo from './assets/news.mp4'
import reviewsVideo1 from './assets/review1.mp4'
import reviewsVideo2 from './assets/review2.mp4'
import reviewsVideo3 from './assets/review3.mp4'
import podcastVideo from './assets/podcast.mp4'

/**
 * Videos Database can be added here.
 * You can add videos of your wish with different attributes
 * */

export const videos = [
  {
    _id: uuid(),
    title: 'marques brownlee goes sneaker shopping',
    description: `YouTube tech star Marques Brownlee goes Sneaker Shopping with Complex's Joe La Puma at Stadium Goods in New York City and discusses the latest advances in sneaker technology, his love for Jordan 1s, and working with Kobe Bryant and Steph Curry.`,
    url: shoppingVideo1,
    views: 0,
    uploadedOn: new Date('Aug 05 2019'),
    category: 'shopping',
  },
  {
    _id: uuid(),
    title: 'David Beckham Goes Sneaker Shopping With Complex',
    description: `David Beckham goes Sneaker Shopping with Complex's Joe La Puma at Flight Club in Miami and talks about shopping for rare sneakers, his kids wearing his shoes, and his history with Adidas and the Predator cleat.`,
    url: shoppingVideo2,
    views: 0,
    uploadedOn: new Date('May 15 2022'),
    category: 'shopping',
  },
  {
    _id: uuid(),
    title: 'Lewis Hamilton Goes Sneaker Shopping With Complex',
    description: `F1 champion Lewis Hamilton goes Sneaker Shopping with Joe La Puma at BAIT in Los Angeles and talks about getting his own signature sneaker, plus his love for fashion.`,
    url: shoppingVideo3,
    views: 0,
    uploadedOn: new Date('Jan 05 2018'),
    category: 'shopping',
  },
  {
    _id: uuid(),
    title: '10 best sneakers of 2020',
    description: `Jacques @Kustoo Slade is a guy that loves sneakers and creates Youtube videos about them as well as other things.`,
    url: reviewsVideo1,
    views: 0,
    uploadedOn: new Date('Dec 30 2020'),
    category: 'review',
  },
  {
    _id: uuid(),
    title: 'UNBOXING: FAKE NIKE AIR JORDAN 1 🔥 Shoe/Sneaker Review 2022 | ONE CHANCE',
    description: `UNBOXING: FAKE NIKE AIR JORDAN 1 🔥 Shoe/Sneaker Review 2022 | ONE CHANCE`,
    url: reviewsVideo2,
    views: 0,
    uploadedOn: new Date('Apr 19 2022'),
    category: 'review',
  },
  {
    _id: uuid(),
    title: 'Where to buy Sneakers in India 2021 ?',
    description: `Here is an introduction to a new platform where you can buy sneakers on resale in India.`,
    url: reviewsVideo3,
    views: 0,
    uploadedOn: new Date('Jul 06 2021'),
    category: 'review',
  },
  {
    _id: uuid(),
    title: 'biggest releases of 2022',
    description: `The Complex Sneakers Podcast is co-hosted by Joe La Puma, Brendan Dunne, and Matt Welty. This week, the three return from the holiday hiatus to take a look forward at the sneakers releasing in 2022.`,
    url: podcastVideo,
    views: 0,
    uploadedOn: new Date('Jan 31 2022'),
    category: 'podcast',
  },
  {
    _id: uuid(),
    title: 'we went to fake sneaker capital of china',
    description: `After the sun sets in Putian, thousands of bikes carrying fake sneakers hit the streets.
    The lace-up black market is no secret in Putian, and it's where you can find Chan, a vendor with a knack for getting high-quality pairs off the streets and into the hands of hypebeasts on the other side of the globe.`,
    url: newsVideo,
    views: 0,
    uploadedOn: new Date('Aug 23 2018'),
    category: 'news',
  },
  {
    _id: uuid(),
    title: `how kickstradomis became nba's favorite sneakeer artist`,
    description: `Salvador “Kickstradomis” Amezcua is at the top of the customs sneaker game, with sneakers seen all over the NBA, from  the likes of Karl-Anthony Towns, James Harden and Damian Lillard.`,
    url: artVideo1,
    views: 0,
    uploadedOn: new Date('Jul 25 2018'),
    category: 'art',
  },
  {
    _id: uuid(),
    title: `Customizing $13 Walmart Shoes!`,
    description: `I Painted Walmart shoes!! I think I made them look super cool! I also painted a purse, mask, football, and more. I really had fun with this video it was a challenge! 
    Let me know your thoughts!! `,
    url: artVideo2,
    views: 0,
    uploadedOn: new Date('Apr 22 2021'),
    category: 'art',
  },
  {
    _id: uuid(),
    title: `How To Customize Shoes!`,
    description: `How To Customize SHOES! - In this video I show you how you can customize your shoes with some angelus paint and a paint brush. Grab some shoes , paint, and paintbrushes to follow along with this tutorial.`,
    url: artVideo3,
    views: 0,
    uploadedOn: new Date('May 30 2020'),
    category: 'art',
  },

];
