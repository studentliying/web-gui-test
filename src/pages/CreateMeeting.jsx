/**
 * Created by 励颖 on 2019/4/22.
 */
import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "@material-ui/core/Button";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Slide from "@material-ui/core/Slide";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import Done from "@material-ui/icons/Done";
import ErrorOutline from "@material-ui/icons/ErrorOutline";

import avatar from "assets/img/faces/marc.jpg";

const styles = theme => ({
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "16px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "400",
    fontSize:"22px",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

function timeStringToInt(time) {
  let hour_string = time.substr(0,2);
  let minute_string = time.substr(3,2);
  let result = parseInt(hour_string)*2 ;
  if( parseInt(minute_string) > 0)
    result += 1;
  console.log(result);
  return result;
}

class CreateMeeting extends  React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users:[],
      attendants:[],
      title:"会议主题",
      location:"会议场所",
      date:"2019-4-22",
      startTime:"07:30",
      endTime:"16:30",
      description:"请输入与会议相关的详细信息..",
      br: false,
      notificationMessage: "null",
      notificationType: null,
    };

    fetch('http://207.148.107.114:8080/users/getAllUsers',
        {
          method: 'GET',
          mode: 'cors',
        })
        .then(response => {
          console.log('Request successful', response);
          return response.json()
              .then(result => {
                console.log("result:", result.User.length);
                for(let i=0; i<result.User.length; i++){
                  let user = result.User[i];
                  let new_user={};
                  new_user.username = user.username;
                  new_user.attend = false;
                  this.state.users.push(new_user);
                }
                console.log(this.state.users);
                this.forceUpdate();
              })
        })

  }

  handleChangeTitle=(e)=>{
    console.log(e.target.value);
    this.setState({
      title: e.target.value
    })
  };

  handleChangeLocation=(e)=>{
    console.log(e.target.value);
    this.setState({
      location: e.target.value
    })
  };

  handleChangeDate=(e)=>{
    console.log(e.target.value);
    this.setState({
      date: e.target.value
    })
  };

  handleChangeStartTime=(e)=>{
    console.log(e.target.value);
    this.setState({
      startTime: e.target.value
    });
  };

  handleChangeEndTime=(e)=>{
    console.log(e.target.value);
    this.setState({
      endTime: e.target.value
    })
  };

  handleChangeDescription=(e)=>{
    console.log(e.target.value);
    this.setState({
      description: e.target.value
    })
  };

  handleChangeAttendants=(username)=>{
    let index = this.state.attendants.indexOf(username);
    let user_index = 0;
    for(let i=0; i<this.state.users.length; i++)
    {
      if(this.state.users[i].username === username)
      {
        user_index = i;
        break;
      }
    }
    if(index === -1) {
      this.state.attendants.push(username);
      this.state.users[user_index].attend = !this.state.users[user_index].attend;
      console.log("1:", this.state.users[user_index].attend);
    }
    else {
      this.state.attendants.splice(index, 1);
      this.state.users[user_index].attend = !this.state.users[user_index].attend;
      console.log("2:", this.state.users[user_index].attend);
    }
    console.log(this.state.attendants);
    this.forceUpdate();
  };

  createMeeting=()=>{
    let start = timeStringToInt(this.state.startTime);
    let end = timeStringToInt(this.state.endTime);
    console.log("date:", this.state.date);
    console.log("description:", this.state.description);
    console.log("location:", this.state.location);
    console.log("title:", this.state.title);
    fetch("http://207.148.107.114:8080/meetings/addMeeting", {
      method:'POST',
      mode:'cors',
      headers:{
        'Accept': '*/*',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        'date': this.state.date,
        "description": this.state.description,
        "end_time": end,
        "host_name": "励颖",
        "location": this.state.location,
        "meeting_id": 10,
        "start_time": start,
        "status": "pending",
        "title": this.state.title
      })
    })
        .then(response => {
          console.log('Request successful', response);
          return response.json()
              .then(result => {
                console.log("result:", result);
                if(response.status === 200)
                  this.success("创建成功！");
                else
                  this.warning("创建失败！");
                // window.location.href = "/"
              });
        })
    this.success("创建成功");
  };

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
    const{classes} = this.props;

    return (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className={classes.cardTitleWhite}>创建会议</h4>
                  <p className={classes.cardCategoryWhite}>请填写以下相关信息</p>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                          label="会议主题"
                          fullWidth
                          value={this.state.title}
                          style={{marginTop:"10%"}}
                          variant="outlined"
                          onChange={this.handleChangeTitle}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                          label="会议地点"
                          fullWidth
                          value={this.state.location}
                          style={{marginTop:"10%"}}
                          variant="outlined"
                          onChange={this.handleChangeLocation}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                          label="主持人"
                          fullWidth
                          disabled={true}
                          defaultValue="励颖"
                          style={{marginTop:"10%"}}
                          variant="outlined"
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                          label="会议日期"
                          type="date"
                          value={this.state.date}
                          fullWidth
                          style={{marginTop:"15%"}}
                          variant="outlined"
                          onChange={this.handleChangeDate}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                          label="开始时间"
                          type="time"
                          value={this.state.startTime}
                          fullWidth
                          inputProps={{
                            step: 1800, // 30 min
                          }}
                          style={{marginTop:"15%"}}
                          variant="outlined"
                          onChange={this.handleChangeStartTime}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <TextField
                          label="结束时间"
                          type="time"
                          fullWidth
                          value={this.state.endTime}
                          inputProps={{
                            step: 1800, // 30 min
                          }}
                          style={{marginTop:"15%"}}
                          variant="outlined"
                          onChange={this.handleChangeEndTime}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <TextField
                          label="会议描述"
                          multiline
                          rows="4"
                          fullWidth
                          margin="normal"
                          style={{marginTop:"10%"}}
                          variant="outlined"
                          value={this.state.description}
                          onChange={this.handleChangeDescription}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <Button style={{background:"#9C27B0", color:"white", fontSize:"16px", marginTop:"10%"}}
                              onClick={this.createMeeting}>创建会议</Button>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <CardAvatar profile>
                  <a href="#pablo" onClick={e => e.preventDefault()}>
                    <img src={avatar} alt="..." />
                  </a>
                </CardAvatar>
                <CardBody profile>
                  {this.state.users.map(user => (
                      <FormControlLabel
                          control={
                            <Checkbox
                                checked={(user.username === "励颖")? true:user.attend}
                                disabled={(user.username === "励颖")?true:false}
                                onChange={()=>this.handleChangeAttendants(user.username)}
                            />
                          }
                          label={user.username}
                      />
                  ))}
                  <br/>
                  <br/>
                  <Button style={{background:"#9C27B0", color:"white", marginLeft:"30%", fontSize:"16px"}}
                          disabled={true} onClick={this.createMeeting}>
                    添加与会人员
                  </Button>
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
    )
  }
}

export default withStyles(styles)(CreateMeeting);