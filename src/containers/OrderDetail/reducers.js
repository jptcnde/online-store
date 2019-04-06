
export const setProducts = (state, products) => ({
  ...state,
  products,
  productsByIds: Object.values(products)
  // eslint-disable-next-line no-return-assign
  .reduce((acc, data) => (acc[data.id] = data, acc), {}) // eslint-disable-line no-sequences
});

export const setOrderDetails = (state, orderDetails) => ({
  ...state,
  orderDetails,
});

export const  selectItem = (state, selected) => ({
  ...state,
  selected
});

export function completeOrder(state, orderId) {
  const { orderDetails } = state;
  const orderDtl = orderDetails.find(x => x.id === orderId);
  orderDtl.status = 'fulfilled';
  return {
    ...state,
    orderDetails: orderDetails.filter(x => x.id !== orderId)
    .concat(orderDtl)
  };
}