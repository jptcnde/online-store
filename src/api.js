import faker from 'faker';
import { Sizes, ProductTypes, Seasons, Locations, OrderStatus, Range } from './constants';


const {
  random: { number }
} = faker;



const randomizeType = types => types[number({ max: types.length - 1 })];

function createProduct() {
  const id = faker.random.uuid();
  return {
    id,
    image: {
      front: faker.image.fashion(),
      side: faker.image.nature(),
      back: faker.image.sports(),
      detail1: faker.image.food(),
      detail2: faker.image.business()
    },
    designer: faker.name.findName(),
    brand: faker.company.companyName(),
    season: randomizeType(Seasons),
    type: randomizeType(ProductTypes),
    range: randomizeType(Range),
    city: faker.address.city(),
    // each design can have one or more sizes
    sizes: [
      ...new Set(
        Array.from(Array(number({ max: Sizes.length, min: 1 })), () =>
          randomizeType(Sizes)
        )
      )
    ]
  };
}

const createProducts = () => Array.from(Array(number({max: 50, min: 1})), () => createProduct());

function createOrderDetail(products) {
  const id = faker.random.uuid();
  const { id: productId } = faker.helpers.randomize(products);
  return {
    id,
    productId,
    size: randomizeType(Sizes),
    location: [
      ...new Set(
        Array.from(Array(number({ max: Locations.length, min: 1 })), () =>
          randomizeType(Locations)
        )
      )
    ],
    price: faker.commerce.price(),
    retailPrice: faker.commerce.price(),
    status: randomizeType(OrderStatus)
  };
}

export default function seed(len) {
  const products = createProducts();
  const orderDetails = Array.from(Array(len), () => createOrderDetail(products));
  return {
    products,
    orderDetails
  };
  // return Array.from(Array(len), () => createItem());
}
