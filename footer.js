import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class Footer extends Component {
  render() {
    const { count, filter, onFilter, clearComplete } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.count}>{count} Count</Text>
        <View style={styles.filters}>
          <TouchableOpacity style={[styles.filter, filter==='ALL' && styles.selected]} onPress={() => onFilter('ALL')}>
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, filter==='ACTIVE' && styles.selected]} onPress={() => onFilter('ACTIVE')}>
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.filter, filter==='COMPLETE' && styles.selected]} onPress={() => onFilter('COMPLETE')}>
            <Text>Complete</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.clear} onPress={clearComplete}>
          <Text>Clear Completed</Text>
        </TouchableOpacity>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  count: {
  },
  filters: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  filter: {
    marginHorizontal: 2
  },
  selected: {
    borderWidth: 1,
    borderColor: 'green'
  },
  clear: {
  }
});

export default Footer;
