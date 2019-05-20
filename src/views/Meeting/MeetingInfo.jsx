/**
 * Created by 励颖 on 2019/4/15.
 */
import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TextField from "@material-ui/core/TextField";
import FormLabel from '@material-ui/core/FormLabel';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";


const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },

});

class MeetingInfo extends React.Component{
  constructor(props) {
    super(props);

  }

  render(){
    const { classes } = this.props;
    return(
        <div>
          <GridContainer xs={12} sm={12} md={12}>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="会议标题"
                  name="title"
                  fullWidth
                  inputProps={{
                      readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.title}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <TextField
                  label="会议描述"
                  name="description"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.description}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="会议地点"
                  name="location"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.location}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={8}>
              <TextField
                  label="会议时间"
                  name="time"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.time}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
              <TextField
                  label="主持人"
                  name="hostname"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                  className={classes.textField}
                  value={this.props.hostname}
                  margin="normal"
                  variant="outlined"
              />
            </GridItem>
              <GridItem xs={12} sm={12} md={8}>
                <TextField
                    label="与会人员"
                    name="attendants"
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                    className={classes.textField}
                    value={this.props.attendants}
                    margin="normal"
                    variant="outlined"
                />
              </GridItem>

          </GridContainer>
        </div>
    )
  }
}

MeetingInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(MeetingInfo);