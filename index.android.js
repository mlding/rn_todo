import React, { Component } from 'react';
import { AppRegistry, View, ListView, Text } from 'react-native';
import App from './app';

class MyComponent extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
    };
  }

  render() {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',

      }}>

        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue', flex: 1}} />
        <View style={{width: 50, height: 50, backgroundColor: 'red'}} />
      </View>
    );
  }
}

AppRegistry.registerComponent('todo', () => MyComponent );
