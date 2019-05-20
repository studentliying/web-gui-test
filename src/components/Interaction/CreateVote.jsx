/**
 * Created by 励颖 on 2019/4/17.
 */
import React from "react";
import { withStyles } from '@material-ui/core/styles';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import TextField from "@material-ui/core/TextField";
import InputAdornment  from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Launch from "@material-ui/icons/Launch"
import Slide from "@material-ui/core/Slide";
import Done from "@material-ui/icons/Done";
import ErrorOutline from "@material-ui/icons/ErrorOutline";
import Snackbar from "components/Snackbar/Snackbar.jsx";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const selections=[];
let websocket = null;


class CreateVote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      wordCount: 80,
      maxSelection: 1,
      period: 10,
      selectionCount:2,
      hideName: false,
    }
  }

  handleChangeDescription=(e)=>{
    this.setState({
      description: e.target.value,
      wordCount: 80 - e.target.value.length
    })
  };


  handleChangeMaxSelection=(e)=>{
    this.setState({
      maxSelection: e.target.value
    })
  };

  handleChangePeriod=(e)=>{
    this.setState({
      period:e.target.value
    })
  };

  addNewSelection=()=>{
    this.setState({
      selectionCount: this.state.selectionCount + 1
    })
  };

  handleDeleteSelection=(key)=>{
    selections.splice(key-1, 1);
    this.setState({
      selectionCount: this.state.selectionCount - 1
    },()=>{
      console.log(selections)
    })

  };

  handleFillSelection=(e, key)=>{
    //console.log(e.target.value);
    //console.log("key:",key);
    let old_length = selections.length;
    if(key > old_length)
      selections.push(e.target.value);
    else
      selections[key-1] = e.target.value;
    this.forceUpdate();
    console.log(selections);
  };

  handleHideName=()=>{
    this.setState({
      hideName: !this.state.hideName
    })
  };

  createVote=()=>{
    console.log(this.state.description);
    console.log(this.state.maxSelection);
    console.log(selections);
    this.success("创建成功！")
    if("WebSocket" in window){
      websocket = new WebSocket("ws://localhost:8080/vote/host");
    }else{
      alert("Not support websocket");
      return false;
    }
    websocket.onopen = function(event){
      console.log("建立连接成功！");
    };

    websocket.onmessage = function(event){
      console.log(event);
    }

    let socketMsg = {type:0, description:this.state.description,
                      maxSelection: this.state.maxSelection, selections: selections};
    if(websocket) {
      websocket.send(JSON.stringify(socketMsg));
    }

  };

  showSelections=(key)=>{
    //console.log("key:",key);
    let label = "选项"+key;
      return (
        <GridItem xs={12} sm={12} md={7}>
          <TextField
            id="standard-with-placeholder"
            label={label}
            placeholder={label}
            margin="normal"
            fullWidth
            variant="outlined"
            value={selections[key-1]}
            style={{color:"#757575", width:"80%", marginLeft:"1%"}}
            onChange={(e)=>this.handleFillSelection(e, key)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {key>2 ?
                    <IconButton onClick={()=>this.handleDeleteSelection(key)} style={{color:"#f44336"}}>
                      <RemoveCircle/>
                    </IconButton>
                      :
                      <div></div>
                  }
                </InputAdornment>
              )
            }}
          />
        </GridItem>
      )
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
    let helper = ("可输入2-80个字，还可输入" + this.state.wordCount + "个字");
    let selections = [];
    for(let i=1; i<=this.state.selectionCount; i++)
      selections.push(this.showSelections(i));

    return(
        <div>
          <GridContainer xs={12} sm={12} md={12}>
            <GridItem xs={12} sm={12} md={6}>
              <TextField
                  id="theme"
                  label="投票主题"
                  placeholder="请输入投票主题和说明"
                  fullWidth
                  value={this.state.description}
                  onChange={this.handleChangeDescription}
                  className={classes.textField}
                  margin="normal"
                  helperText={helper}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
              />
              <br/>
            </GridItem>
          </GridContainer>
          <GridContainer xs={12} sm={12} md={12}>
            <GridItem xs={12} sm={12} md={2}>
              <TextField
                  select
                  fullWidth
                  label="最大可选项个数"
                  className={classes.textField}
                  value={this.state.maxSelection}
                  onChange={this.handleChangeMaxSelection}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                  variant="outlined"
              >
                <MenuItem key={1} value={1}>1</MenuItem>
                <MenuItem key={2} value={2}>2</MenuItem>
                <MenuItem key={3} value={3}>3</MenuItem>
                <MenuItem key={4} value={4}>4</MenuItem>
                <MenuItem key={5} value={5}>5</MenuItem>
                <MenuItem key={6} value={100}>不限</MenuItem>
              </TextField>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <TextField
                  select
                  fullWidth
                  label="发布时长"
                  className={classes.textField}
                  value={this.state.period}
                  defaultValue="10分钟"
                  onChange={this.handleChangePeriod}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  margin="normal"
                  variant="outlined"
              >
                <MenuItem key={1} value={5}>5分钟</MenuItem>
                <MenuItem key={2} value={10}>10分钟</MenuItem>
                <MenuItem key={3} value={15}>15分钟</MenuItem>
                <MenuItem key={4} value={20}>20分钟</MenuItem>
                <MenuItem key={5} value={30}>30分钟</MenuItem>
                <MenuItem key={6} value={1000}>不限</MenuItem>
              </TextField>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
              <span style={{fontSize:"16px", color:"#757575", marginTop:"30%"}}>匿名</span>
              <Switch checked={this.state.hideName} onChange={this.handleHideName} color="primary"/>
            </GridItem>
          </GridContainer>
          <GridContainer xs={12} sm={12} md={12}>
            {selections}
          </GridContainer>
          <br/>
          <Button onClick={this.addNewSelection} style={{fontSize:"16px", color:"#FF6F00"}}>
            <AddCircle />&nbsp;&nbsp;添加新选项
          </Button>
          <Button onClick={this.createVote} style={{fontSize:"16px", marginLeft:"2%", color:"#FF6F00"}}>
            <Launch />&nbsp;&nbsp;发布投票
          </Button>
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

export default withStyles(styles)(CreateVote);