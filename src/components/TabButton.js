import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const TabButton = ({ title, isActive, onPress, count = 0 }) => {
  return (
    <TouchableOpacity
      style={[styles.tab, isActive && styles.activeTab]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.tabContent}>
        <Text 
          style={[styles.tabText, isActive && styles.activeTabText]}
          numberOfLines={1}
        >
          {title}
        </Text>
        
        <Text 
          style={[styles.countText, isActive && styles.activeCountText]}
          numberOfLines={1}
        >
          {count}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tab: {
    // Remove flex: 1 to allow dynamic width
    height: 35,
    marginHorizontal: 2,
    paddingHorizontal: 12, // Increased padding for better text spacing
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40, // Minimum width to prevent too small tabs
    maxWidth: 150, // Maximum width to prevent overly long tabs
  },
  activeTab: {
    backgroundColor: '#FF941A',
    borderColor: '#FF941A',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 1, // Allow content to shrink if needed
  },
  tabText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#333',
    flexShrink: 1, // Allow text to shrink if needed
  },
  activeTabText: {
    color: '#fff',
  },
  countText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#666',
    marginLeft: 4,
    flexShrink: 0, // Don't shrink the count
  },
  activeCountText: {
    color: '#fff',
  },
});

export default TabButton;