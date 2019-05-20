/**
 * Created by 励颖 on 2019/4/21.
 */
import React from "react";
import ChartistGraph from "react-chartist";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import AccessTime from "@material-ui/icons/AccessTime";
import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";


const delays2 = 80, durations2 = 500;
const voteChart = {

  responsiveOptions: [
    [
      "screen and (max-width: 640px)",
      {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function(value) {
            return value[0];
          }
        }
      }
    ]
  ],
  animation: {
    draw: function(data) {
      if (data.type === "bar") {
        data.element.animate({
          opacity: {
            begin: (data.index + 1) * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: "ease"
          }
        });
      }
    }
  }
};

class HistoryVote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key:0,
      options: {
        axisX: {
          showGrid: false
        },
        low: 0,
        high: 10,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      },
      votes:[{
        key:0,
        title:"EIS小组长选拔投票",
        status: "进行中",
        data:{
          labels: ["小苟","小马","小朱","小毛"],
          series: [[6,3,2,4]],
        },
        max:6,
        total:6,
        period: 15,
      },{
        key:1,
        title:"春游去哪里玩？",
        status: "进行中",
        data:{
          labels: ["上海","北京","新疆","海南"],
          series: [[10,7,8,15]],
        },
        max:15,
        total:40,
        period: 10,
      },{
        key:2,
        title:"新项目取名",
        status:"已截止，查看结果",
        data:{
          labels: ["a","b","c","d"],
          series: [[2,3,4,5]],
        },
        period: 0,
        max:5,
        total:14,
      }],

    }

    setTimeout(()=>{
      this.setState({

        votes:[
          {
            key:0,
            title:"EIS小组长选拔投票",
            status: "进行中",
            data:{
              labels: ["小苟","小马","小朱","小毛"],
              series: [[7,4,2,4]],
            },
            max:6,
            total:7,
            period: 15,
          },{
          key:1,
          title:"春游去哪里玩？",
          status: "进行中",
          data:{
            labels: ["上海","北京","新疆","海南"],
            series: [[15,12,8,15]],
          },
          max:15,
          total:40,
          period: 10,
        },{
          key:2,
          title:"新项目取名",
          status:"已截止，查看结果",
          data:{
            labels: ["a","b","c","d"],
            series: [[2,3,4,5]],
          },
          period: 0,
          max:5,
          total:14,
        }],
      },()=>{this.forceUpdate();})

    } ,2000);

  }

  handleChangeVote=(key)=>{
    this.setState({
      key:key,
      options: {
        axisX: {
          showGrid: false
        },
        low: 0,
        high: this.state.votes[key].max+2,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      },
    })
  }

  render(){
    const { classes } = this.props;
    return(
        <div>
          <GridContainer xs={12} sm={12} md={12}>
            <GridItem xs={12} sm={12} md={4}>
              <List>
              {this.state.votes.map(vote => (
                  <Button fullWidth onClick={()=>this.handleChangeVote(vote.key)}>
                    <ListItem style={{color:"#757575"}}>
                      <ListItemText primary={vote.title} secondary={vote.status}/>
                    </ListItem>
                  </Button>
              ))}
              </List>
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <Card chart>
                <CardHeader color="warning">
              <ChartistGraph
                  className="ct-chart"
                  data={this.state.votes[this.state.key].data}
                  type="Bar"
                  options={this.state.options}
                  responsiveOptions={voteChart.responsiveOptions}
                  listener={voteChart.animation}
              />
                </CardHeader>
              </Card>
              <CardBody>
                <span style={{fontSize:"20px", color:"#757575"}}>{this.state.votes[this.state.key].title}</span>
                <p className={classes.cardCategory}>
                  共有{this.state.votes[this.state.key].total}人参与了投票
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> 投票有限期为{this.state.votes[this.state.key].period}分钟
                </div>
              </CardFooter>
            </GridItem>
          </GridContainer>
        </div>
    )
  }
}

export default withStyles(dashboardStyle)(HistoryVote);