import { OktaAuth } from "@okta/okta-auth-js";
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

// @ts-ignore
import LoginWidget from "./auth/LoginWidget";
import BookCheckoutPage from "./layouts/bookCheckoutPage/BookCheckoutPage";
import ReviewListPage from "./layouts/bookCheckoutPage/reviewListPage/ReviewListPage";
import HomePage from "./layouts/HomePage/HomePage"
import Footer from "./layouts/NavbarAndFooter/Footer"
import Navbar from "./layouts/NavbarAndFooter/Navbar"
import SearchBookPage from "./layouts/searchBookPage/SearchBookPage"
import ShelfPage from "./layouts/shelfPage/ShelfPage";
import { oktaConfig } from "./lib/oktaConfig";
import MessagesPage from "./layouts/messagesPage/MessagesPage";
import ManageLibraryPage from "./layouts/ManageLibraryPage/ManageLibraryPage";

const oktaAuth = new OktaAuth(oktaConfig)

function App() {
  const navigate = useHistory();
  const location = useLocation();

  const custmAuthHANdler = () => navigate.push('/login');

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: string) => {
    navigate.push(originalUri);
  }

  // Determine whether to render the Navbar based on the pathname
  const shouldRenderNavbar = !["/login", "/login/callback"].includes(location.pathname);
  // const shouldRenderFooterForAdmin = !["/login", "/login/callback", "/admin"].includes(location.pathname);
  const shouldRenderFooterForAdmin = location.pathname !== "/admin";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Security
        oktaAuth={oktaAuth}
        onAuthRequired={custmAuthHANdler}
        restoreOriginalUri={restoreOriginalUri}
      >
        {(shouldRenderNavbar && shouldRenderFooterForAdmin ) && <Navbar />}
        <div className="flex-1">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/search" component={SearchBookPage} />
            <Route path="/checkout/:id" component={BookCheckoutPage} />
            <Route path="/login">
              <LoginWidget config={oktaConfig} />
            </Route>
            <Route path="/login/callback" component={LoginCallback} />
            <Route path="/reviewlist/:bookId" component={ReviewListPage} />
            <SecureRoute path="/shelf" component={ShelfPage} />
            <SecureRoute path="/messages" component={MessagesPage} />
            <SecureRoute path="/admin" component={ManageLibraryPage} />
          </Switch>
        </div>
        {(shouldRenderNavbar && shouldRenderFooterForAdmin) && <Footer />}
      </Security>
    </div>
  )
}

export default App
