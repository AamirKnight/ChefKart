import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  FlatList 
} from 'react-native';

const IngredientScreen = ({ route }) => {
  const { dish } = route.params;

  const renderIngredient = ({ item, index }) => (
    <View style={styles.ingredientItem}>
      <Text style={styles.ingredientName}>{item.name}</Text>
      <Text style={styles.ingredientQuantity}>{item.quantity}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Dish Header */}
        <View style={styles.header}>
          <Image 
            source={{ uri: dish.category.image || 'https://via.placeholder.com/300' }} 
            style={styles.dishImage}
          />
          <View style={styles.dishInfo}>
            <Text style={styles.dishName}>{dish.name}</Text>
            <View style={styles.typeContainer}>
              <Text style={styles.typeIndicator}>
                {dish.type === 'VEG' ? '🟢' : '🔴'}
              </Text>
              <Text style={styles.typeText}>{dish.type}</Text>
            </View>
            <Text style={styles.description}>{dish.description}</Text>
          </View>
        </View>

        {/* Ingredients Section */}
        <View style={styles.ingredientsSection}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <FlatList
            data={dish.ingredients}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderIngredient}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dishImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  dishInfo: {
    marginTop: 16,
  },
  dishName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  typeIndicator: {
    fontSize: 16,
    marginRight: 8,
  },
  typeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  ingredientsSection: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  ingredientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  ingredientName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  ingredientQuantity: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});

export default IngredientScreen;