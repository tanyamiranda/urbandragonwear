import React , {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import ScrollToTop from 'react-router-scroll-top';
import {createStructuredSelector} from 'reselect';
import {connect} from 'react-redux';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header  from './components/header/header.component';
import SignUpSignInPage from './pages/sign-up-sign-in/sign-up-sign-in.component';
import AccountInfoPage from './pages/account-info/account-info-page.component'
import CheckOutPage from './pages/checkout/checkout.component';
import {selectCurrentUser} from './redux/user/user.selectors';
import Footer from './components/footer/footer.component';
import UtilitiesPage from './pages/utilities/utilities.component';
import {checkUserSession} from './redux/user/user.actions';

const App = ({checkUserSession, currentUser}) => {

  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
 
  return (
    <div>
      <ScrollToTop>
      <Header/>
      <Switch>
        <Route exact={true} path="/" component={HomePage} />
        <Route path="/shop/" component={ShopPage} />
        <Route exact={true} path="/checkout/" component={CheckOutPage} />
        <Route exact={true} path="/utilities/" component={UtilitiesPage} />
        
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
