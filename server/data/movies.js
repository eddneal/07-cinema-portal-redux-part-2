const movies = [
  {
    id: 1,
    title: '12 Years a Slave',
    image: '/movies/12_years_slave.jpg',
    venue: 'Great hall, no. 1',
    description: 'Based on an incredible true story of one man\'s fight for survival and freedom. In the pre-Civil War United States, Solomon Northup, a free black man from upstate New York, is abducted and sold into slavery. Facing cruelty personified by a malevolent slave owner, as well as unexpected kindnesses, Solomon struggles not only to stay alive, but to retain his dignity. In the twelfth year of his unforgettable odyssey, Solomon\'s chance meeting with a Canadian abolitionist will forever alter his life. Written by Fox Searchlight',
    when: new Date(2017, 3, 27, 18, 0),
    availableSeats: 273,
    price: 6.3,
    tags: ['IMAX', 'Oscar winner']
  },
  {
    id: 2,
    title: 'Shutter Island',
    image: '/movies/shutter-island.jpg',
    venue: 'Great hall, no. 1',
    description: 'In 1954, a U.S. marshal investigates the disappearance of a murderess who escaped from a hospital for the criminally insane.',
    when: new Date(2017, 3, 28, 20, 45),
    availableSeats: 0,
    price: 5.5,
    tags: ['psycho']
  },
  {
    id: 3,
    title: 'Whiplash',
    image: '/movies/whiplash.jpg',
    venue: 'Film club, no. 2',
    description: 'A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student\'s potential.',
    when: new Date(2017, 3, 28, 19, 0),
    availableSeats: 2,
    price: 6.3,
    tags: ['for drummers']
  }
];

module.exports = movies;