import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import EditRepetition from './editrepetition';
import BreakTimer from './breaktimer';

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgba(46, 49, 59, 1)',
    paddingTop: 64
  }
});

export default class EditWorkout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { navigator, workout, exerciseGroup, overview } = this.props;

    const repetitions = exerciseGroup.sets.map((set, i) => {
      return set.warmup ? null : (
        <View key={i}>
          <EditRepetition {...this.props} set={set} setId={i} />
          {set.rest && i !== exerciseGroup.sets.length - 1 ? <BreakTimer {...this.props} set={set} setId={i} /> : null}
        </View>
      );
    });

    return (
      <View style={styles.main}>
        <View style={{flex: 1}}>
          {repetitions}
        </View>
      </View>
    );
  }
}
