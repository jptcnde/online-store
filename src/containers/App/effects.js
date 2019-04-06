import seed from '../../api';
import { dispatch } from '../../store';

// eslint-disable-next-line import/prefer-default-export
export function configureData() {
  const { products, orderDetails } = seed(30);
  const {
    orderDetail: { setProducts, setOrderDetails }
  } = dispatch;
  setProducts(products);
  setOrderDetails(orderDetails);
}