import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const DishCard = ({ dish, isSelected, onAddRemove, onIngredientPress }) => {
    console.log('DishCard rendered for:', dish.category.image);
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: dish.category.image || 'https://via.placeholder.com/80' }} 
        style={styles.image} 
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{dish.name}</Text>
          <View style={[styles.typeIndicator, 
            dish.type === 'VEG' ? styles.veg : styles.nonVeg]}>
            <Text style={styles.typeText}>
              {dish.type === 'VEG' ? '🟢' : '🔴'}
            </Text>
          </View>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {dish.description}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.ingredientButton}
            onPress={() => onIngredientPress(dish)}
          >
            <Text style={styles.ingredientText}>Ingredients</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.addButton, isSelected && styles.removeButton]}
            onPress={() => onAddRemove(dish.id)}
          >
            <Text style={[styles.addButtonText, isSelected && styles.removeButtonText]}>
              {isSelected ? 'Remove' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  typeIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  veg: {
    backgroundColor: '#E8F5E8',
  },
  nonVeg: {
    backgroundColor: '#FFE8E8',
  },
  typeText: {
    fontSize: 12,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ingredientButton: {
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  ingredientText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  removeButton: {
    backgroundColor: '#FF4444',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  removeButtonText: {
    color: '#fff',
  },
});

export default DishCard;