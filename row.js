import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';

class Row extends Component {
  render() {
    const { complete, text, onComplete, onDelete } = this.props;

    return (
      <View style={styles.container}>
        <Switch
          value={complete}
          onValueChange={onComplete}
        />
        <View style={styles.textWrapper}>
          <Text style={[styles.text, complete && styles.complete]}>{text}</Text>
        </View>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.delete}>X</Text>
        </TouchableOpacity>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  textWrapper: {
    flex: 1,
    paddingHorizontal: 20
  },
  text: {
    fontSize: 24,
    color: 'red'
  },
  complete: {
    textDecorationLine: 'line-through'
  },
  delete: {
    fontSize: 20,
    color: 'red'
  }
});

export default Row;
