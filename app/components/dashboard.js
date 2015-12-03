import React, {
  StyleSheet,
  Component,
  View,
  Text,
  Image
} from 'react-native';

import WeekNav from './weeknav';
import WeekView from './weekview';
import WorkoutButton from './workoutbutton';
import CenteredText from './centeredtext';

const styles = StyleSheet.create({
  main: {
    // fontFamily: 'PT Sans',
    flex: 1,
    backgroundColor: 'rgba(41, 44, 53, 0.95)'
  },
  background: {
    flex: 1,
    paddingTop: 74
  }
});

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.state && this.props.state.plan && this.props.state.plan.ok){
      return (
        <View style={styles.main}>
          <Image
            style={styles.background}
            source={{uri: 'http://app.fitbird.com/app/static/img/background-bird.png'}}
          >
            <WeekView {...this.props}/>
            <WeekNav {...this.props}/>
          </Image>
        </View>
      );
    } else if(this.props.state && this.props.state.plan && this.props.state.plan.ok === false){
      return (
        <View style={styles.main}>
          <Image
            style={styles.background}
            source={{uri: 'http://app.fitbird.com/app/static/img/background-bird.png'}}
          >
            <CenteredText text="You will recieve an e-mail notification when your coach has reviewed your profile and created your plan."/>
          </Image>
        </View>
      );
    } else {
      return (
        <View style={styles.main}>
          <Image
            style={styles.background}
            source={{uri: 'http://app.fitbird.com/app/static/img/background-bird.png'}}
          >
            <CenteredText text="Loading your plan..."/>
          </Image>
        </View>
      );
    }
  }
}
