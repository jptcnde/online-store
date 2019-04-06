import * as reducers from './reducers';
import * as selectors from './selectors';



export default {
  name: 'orderDetail',
  state: {
    products: [],
    orderDetails: [],
    productsByIds: {},
    selected: {
      'id': 'b2dd4ca8-9bc1-4b74-8d0b-0cf72966b7df',
      'size': 'M',
      'location': [
        'Jalan Besar',
        'Geylang',
        'Changi'
      ],
      'price': '781.00',
      'retailPrice': '866.00',
      'status': 'pending',
      'product': {
        'id': 'b2dd4ca8-9bc1-4b74-8d0b-0cf72966b7df',
        'image': {
          'front': 'http://lorempixel.com/640/480/fashion',
          'side': 'http://lorempixel.com/640/480/fashion',
          'back': 'http://lorempixel.com/640/480/fashion',
          'detail1': 'http://lorempixel.com/640/480/fashion',
          'detail2': 'http://lorempixel.com/640/480/fashion'
        },
        'designer': 'Ms. Andrew King',
        'brand': 'Stoltenberg, Hagenes and Carroll',
        'season': 'Winter 2018',
        'type': 'Blouse',
        'range': 'Luxurious',
        'city': 'Walshland',
        'sizes': [
          'XS',
          'XL',
          'S'
        ]
      }
    },

  },
  reducers,
  selectors
};
