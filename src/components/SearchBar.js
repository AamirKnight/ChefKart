import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import LeftArrowIcon from '../../assets/leftArrow';
import SearchIcon from '../../assets/search';

const SearchBar = ({ searchText, onSearchChange, placeholder }) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        {/* Left arrow */}
        <TouchableOpacity style={styles.iconLeft}>
          <LeftArrowIcon />
        </TouchableOpacity>

        {/* Text input */}
        <TextInput
          style={styles.input}
          placeholder={'Search dishes for your party...'}
          value={searchText}
          onChangeText={onSearchChange}
          placeholderTextColor="#999"
        />

        {/* Search icon */}
        <View style={styles.iconRight}>
          <SearchIcon />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 16,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
  },
  iconLeft: {
    marginLeft: 8,

  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 16,
  },
  iconRight: {
    marginRight: 8,
    padding: 8,
  
  },
});

export default SearchBar;
