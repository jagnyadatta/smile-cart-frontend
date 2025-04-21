import Product from "components/Product/index";
import "./App.css";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import ProductList from "./components/ProductList";
import { PageNotFound } from "components/commons";
import routes from "apis/routes";
const App = () => (
  <>
    <div className="mx-4 flex space-x-2">
      <NavLink exact activeClassName="underline font-bold text-2xl" to="/">
        Home
      </NavLink>
      {/* <NavLink exact activeClassName="underline font-bold" to="/product">
        Product
      </NavLink> */}
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
