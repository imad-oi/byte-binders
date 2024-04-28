import { OktaAuth } from "@okta/okta-auth-js";
import { LoginCallback, SecureRoute, Security } from "@okta/okta-react";
import { Route, Switch, useHistory, useLocation } from 'react-router-dom';

// @ts-ignore
import LoginWidget from "./auth/LoginWidget";
import HomePage from "./layouts/HomePage/HomePage";
import Footer from "./layouts/NavbarAndFooter/Footer";
// import Navbar from "./layouts/NavbarAndFooter/Navbar";
import BookCheckoutPage from "./layouts/bookCheckoutPage/BookCheckoutPage";
import ReviewListPage from "./layouts/bookCheckoutPage/reviewListPage/ReviewListPage";
import { Dashboard } from "./layouts/dashboard";
import MessagesPage from "./layouts/messagesPage/MessagesPage";
import SearchBookPage from "./layouts/searchBookPage/SearchBookPage";
import ShelfPage from "./layouts/shelfPage/ShelfPage";
import { oktaConfig } from "./lib/oktaConfig";
import Contact from "./layouts/contactPage";
import Header from "./layouts/Header";
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
  const shouldRenderFooterForAdmin = (!location.pathname.match(`/admin/*`));

  return (
    <div
      className="flex flex-col mix-h-[100vh]"
    // style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
    >
      <Security
        oktaAuth={oktaAuth}
        onAuthRequired={custmAuthHANdler}
        restoreOriginalUri={restoreOriginalUri}
      >
        {(shouldRenderNavbar && shouldRenderFooterForAdmin) && <Header />}
        <div className="flex-1">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/search" component={SearchBookPage} />
            <Route path="/contact" component={Contact} />
            <Route path="/checkout/:id" component={BookCheckoutPage} />
            <Route path="/login">
              <div
                className="flex justify-center items-center h-screen"
              >
                <LoginWidget config={oktaConfig} />
              </div>
            </Route>
            <Route path="/login/callback" component={LoginCallback} />
            <Route path="/reviewlist/:bookId" component={ReviewListPage} />
            {/* <Route path="/shelf" component={ShelfPage} />
            <Route path="/messages" component={MessagesPage} /> */}
            <Route path="/admin" component={Dashboard} />
            <Route path="*" component={
              () => <div
                className="flex justify-center items-center h-screen"
              >404 Not Found</div>
            } />

            <SecureRoute path="/admin" component={ManageLibraryPage} />
            <SecureRoute path="/shelf" component={ShelfPage} />
            <SecureRoute path="/messages" component={MessagesPage} />
            <SecureRoute path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
        {(shouldRenderNavbar && shouldRenderFooterForAdmin) && <Footer />}
      </Security>
    </div>
  )
}

export default App
