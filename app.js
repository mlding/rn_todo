import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ListView, Keyboard } from 'react-native';
import Header from './header';
import Footer from './footer';
import Row from './row';

const filterItems = (items, filter) => {
  const filters  = {
    'ALL': items,
    'ACTIVE': items.filter(item => !item.complete),
    'COMPLETE': items.filter(item => item.complete)
  };
  return filters[filter];
};

class App extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      filter: 'ALL',
      allComplete: false,
      value: '',
      items: [],
      dataSource: ds.cloneWithRows([])
    };

    this.setSource = this.setSource.bind(this);
    this.clearComplete = this.clearComplete.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
  }

  setSource(items, itemsDataSource, otherState) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ...otherState
    })
  }

  clearComplete() {
    const { items } = this.state;
    this.setSource(filterItems(items, 'ACTIVE'), filterItems(items, ACTIVE), {filter: 'ALL'});
  }

  handleFilter(filter) {
    const { items } = this.state;
    this.setSource(items, filterItems(items, filter), {filter});
  }

  handleDelete(key) {
    const newItems = this.state.items.filter(item => {
      return item.key !== key
    });

    this.setSource(newItems, filterItems(newItems, this.state.filter));
  }

  handleToggleComplete(key, complete) {
    const newItems = this.state.items.map(item => {
      if(item.key !== key) return item;
      else {
        return {
          ...item,
          complete
        }
      }
    });

    console.table(newItems);
    this.setSource(newItems, filterItems(newItems, this.state.filter));
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map(item => ({
      ...item,
      complete
    }));

    this.setSource(newItems, filterItems(newItems, this.state.filter), {allComplete: complete});
  }

  handleAddItem() {
    if(!this.state.value) return;
    const newItems = [
      ...this.state.items,
      {
        key: Date.now(),
        text: this.state.value,
        complete: false
      }
    ];

    this.setSource(newItems, filterItems(newItems, this.state.filter), {value: ''});
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          style={styles.header}
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={value => this.setState({value})}
          onToggleAllComplete={this.handleToggleAllComplete}
          />
        <ListView
          style={styles.content}
          enableEmptySections
          dataSource={this.state.dataSource}
          onScroll={() => Keyboard.dismiss()}
          renderRow={({key, text, complete}) => {
            return (
              <Row
                text={text}
                complete={complete}
                onComplete={(complete) => {this.handleToggleComplete(key, complete)}}
                onDelete = {() => {this.handleDelete(key)}}
              />
            )
          }}
          renderSeparator={(sectionId, rowId) => {
            return <View style={styles.separator} key={rowId} />
          }}
        />
        <Footer
          count={filterItems(this.state.items, 'ACTIVE').length}
          filter={this.state.filter}
          onFilter={this.handleFilter}
          clearComplete={this.clearComplete} />
      </View>
    )
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'space-between'
  },
  header: {
    ...Platform.select({
      ios: { paddingTop: 30 }
    })
  },
  content: {
    flex: 1,
    backgroundColor: 'skyblue'
  },
  separator: {
    borderWidth: 1,
    borderColor: 'green'
  }
});

export default App;