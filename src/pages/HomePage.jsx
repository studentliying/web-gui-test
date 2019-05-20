/**
 * Created by 励颖 on 2019/4/15.
 */
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import SentimentVerySatisfied from "@material-ui/icons/SentimentVerySatisfied";
import MeetingInfo from "views/Meeting/MeetingInfo.jsx";
import * as QrCode from 'qrcode.react'



const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDetail: false,
      meeting_id:"",
      title:"",
      description:"",
      location:"",
      start_time: -1,
      end_time: -1,
      date:"",
      hostname:"",
      attendants:[],
      showQR: false,
      meetings: [
        {
          meeting_id:"1555950324730",
          title:"EIS小组讨论会",
          description:"将讨论一下大作业选题以及小组分工等事宜",
          location:"软件学院3501",
          start_time:25,
          end_time:29,
          date:"2019年4月25日",
          hostname: "励颖",
          attendants:["George","吴正雨"]
        },
        {
          meeting_id:"123456789",
          title:"IST实验室年会",
          description:"一年一度的实验室年会",
          location:"软件学院3101",
          start_time:30,
          end_time:35,
          date:"2019年4月20日",
          hostname: "Jack",
          attendants:["Rose","Alice"]
        },
        {
          meeting_id:"123456789",
          title:"IPADS实验室年会",
          description:"一年一度的实验室年会",
          location:"软件学院3107",
          start_time:38,
          end_time:44,
          date:"2019年12月20日",
          hostname: "Jack",
          attendants:["Rose","Alice"]
        },
      ]
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

  handleDetail=(meeting)=>{
    this.setState({
      meeting_id: meeting.meeting_id,
      showDetail: true,
      detailMeeting: meeting,
      title: meeting.title,
      description: meeting.description,
      location: meeting.location,
      start_time: meeting.start_time,
      end_time: meeting.end_time,
      date: meeting.date,
      hostname: meeting.hostname,
      attendants: meeting.attendants,
    })
  };

  handleDetailClose=()=>{
    this.setState({
      showDetail:false,
      detailMeeting:{}
    })
  };

  handleQRClose=()=>{
    this.setState({
      showQR: false
    })
  };

  handleStartMeeting=(meeting)=>{
    this.setState({
      showQR: true,
      meeting_id: meeting.meeting_id
    })
  };

  render() {
    const { classes} = this.props;
    let detailMeeting = this.state.detailMeeting;
    return(
      <div>
        <GridContainer xs={12} sm={12} md={12}>
          {
            this.state.meetings.map((meeting) => {
              return (
                  <GridItem xs={12} sm={6} md={6} key={meeting.meeting_id}>
                    <Card>
                      <CardHeader color="success" stats icon>
                        <CardIcon color="success">
                          {<SentimentVerySatisfied/>}
                        </CardIcon>
                        <Button style={{background:"#5C6BC0", marginLeft:"3%", marginTop:"5%", color:"white"}}
                                onClick={()=>this.handleDetail(meeting)}>查看详情</Button>
                        <Button style={{background:"#5C6BC0", marginLeft:"1%",marginTop:"5%", color:"white"}}
                                onClick={()=>this.handleStartMeeting(meeting)}>开启会议</Button>
                      </CardHeader>

                      <CardBody style={{color:"grey"}}>
                        <Link to={"/meeting/" + meeting.meeting_id}>
                          <h4 >会议主题：{meeting.title}</h4>
                        </Link>
                        <middle>会议时间：{this.convertToRealtime(meeting.date, meeting.start_time, meeting.end_time)}</middle>
                        <middle style={{marginLeft:"10%"}}>会议地点：{meeting.location}</middle>
                      </CardBody>
                    </Card>
                  </GridItem>
              )
            })
          }
        </GridContainer>
        <Dialog
            open={this.state.showDetail}
            keepMounted
            onClose={this.handleDetailClose}
            maxWidth="sm"
            fullWidth={true}
        >
          <DialogTitle style={{fontSize:"40px"}}>
            {"详细信息"}
          </DialogTitle>
          <DialogContent>
            <MeetingInfo title={this.state.title} description={this.state.description}
                          time={this.convertToRealtime(this.state.date, this.state.start_time, this.state.end_time)}
                          location={this.state.location} hostname={this.state.hostname}
                          attendants={this.state.attendants}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDetailClose}
                    style={{width: "15%", fontSize: "16px", background:"#3F51B5", color:"white"}}>
              取消
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
            open={this.state.showQR}
            keepMounted
            onClose={this.handleQRClose}
            maxWidth="xs"
            fullWidth={true}
        >
          <DialogTitle style={{fontSize:"40px", marginLeft:"30%"}}>
            {"扫码加入会议"}
          </DialogTitle>
          <DialogContent>
            <QrCode value={this.state.meeting_id} size={200} style={{marginLeft:"20%"}}/>
          </DialogContent>
        </Dialog>

      </div>
    )
  }

}

export default withStyles(styles)(HomePage);
