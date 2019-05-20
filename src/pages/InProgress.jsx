/**
 * Created by 励颖 on 2019/4/16.
 */
import React from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Assessment from "@material-ui/icons/Assessment";
import Launch from "@material-ui/icons/Launch";
import CardGiftCard from "@material-ui/icons/CardGiftcard";
import Assignment from "@material-ui/icons/Assignment";
import Warning from "@material-ui/icons/Warning";
import History from "@material-ui/icons/History";
import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt";
import LocalAtm from "@material-ui/icons/LocalAtm";
import Button from "@material-ui/core/Button";
import Danger from "components/Typography/Danger.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { withStyles } from '@material-ui/core/styles';
import CreateVote from "../components/Interaction/CreateVote";
import HistoryVote from "../components/Interaction/HistoryVote";

class InProgress extends  React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title:"EIS小组讨论会",
      interaction: -1 //1投票 2评分 3抽奖 4红包 5历史投票 -1无
    }
  }

  handleCreateVote=()=>{
    this.setState({
      interaction: 1
    })
  };

  handleHistoryVote=()=>{
    this.setState({
      interaction: 5
    })
  };

  handleCreateGrade=()=>{
    this.setState({
      interaction:2
    })
  };

  handleCreateLottery=()=>{
    this.setState({
      interaction:3
    })
  };

  handleCreateRedPacket=()=>{
    this.setState({
      interaction:4
    })
  };

  handleCloseCreate=()=>{
    this.setState({
      interaction: -1
    })
  };

  createDifferentInteraction=()=>{
    if(this.state.interaction === 1)
      return <p>此处为投票</p>;
    else if(this.state.interaction === 2)
      return <p>此处为评分</p>;
  };

  render(){
    const {classes} = this.props;
    let interaction = this.state.interaction;
    let detailInteraction;
    if(interaction === 1)
    {
      console.log(interaction);
      detailInteraction = (<CreateVote/>)
    }
    else if (interaction ===2)
    {
      detailInteraction = (<h3>此处是评分</h3>)
    }
    else if(interaction ===5)
    {
      detailInteraction = (<HistoryVote/>)
    }

    return(
      <div>
        <GridContainer xs={12} sm={12} md={12} >
          <GridItem xs={12} sm={12} md={12} >
            <Card>
              <CardHeader style={{color:"#757575", fontWeight:"700%", background:"#EEEEEE", marginTop:"-7%"}}>
                <h3>会议主题:&nbsp;&nbsp;&nbsp;{this.state.title}&nbsp;(进行中)</h3>
              </CardHeader>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Assessment/>
                </CardIcon>
                <p className={classes.cardCategory}>互动项目</p>
                <h3 className={classes.cardTitle} style={{fontSize:"22px", color:"#757575"}}>投票</h3>
              </CardHeader>
              <CardBody>
                <table>
                  <tbody>
                  <tr>
                    <td>
                      <Button className={classes.cardTitle}
                              style={{fontSize:"14px", color:"#757575",}}
                              onClick={this.handleCreateVote}>
                        <Launch/>&nbsp;&nbsp;发起投票
                      </Button>
                    </td>
                    <td>
                      <Button className={classes.cardTitle}
                              style={{fontSize:"14px", color:"#757575",}}
                              onClick={this.handleHistoryVote}>
                        <History/>&nbsp;&nbsp;查看历史
                      </Button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <ThumbUpAlt/>
                </CardIcon>
                <p className={classes.cardCategory}>互动项目</p>
                <h3 className={classes.cardTitle} style={{fontSize:"22px", color:"#757575"}}>评分</h3>
              </CardHeader>
              <CardBody>
                <table>
                  <tbody>
                  <tr>
                    <td>
                      <Button className={classes.cardTitle}
                              style={{fontSize:"14px", color:"#757575",}}
                              onClick={this.handleCreateGrade}>
                        <Launch/>&nbsp;&nbsp;发起评分
                      </Button>
                    </td>
                    <td>
                      <Button className={classes.cardTitle} style={{fontSize:"14px", color:"#757575",}}>
                        <History/>&nbsp;&nbsp;查看历史
                      </Button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <CardGiftCard/>
                </CardIcon>
                <p className={classes.cardCategory}>互动项目</p>
                <h3 className={classes.cardTitle} style={{fontSize:"22px", color:"#757575"}}>抽奖</h3>
              </CardHeader>
              <CardBody>
                <table>
                  <tbody>
                  <tr>
                    <td>
                      <Button className={classes.cardTitle}
                              style={{fontSize:"14px", color:"#757575"}}
                              onClick ={this.handleCreateLottery}>
                        <Launch/>&nbsp;&nbsp;发起抽奖
                      </Button>
                    </td>
                    <td>
                      <Button className={classes.cardTitle} style={{fontSize:"14px", color:"#757575",}}>
                        <History/>&nbsp;&nbsp;查看历史
                      </Button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <LocalAtm/>
                </CardIcon>
                <p className={classes.cardCategory}>互动项目</p>
                <h3 className={classes.cardTitle} style={{fontSize:"22px", color:"#757575"}}>红包</h3>
              </CardHeader>
              <CardBody>
                <table>
                  <tbody>
                  <tr>
                    <td>
                      <Button className={classes.cardTitle}
                              style={{fontSize:"14px", color:"#757575",}}
                              onClick={this.handleCreateRedPacket}>
                        <Launch/>&nbsp;&nbsp;发起红包
                      </Button>
                    </td>
                    <td>
                      <Button className={classes.cardTitle} style={{fontSize:"14px", color:"#757575",}}>
                        <History/>&nbsp;&nbsp;查看历史
                      </Button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                {detailInteraction}
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }

}

export default withStyles(dashboardStyle)(InProgress);