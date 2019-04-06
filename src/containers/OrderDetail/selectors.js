
import get from 'lodash/get';

export const getOrderDetails = () => state => {
  const productsByIds = get(state, 'orderDetail.productsByIds');
  const orderDetails = get(state, 'orderDetail.orderDetails');

  return orderDetails.map(x => ({...x, product: productsByIds[x.productId]}));
};

export const getSelected = () => state => get(state, 'orderDetail.selected');

export const getProducts = () => state => get(state, 'orderDetail.products');


export function getFilteredData(data, filters = {}) {
  const {
    brand, location,
    range, size,
    status,
    type
  } = filters;

  const filterItem = (key, value) => x => get(x, key).includes(value);

  const filterConditions = [
    ['product.brand', brand],
    ['product.range', range],
    ['product.type', type],
    ['size', size],
    ['location', location],
    ['status', status],
  ];

  const filter = (items, [key, value]) => (
    items.filter(filterItem(key, value))
  );

  return filterConditions
  .filter(([,x]) => Boolean(x))
  .reduce(filter, data);
}


