import { CommonProvider } from './contexts/common/commonContext';
import { CartProvider } from './contexts/cart/cartContext';
import Header from './components/common/Header';
import RouteRouters from './routes/RouteRouters';
import Footer from './components/common/Footer';
import BackTop from './components/common/BackTop';
import { FiltersProvider } from './contexts/filters/filtersContext';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { OrderProvider } from './contexts/order/orderContext';
import { ReviewProvider } from './contexts/review/reviewContext';

const App = () => {

  return (
    <>
      <CommonProvider>
        <FiltersProvider>
          <CartProvider>
            <OrderProvider>
              <ReviewProvider>
              <Header />
              <RouteRouters />
              <Footer />
              <BackTop />
              </ReviewProvider>
            </OrderProvider>
          </CartProvider>
        </FiltersProvider>
      </CommonProvider>
    </>
  );
};

export default App;
