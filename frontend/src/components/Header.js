// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   Button,
//   Typography,
//   Tabs,
//   Tab,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { authActions } from "../redux/store";
// import toast from "react-hot-toast";
// const Header = () => {

//   let isLogin = useSelector((state) => state.isLogin);
//   isLogin = isLogin || localStorage.getItem("userId");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   //state
//   const [value, setValue] = useState();

//   //logout
//   const handleLogout = () => {
//     try {
//       dispatch(authActions.logout());
//       toast.success("Logout Successfully");
//       navigate("/login");
//       localStorage.clear();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <AppBar position="sticky">
//         <Toolbar>
//           <Typography variant="h4">Bloome</Typography>
//           {isLogin && (
//             <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
//               <Tabs
//                 textColor="inherit"
//                 value={value}
//                 onChange={(e, val) => setValue(val)}
//               >
//                 <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
//                 <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
//                 <Tab
//                   label="Create Blog"
//                   LinkComponent={Link}
//                   to="/create-blog"
//                 />
//               </Tabs>
//             </Box>
//           )}
//           <Box display={"flex"} marginLeft="auto">
//             {!isLogin && (
//               <>
//                 <Button
//                   sx={{ margin: 1, color: "white" }}
//                   LinkComponent={Link}
//                   to="/login"
//                 >
//                   Login
//                 </Button>
//                 <Button
//                   sx={{ margin: 1, color: "white" }}
//                   LinkComponent={Link}
//                   to="/register"
//                 >
//                   Register
//                 </Button>
//               </>
//             )}
//             {isLogin && (
//               <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
//                 Logout
//               </Button>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>
//   )
// }

// export default Header

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

function Header(props) {


  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState();

  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };


  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Bloome
      </Typography>
      <Divider />
      <List>
           {isLogin && (
              <>
                <Button sx={{ margin: 1, color: "black" }} LinkComponent={Link} to="/blogs" >Blogs</Button>
                <Divider />
                <Button sx={{ margin: 1, color: "black" }} LinkComponent={Link} to="/my-blogs" >My Blogs</Button>
                <Divider />
                <Button
                sx={{ margin: 1, color: "black" }}
                  LinkComponent={Link}
                  to="/create-blog"
                >Create Blog</Button>
                <Divider />
            <input
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => props.setSearch(e.target.value)}
            />
                </>
          )}
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "black" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Divider />
                <Button
                  sx={{ margin: 1, color: "black" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
                <Divider />
            <input
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => props.setSearch(e.target.value)}
            />
              </>
            )}
            {isLogin && (
             <>
             <Divider />
              <Button onClick={handleLogout} sx={{ margin: 1, color: "black" }}>
                Logout
              </Button>
              <Divider />
              </>
            )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Bloome
          </Typography>
          <input
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => props.setSearch(e.target.value)}
            />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Toolbar>
           {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blog"
                />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button onClick={handleLogout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav" style={{marginBottom: "50px"}}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        
      </Box>
      </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
