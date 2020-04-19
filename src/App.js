import React , {useEffect, lazy, Suspense} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

import './App.css';

import Header  from './components/header/header.component';
import Footer from './components/footer/footer.component';
import {selectCurrentUser} from './redux/user/user.selectors';
import {checkUserSession} from './redux/user/user.actions';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const UtilitiesPage = lazy(() => import('./pages/utilities/utilities.component'));
const SignUpSignInPage = lazy(() => import('./pages/sign-up-sign-in/sign-up-sign-in.component'));
const AccountInfoPage = lazy(() => import('./pages/account-info/account-info-page.component'));
const CheckOutPage = lazy(() => import('./pages/checkout/checkout.component'));
const AccountOrderDetailsPage = lazy(() => import('./pages/account-order-details/account-order-details.component'));
const OrderSearchPage = lazy(() => import('./pages/order-search/order-search.component'));
const OrderConfirmationPage = lazy(() => import('./pages/order-confirmation/order-confirmation.component'));

const App = ({checkUserSession, currentUser}) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
 
  return (
    <div>
      <ScrollToTop>
      <Header/>
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />} >
            <Route exact={true} path="/" component={HomePage} />
            <Route path="/shop/" component={ShopPage} />
            <Route exact={true} path="/checkout/" component={CheckOutPage} />
            <Route exact={true} path="/utilities/" component={UtilitiesPage} />
            <Route path="/orderdetails/:orderId" component={AccountOrderDetailsPage} />
            <Route exact={true} path="/ordersearch/" component={OrderSearchPage} />  
            <Route exact={true} path="/confirmation/" component={OrderConfirmationPage} />  
                  
            {
            // If user is on SignUpSignInPage and is logged in, redirect to AccountInfoPage
            }
            <Route exact={true} path="/signin" render = 
              {() => 
                currentUser ? (
                <Redirect to="/account" />
                ) : (
                <SignUpSignInPage />)
              } 
            />

            {
            // If user is on AccountInfoPage page and has logged out, redirect to SignUpSignInPage
            }
            <Route exact={true} path="/account" render = 
              {() => 
                !currentUser ? (
                <Redirect to="/signin" />
                ) : (
                <AccountInfoPage />)
              } 
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
      <Footer/>
      </ScrollToTop>
    </div>
    );


}

// This adds the currenUser object to be accessible by the app
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession : () => dispatch(checkUserSession())
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
