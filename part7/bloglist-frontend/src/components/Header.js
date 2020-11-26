import React, { useState, useCallback } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogout } from '../reducers/userReducer'
import storage from '../utils/storage'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import { Hidden } from '@material-ui/core'
import NavigationDrawer from './NavigationDrawer'

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.black,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center'
    flexDirection: 'row',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  noDecoration: {
    textDecoration: 'none !important',
    color: 'white',
  },
}))

const Header = () => {
  const user = useSelector((state) => state.user)
  const history = useHistory()
  const dispatch = useDispatch()
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  const classes = useStyles()

  const handleLogout = () => {
    dispatch(userLogout())
    storage.logoutUser()
    history.push('/login')
  }

  const handleMobileDrawerOpen = () => {
    setIsMobileDrawerOpen(true)
  }

  const handleMobileDrawerClose = () => {
    setIsMobileDrawerOpen(false)
  }

  const menuItems = [
    {
      link: '/',
      name: 'Home',
      icon: <HomeIcon className="text-white" />,
    },
    {
      link: '/users',
      name: 'Users',
      icon: <PersonIcon className="text-white" />,
    },
    {
      name: 'Logout',
    },
  ]

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div>
            <Typography variant="h5">Blog App</Typography>
          </div>
          <div>
            <Hidden mdUp>
              <IconButton className={classes.menuButton}>
                <MenuIcon
                  className={classes.noDecoration}
                  onClick={handleMobileDrawerOpen}
                />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              <Link to="/users" className={classes.noDecoration}>
                <Button color="secondary">Users</Button>
              </Link>
              <Link to="/" className={classes.noDecoration}>
                <Button color="secondary">Blogs</Button>
              </Link>
              {user.name} logged in
              <Button color="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        menuItems={menuItems}
        anchor="right"
        open={isMobileDrawerOpen}
        // selectedItem={selectedTab}
        onClose={handleMobileDrawerClose}
        handleLogout={handleLogout}
      />
    </div>
  )
}

export default Header
