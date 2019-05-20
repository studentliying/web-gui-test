/**
 * Created by 励颖 on 2019/4/16.
 */
import React from "react";
import PropTypes from "prop-types";
import classnames from 'classnames';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Assignment from "@material-ui/icons/Assignment"
import Slide from "@material-ui/core/Slide";
import Done from "@material-ui/icons/Done";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import List from "@material-ui/icons/List";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Snackbar from "components/Snackbar/Snackbar.jsx";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 100,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    minWidth: 100,
  },

  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cardTitle: {
    color: "#3C4858",
    marginRight: "100px"
  },
});

const CustomTableCell = withStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}))(TableCell);

class MeetingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      meeting_id:"1555952875258",
      title:"EIS小组讨论会",
      description:"将讨论一下大作业选题以及小组分工等事宜",
      location:"软件学院3501",
      start_time:25,
      end_time:29,
      date:"2019年4月25日",
      hostname: "励颖",
      status:"pending",
      toSend:"",
      sendDialog: false,
      attendants:["George",],
      users:[
        {
          username: "George",
          status:"已接受邀请"
        },
        {
          username:"吴正雨",
          status:"未加入",
        },
        {
          username:"王韡熙",
          status:"未加入",
        }
      ],
    };
  }

  convertToRealtime=(date, start, end)=>{
    let startTime = "";
    let endTime = "";
    if (start % 2 === 0)
      startTime =  String(start / 2) + ":00";
    else
      startTime = String((start - 1 ) / 2) + ":30";
    if(end % 2 === 0)
      endTime =  String(end / 2) + ":00";
    else
      endTime = String((end - 1 ) / 2) + ":30";
    console.log(startTime + "-" + endTime);
    return (date + " " + startTime + "-" + endTime);
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleSendDialogOpen=(user)=>{
    this.setState({
      toSend: user.username,
      sendDialog: true
    })
  };

  handleSendDialogClose=()=>{
    this.setState({
      sendDialog: false,
      toSend: ""
    })
  };

  handleSendInvitation=()=>{
    this.setState({
      sendDialog: false,
      toSend: ""
    });
    this.state.users[1].status = "等待加入";
    this.success("成功发送邀请！");
    this.forceUpdate();

  }

  Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  typeToIcon = (type) => {
    if (type === "success")
      return Done;
    if (type === "danger")
      return ErrorOutline;
    return null;
  };

  success = (msg) => {
    this.setState({
      notificationType: "success",
      notificationMessage: msg
    });
    this.showNotification("br");
  };

  warning = (msg) => {
    this.setState({
      notificationType: "danger",
      notificationMessage: msg
    });
    this.showNotification("br");
  };

  showNotification = (place) => {
    let x = [];
    x[place] = true;
    this.setState({[place]: true});
    this.alertTimeout = setTimeout(
        function() {
          x[place] = false;
          this.setState(x);
        }.bind(this),
        6000
    );
  };

  render(){
    const { classes } = this.props;
  return(
      <div>
        <GridContainer xs={12} sm={12} md={12}>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <Assignment/>
                  </CardIcon>

              </CardHeader>
              <CardBody style={{color:"#757575"}}>
                <h3>会议主题:&nbsp;&nbsp;&nbsp;{this.state.title}</h3>
                <h5>会议时间：{this.convertToRealtime(this.state.date, this.state.start_time, this.state.end_time)}</h5>
                <h5>会议地点：{this.state.location}</h5>
                <h5>会议描述：{this.state.description}</h5>
                <h5>主持人：{this.state.hostname}</h5>
              </CardBody>

            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="primary" stats icon>
                <CardIcon color="primary">
                  <List/>
                </CardIcon>
              </CardHeader>
              <CardBody>
                <Table className="room page" style={{width:"95%", marginLeft:"2%"}}>
                  <TableHead>
                    <TableRow >
                      <CustomTableCell  style={{width:"9%", color:"#9C27B0",fontSize:"18px", textAlign:"center"}}>用户</CustomTableCell>
                      <CustomTableCell  style={{width:"13%",color:"#9C27B0", fontSize:"18px", textAlign:"center"}}>状态</CustomTableCell>
                      <CustomTableCell  style={{width:"12%",color:"#9C27B0", fontSize:"18px", textAlign:"center"}}>操作</CustomTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.users.map(user => (
                        <TableRow>
                          <CustomTableCell style={{width:"9%", fontSize:"16px", color:"#424242", textAlign:"center"}}>{user.username}</CustomTableCell>
                          <CustomTableCell style={{width:"13%", fontSize:"16px", color:"#424242", textAlign:"center"}}>{user.status}</CustomTableCell>
                            {
                              user.status === "未加入" ?
                                  <CustomTableCell style={{width:"12%", fontSize:"16px", color:"#424242", textAlign:"center"}}>
                                    <Button style={{color:"#3F51B5"}} onClick={()=>this.handleSendDialogOpen(user)}>发送邀请</Button>
                                  </CustomTableCell>
                                      :
                                  <CustomTableCell style={{width:"12%", fontSize:"16px", color:"#424242", textAlign:"center"}}>
                                    <Button disabled={true}>不可添加</Button>
                                  </CustomTableCell>
                            }
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Dialog
                    open={this.state.sendDialog}
                    keepMounted
                    onClose={this.handleSendDialogClose}
                    maxWidth="xs"
                    fullWidth={true}
                >
                  <DialogContent>
                    <span style={{marginLeft:"5%", fontSize:"20px"}}>确认发送邀请给{this.state.toSend}吗？</span>
                  </DialogContent>
                  <DialogActions >
                    <Button style={{background:"#e57373", color:"white"}} onClick={this.handleSendInvitation}>确认</Button>
                    <Button style={{background:"#757575", color:"white"}} onClick={this.handleSendDialogClose}>关闭</Button>
                  </DialogActions>
                </Dialog>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <Snackbar
            place="br"
            color={this.state.notificationType}
            icon={this.typeToIcon(this.state.notificationType)}
            message={this.state.notificationMessage}
            open={this.state.br}
            closeNotification={() => this.setState({ br: false })}
            close
        />


      </div>
  )}
}

export default withStyles(styles)(MeetingPage);