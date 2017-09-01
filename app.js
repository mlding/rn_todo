import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, ListView, Keyboard, AsyncStorage, ActivityIndicator } from 'react-native';
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
      loading: true,
      filter: 'ALL',
      allComplete: false,
      value: '',
      items: [],
      dataSource: ds.cloneWithRows([])
    };

    this.setSource = this.setSource.bind(this);
    this.handleUpdateText = this.handleUpdateText.bind(this);
    this.handleToggleEditing = this.handleToggleEditing.bind(this);
    this.clearComplete = this.clearComplete.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
  }

  componentWillMount() {
    AsyncStorage.getItem('items').then(itemsStr => {
      try{
        const items = JSON.parse(itemsStr);
        const newItems = items.map(item => {item.editing = false});
        this.setSource(items, items, {loading: false});
      }catch(e) {
        this.setState({
          loading: false
        });
      }
    });
  }

  setSource(items, itemsDataSource, otherState) {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ...otherState
    });

    AsyncStorage.setItem('items', JSON.stringify(items));
  }

  handleUpdateText(key, text) {
    const newItems = this.state.items.map(item => {
      if(item.key !== key) return item;
      return {
        ...item,
        text
      }
    });
    this.setSource(newItems, filterItems(newItems, this.state.filter));
  }

  handleToggleEditing(key, editing) {
    const newItems = this.state.items.map(item => {
      if(item.key !== key) return item;
      return {
        ...item,
        editing
      }
    });

    this.setSource(newItems, filterItems(newItems, this.state.filter));
  }

  clearComplete() {
    const { items } = this.state;
    this.setSource(filterItems(items, 'ACTIVE'), filterItems(items, 'ACTIVE'), {filter: 'ALL'});
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
        complete: false,
        editing: false
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
          renderRow={({key, text, complete, editing}) => {
            return (
              <Row
                text={text}
                complete={complete}
                editing={editing}
                onUpdate={(text) => {this.handleUpdateText(key, text)}}
                onEditing={(editing) => {this.handleToggleEditing(key, editing)}}
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

        {
          this.state.loading
          &&
          <ActivityIndicator
            style={styles.loading}
            size='large'
          />
        }
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
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray'
  }
});

export default App;
