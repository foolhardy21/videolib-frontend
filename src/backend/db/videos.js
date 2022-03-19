import { v4 as uuid } from 'uuid'
import shoppingVideo from './assets/shopping.mp4'
import artVideo from './assets/art.mp4'
import newsVideo from './assets/news.mp4'
import reviewsVideo from './assets/reviews.mp4'
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
    url: shoppingVideo,
    views: 0,
    uploadedOn: new Date('Aug 05 2019'),
    category: 'shopping',
  },
  {
    _id: uuid(),
    title: '10 best sneakers of 2020',
    description: `Jacques @Kustoo Slade is a guy that loves sneakers and creates Youtube videos about them as well as other things.`,
    url: reviewsVideo,
    views: 0,
    uploadedOn: new Date('Dec 30 2020'),
    category: 'reviews',
  },
  {
    _id: uuid(),
    title: 'biggest releases of 2022',
    description: `The Complex Sneakers Podcast is co-hosted by Joe La Puma, Brendan Dunne, and Matt Welty. This week, the three return from the holiday hiatus to take a look forward at the sneakers releasing in 2022.`,
    url: podcastVideo,
    views: 0,
    uploadedOn: new Date('Jan 31 2022'),
    category: 'reviews',
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
    url: newsVideo,
    views: 0,
    uploadedOn: new Date('Jul 25 2018'),
    category: 'art',
  },
  {
    _id: uuid(),
    title: 'marques brownlee goes sneaker shopping',
    description: `YouTube tech star Marques Brownlee goes Sneaker Shopping with Complex's Joe La Puma at Stadium Goods in New York City and discusses the latest advances in sneaker technology, his love for Jordan 1s, and working with Kobe Bryant and Steph Curry.`,
    url: shoppingVideo,
    views: 0,
    uploadedOn: new Date('Aug 05 2019'),
    category: 'shopping',
  },
  {
    _id: uuid(),
    title: '10 best sneakers of 2020',
    description: `Jacques @Kustoo Slade is a guy that loves sneakers and creates Youtube videos about them as well as other things.`,
    url: reviewsVideo,
    views: 0,
    uploadedOn: new Date('Dec 30 2020'),
    category: 'reviews',
  },
  {
    _id: uuid(),
    title: 'biggest releases of 2022',
    description: `The Complex Sneakers Podcast is co-hosted by Joe La Puma, Brendan Dunne, and Matt Welty. This week, the three return from the holiday hiatus to take a look forward at the sneakers releasing in 2022.`,
    url: podcastVideo,
    views: 0,
    uploadedOn: new Date('Jan 31 2022'),
    category: 'reviews',
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
    url: newsVideo,
    views: 0,
    uploadedOn: new Date('Jul 25 2018'),
    category: 'art',
  },
  {
    _id: uuid(),
    title: 'marques brownlee goes sneaker shopping',
    description: `YouTube tech star Marques Brownlee goes Sneaker Shopping with Complex's Joe La Puma at Stadium Goods in New York City and discusses the latest advances in sneaker technology, his love for Jordan 1s, and working with Kobe Bryant and Steph Curry.`,
    url: shoppingVideo,
    views: 0,
    uploadedOn: new Date('Aug 05 2019'),
    category: 'shopping',
  },
  {
    _id: uuid(),
    title: '10 best sneakers of 2020',
    description: `Jacques @Kustoo Slade is a guy that loves sneakers and creates Youtube videos about them as well as other things.`,
    url: reviewsVideo,
    views: 0,
    uploadedOn: new Date('Dec 30 2020'),
    category: 'reviews',
  },
  {
    _id: uuid(),
    title: 'biggest releases of 2022',
    description: `The Complex Sneakers Podcast is co-hosted by Joe La Puma, Brendan Dunne, and Matt Welty. This week, the three return from the holiday hiatus to take a look forward at the sneakers releasing in 2022.`,
    url: podcastVideo,
    views: 0,
    uploadedOn: new Date('Jan 31 2022'),
    category: 'reviews',
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
    url: newsVideo,
    views: 0,
    uploadedOn: new Date('Jul 25 2018'),
    category: 'art',
  },
];
