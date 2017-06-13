import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/notificationActions';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {white} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Mail from 'material-ui/svg-icons/content/mail'

class NotificationList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      profile: props.auth.getProfile()
    };
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile});
    });
  }

  componentWillMount() {
    this.props.actions.loadNotifications(this.state.profile.uid);
  }

  render() {
    // console.log(this.props);
    const {notifications} = this.props;
    return (
      <IconMenu
        color={white}
        iconButtonElement={<IconButton><Mail color={white}/></IconButton>}
        targetOrigin={{horizontal: "right", vertical: "top"}}
        anchorOrigin={{horizontal: "right", vertical: "bottom"}}
      >
        {notifications.map(notification =>
          <MenuItem key={1} primaryText={notification.text}/>
        )}
      </IconMenu>
    );
  }
}

NotificationList.propTypes = {
  notifications: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    notifications: state.notifications
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)};
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);