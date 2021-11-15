import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReviewsIcon from "@mui/icons-material/Reviews";
import LogoutIcon from "@mui/icons-material/Logout";
import PaymentIcon from "@mui/icons-material/Payment";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Switch, Link, useRouteMatch } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import PrivateRoute from "../../Authentication/PrivateRoute/PrivateRoute";
import UserPayPage from "../UserPayPage/UserPayPage";
import UserReviewPage from "../UserReviewPage/UserReviewPage";
import AdminMakeAdmin from "../AdminMakeAdmin/AdminMakeAdmin";
import AdminAddProduct from "../AdminAddProduct/AdminAddProduct";
import AdminManageProduct from "../AdminManageProduct/AdminManageProduct";
import OrdersPage from "../OrdersPage/OrdersPage";
import AdminRoute from "../../Authentication/AdminRoute/AdminRoute";

const drawerWidth = 200;
const Dashboard = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let { path, url } = useRouteMatch();
  const { admin, user, displayName, logOut } = useAuth();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <List>
        {admin ? (
          <div>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`${url}`}
            >
              <ListItem button key={"Manage All Orders"}>
                <ListItemIcon>
                  <ShoppingBagIcon></ShoppingBagIcon>
                </ListItemIcon>
                <ListItemText primary={"Manage All Orders"} />
              </ListItem>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`${url}/make-admin`}
            >
              <ListItem button key={"Make Admin"}>
                <ListItemIcon>
                  <ReviewsIcon></ReviewsIcon>
                </ListItemIcon>
                <ListItemText primary={"Make Admin"} />
              </ListItem>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`${url}/add-product`}
            >
              <ListItem button key={"Add a Product"}>
                <ListItemIcon>
                  <PaymentIcon></PaymentIcon>
                </ListItemIcon>
                <ListItemText primary={"Add a Product"} />
              </ListItem>
            </Link>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`${url}/manage-product`}
            >
              <ListItem button key={"Manage Products"}>
                <ListItemIcon>
                  <ShoppingBagIcon></ShoppingBagIcon>
                </ListItemIcon>
                <ListItemText primary={"Manage Products"} />
              </ListItem>
            </Link>
          </div>
        ) : (
          <div>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`${url}`}
            >
              <ListItem button key={"My Orders"}>
                <ListItemIcon>
                  <ShoppingBagIcon></ShoppingBagIcon>
                </ListItemIcon>
                <ListItemText primary={"My Orders"} />
              </ListItem>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`${url}/ureview`}
            >
              <ListItem button key={"Give Review"}>
                <ListItemIcon>
                  <ReviewsIcon></ReviewsIcon>
                </ListItemIcon>
                <ListItemText primary={"Give Review"} />
              </ListItem>
            </Link>

            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={`${url}/upay`}
            >
              <ListItem button key={"Payment"}>
                <ListItemIcon>
                  <PaymentIcon></PaymentIcon>
                </ListItemIcon>
                <ListItemText primary={"Payment"} />
              </ListItem>
            </Link>
          </div>
        )}

        <ListItem button key={"Log Out"} onClick={logOut}>
          <ListItemIcon>
            <LogoutIcon></LogoutIcon>
          </ListItemIcon>
          <ListItemText primary={"Log Out"} />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // render html
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Switch>
          <PrivateRoute exact path={`${path}`}>
            <OrdersPage></OrdersPage>
          </PrivateRoute>

          <PrivateRoute path={`${path}/upay`}>
            <UserPayPage></UserPayPage>
          </PrivateRoute>
          <PrivateRoute path={`${path}/ureview`}>
            <UserReviewPage></UserReviewPage>
          </PrivateRoute>

          <AdminRoute path={`${path}/make-admin`}>
            <AdminMakeAdmin></AdminMakeAdmin>
          </AdminRoute>

          <AdminRoute path={`${path}/add-product`}>
            <AdminAddProduct></AdminAddProduct>
          </AdminRoute>
          <AdminRoute path={`${path}/manage-product`}>
            <AdminManageProduct></AdminManageProduct>
          </AdminRoute>
        </Switch>
      </Box>
    </Box>
  );
};

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
