export const shopCategories = [
  {
    id: 'kits',
    title: 'Kits',
    description: 'Get your favorite Blue Rangers kit for the season.',
    items: [
      {
        name: 'Home Kit',
        slug: 'home-kit',
        image: 'homekit',
        price: 'Ksh 1500',
        description: 'White tshirt',
        sizeOptions: ['S', 'M', 'L', 'XL'],
        details: 'The official home kit in a clean white design with Blue Rangers branding.'
      },
      {
        name: 'Away Kit',
        slug: 'away-kit',
        image: 'awaykit',
        price: 'Ksh 1500',
        description: 'Blue tshirt',
        sizeOptions: ['S', 'M', 'L', 'XL'],
        details: 'The away kit features a bold blue design perfect for match days.'
      },
      {
        name: 'Third Kit',
        slug: 'third-kit',
        image: 'thirdkit',
        price: 'Ksh 1500',
        description: 'Black jersey with gold accents',
        sizeOptions: ['S', 'M', 'L', 'XL'],
        details: 'Our third kit brings a premium black-and-gold look for special occasions.'
      }
    ]
  },
  {
    id: 'training',
    title: 'Training Gear',
    description: 'Professional training equipment and apparel.',
    items: [
      {
        name: 'Training Top',
        slug: 'training-top',
        image: 'trainingtop',
        price: 'Ksh 450',
        description: 'Breathable training shirt',
        sizeOptions: ['S', 'M', 'L', 'XL'],
        details: 'Lightweight training top designed for intense practice sessions.'
      },
      {
        name: 'Training Shorts',
        slug: 'training-shorts',
        image: 'trainingshorts',
        price: 'Ksh 450',
        description: 'Lightweight training shorts',
        sizeOptions: ['S', 'M', 'L', 'XL'],
        details: 'Comfortable training shorts with quick-dry fabric for fast movement.'
      },
      {
        name: 'Track Suit',
        slug: 'track-suit',
        image: 'tracksuit',
        price: 'Ksh 450',
        description: 'Complete track suit set',
        sizeOptions: ['S', 'M', 'L', 'XL'],
        details: 'A complete track suit set for warm-ups and cool-downs.'
      }
    ]
  },
  {
    id: 'memorabilia',
    title: 'Memorabilia',
    description: 'Exclusive items celebrating our history.',
    items: [
      {
        name: 'Team Flag',
        slug: 'team-flag',
        image: 'teamflag',
        price: 'Ksh 200',
        description: 'Official club flag',
        sizeOptions: ['One Size'],
        details: 'A high-quality team flag to show your Blue Rangers pride.'
      },
      {
        name: 'Signed Jersey',
        slug: 'signed-jersey',
        image: 'signedjersey',
        price: 'Ksh 1500',
        description: 'Team signed memorabilia',
        sizeOptions: ['One Size'],
        details: 'Exclusive signed jersey from the team, perfect for collectors.'
      },
      {
        name: 'Club Badge Pins',
        slug: 'club-badge-pins',
        image: 'badgepins',
        price: 'Ksh 200',
        description: 'Collectible badge set (5-pack)',
        sizeOptions: ['One Size'],
        details: 'A set of club badge pins for your jacket, bag, or display board.'
      }
    ]
  }
]

export const productMap = shopCategories.reduce((map, category) => {
  category.items.forEach((item) => {
    map[item.slug] = item
  })
  return map
}, {})
