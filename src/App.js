import { CommonProvider } from './contexts/common/commonContext';
import { CartProvider } from './contexts/cart/cartContext';
import Header from './components/common/Header';
import RouteRouters from './routes/RouteRouters';
import Footer from './components/common/Footer';
import BackTop from './components/common/BackTop';
import { FiltersProvider } from './contexts/filters/filtersContext';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const App = () => {
  
  return (
    <>
      <CommonProvider>
        <FiltersProvider>
          <CartProvider>
            <Header />
            <RouteRouters/>
            <Footer />
            <BackTop />
          </CartProvider>
        </FiltersProvider>
      </CommonProvider>
    </>
  );
};

export default App;
