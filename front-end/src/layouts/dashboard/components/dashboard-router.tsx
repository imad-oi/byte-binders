import AddNewBook from "../../../layouts/ManageLibraryPage/components/AddNewBook"
import { Route, Switch } from "react-router-dom"
import Home from "./home"
import Notifications from "./notifications"
import { Profile } from "./profile"
import Tables from "./tables"
import ChangeQuantityOfBooks from "../../../layouts/ManageLibraryPage/components/ChangeQuantityOfBooks"
import AdminMessages from "../../../layouts/ManageLibraryPage/components/AdminMessages"

const DashboardRouter = () => {
  return (
    <Switch>
      <Route exact path="/admin/" component={Home} />
      <Route exact path="/admin/profile" component={Profile} />
      <Route exact path="/admin/tables" component={Tables} />
      <Route exact path="/admin/notifications" component={Notifications} />
      <Route exact path="/admin/add-book" component={AddNewBook} />
      <Route exact path="/admin/change-quantity" component={ChangeQuantityOfBooks} />
      <Route exact path="/admin/messages" component={AdminMessages} />
    </Switch>
  )
}

export default DashboardRouter