import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { ExitToAppIcon, PersonIcon, PeopleIcon, BarChartIcon, PostAddIcon } from '@material-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
))

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem)

export default function DropDown ({ user, saveState, handleLogout }) {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        <FontAwesomeIcon className="text-white fa-2x" icon={faBars} />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/dashboard">
          <StyledMenuItem onClick={handleClose}>
            <ListItemIcon>
              <PostAddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Posts" />
          </StyledMenuItem>
        </Link>
        <Link to="/users">
          <StyledMenuItem onClick={handleClose}>
            <ListItemIcon>
              <PeopleIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </StyledMenuItem>
        </Link>
        <Link to={`/userprofile/${user?.id}`} onClick={() => saveState(user?.id)}>
          <StyledMenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </StyledMenuItem>
        </Link>
        <Link to={`/${user?.id}/experiences`} onClick={() => saveState(user?.id)}>
          <StyledMenuItem onClick={handleClose}>
            <ListItemIcon>
              <BarChartIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Experiences" />
          </StyledMenuItem>
        </Link>
          <StyledMenuItem onClick={handleClose}>
            <ListItemIcon onClick={() => handleLogout()} >
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText onClick={() => handleLogout()} primary="Logout" />
          </StyledMenuItem>
      </StyledMenu>
    </div>
  )
}
