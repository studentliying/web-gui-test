/**
 * Created by 励颖 on 2019/1/31.
 */
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import Search from '@material-ui/icons/Search';
import Person from '@material-ui/icons/Person';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {searchController} from "variables/general.jsx";


const styles = theme => ({
  root: {
    width: '100%',
    margin:"0px 0px"
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

const cookies = new Cookies();



class PrimarySearchAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      username: "",
      password: "",
      content: "",
      meetingNotes:[],
      meetingRooms:[],
      meetings:[],
      users:[],
      meetingNotesList:[],
      meetingRoomsList:[],
      meetingsList:[],
      usersList:[],
      results:[],
      open:false
    };
  }

  Transition(props) {
  return <Slide direction="up" {...props} />;
  }

  handleClose = () => {
    this.setState({ open: false });
  };


  handleProfileMenuOpen = event => {
    console.log("login:", cookies.get("userId"));
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleLogout = ()=>{
    cookies.removeChangeListener();
    cookies.remove("login",true, { path: "/" });
    cookies.remove("username", cookies.get("username"),{ path: "/" } );
    cookies.remove("userId", cookies.get("userId"), { path: "/" });
    window.location.href = "/";
  };

  handleContentChange=(e)=>{
    console.log(e.target.value);
    this.setState({
      content: e.target.value
    })
  };


  handleSearch=()=>{
    console.log(this.state.content);
    window.location.href = "/search/"+this.state.content;
    /*fetch(searchController.search(this.state.content), {
      credentials: 'include',
      method:'get',
    })
        .then(response => {
          console.log('Request successful', response);
          return response.json()
              .then(result => {
                console.log("totalCount:", result.totalCount);
                this.setState({
                  meetingNotes: result.meetingNotes,
                  meetingRooms: result.meetingRooms,
                  meetings: result.meetings,
                  users: result.users,
                });
              });
        })*/
  };


    render() {
      const { anchorEl,} = this.state;
      const { classes } = this.props;
      const isMenuOpen = Boolean(anchorEl);

      for(let i=0; i<this.state.meetingNotes.length; i++)
        this.state.meetingNotesList.push(
            <ListItem>{this.state.meetingNotesList[i].id}</ListItem>
        )

      const renderMenu = (
          <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMenuOpen}
              onClose={this.handleMenuClose}
          >
              <MenuItem >修改个人资料</MenuItem>
              <MenuItem onClick={this.handleLogout}>退出登录</MenuItem>
          </Menu>
      )

      return (
        <div className={classes.root}>
              <AppBar position="absolute" style={{boxShadow:"0px 0px 0px #BDBDBD"}} >

                  <Toolbar  style={{background:"#EEEEEE"}}>
                      <div className={classes.search} style={{marginLeft:"68%" }}>
                            <TextField  placeholder="Search..." margin="normal" onChange={this.handleContentChange} />

                          <IconButton onClick={this.handleSearch}> <Search style={{color:"#757575"}} /></IconButton>

                      </div>
                      <div className={classes.grow} />
                      <div className={classes.sectionDesktop}>
                          <IconButton color="#bdbdbd">
                              <Badge badgeContent={4} color="secondary">
                                  <MailIcon />
                              </Badge>
                          </IconButton>
                          <IconButton color="#bdbdbd">
                              <Badge badgeContent={17} color="secondary">
                                  <NotificationsIcon />
                              </Badge>
                          </IconButton>
                          <IconButton
                              aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                              aria-haspopup="true"
                              onClick={this.handleProfileMenuOpen}
                              color="#bdbdbd"
                          >
                              <Person />
                          </IconButton>
                      </div>
                  </Toolbar>
              </AppBar>
              {renderMenu}


          </div>
      );
  }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PrimarySearchAppBar);
