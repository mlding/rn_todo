import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity } from 'react-native';

class Row extends Component {
  render() {
    const { complete, text, editing, onUpdate, onEditing, onComplete, onDelete } = this.props;
    const textComponent = (
      <TouchableOpacity style={styles.textWrapper} onLongPress={() => {onEditing(true)}}>
        <Text style={[styles.text, complete && styles.complete]}>{text}</Text>
      </TouchableOpacity>
    );
    const deleteButton = (
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>
    );
    const doneButton = (
      <TouchableOpacity onPress={() => {onEditing(false)}}>
        <Text style={styles.done}>Save</Text>
      </TouchableOpacity>
    );
    const editingComponent = (
      <View style={styles.textWrapper}>
        <TextInput
          style={styles.text}
          onChangeText={onUpdate}
          value={text}
          multiline
          autoFocus
        />
      </View>
    );

    return (
      <View style={styles.container}>
        <Switch
          value={complete}
          onValueChange={onComplete}
        />

        {editing ? editingComponent : textComponent}
        {editing ? doneButton : deleteButton}
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
  },
  done: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 7,
    borderColor: 'green'
  }
});

export default Row;
