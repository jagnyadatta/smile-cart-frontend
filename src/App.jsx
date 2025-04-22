import routes from "apis/routes";
import { PageNotFound } from "components/commons";
import Product from "components/Product/index";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";

import "./App.css";
import ProductList from "./components/ProductList";

const App = () => (
  <>
    <div className="mx-4 flex space-x-2">
      <NavLink
        exact
        activeClassName="underline font-bold"
        className="text-2xl"
        to="/"
      >
        Home
      </NavLink>
    </div>
    <Switch>
      <Route exact component={Product} path={routes.products.show} />
      <Route exact component={ProductList} path={routes.products.index} />
      <Redirect exact from={routes.root} to={routes.products.index} />
      <Route component={PageNotFound} path="*" />
    </Switch>
  </>
);

export default App;
