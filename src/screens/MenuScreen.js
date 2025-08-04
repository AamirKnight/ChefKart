import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity,
  ScrollView 
} from 'react-native';
import { dishData, mealTypes } from '../data/mockData';
import SearchBar from '../components/SearchBar';
import TabButton from '../components/TabButton';
import DishCard from '../components/DishCard';

const MenuScreen = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('STARTER');
  const [searchText, setSearchText] = useState('');
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [vegFilter, setVegFilter] = useState(true);
  const [nonVegFilter, setNonVegFilter] = useState(true);

  // Filter dishes based on current tab, search, and veg/non-veg filters
  const filteredDishes = useMemo(() => {
    return dishData.filter(dish => {
      const matchesTab = dish.mealType === selectedTab;
      const matchesSearch = dish.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesVegFilter = 
        (vegFilter && dish.type === 'VEG') || 
        (nonVegFilter && dish.type === 'NON_VEG');
      
      return matchesTab && matchesSearch && matchesVegFilter;
    });
  }, [selectedTab, searchText, vegFilter, nonVegFilter]);

  // Count selected dishes by category
  const getSelectedCount = (mealType) => {
    return selectedDishes.filter(dishId => {
      const dish = dishesData.find(d => d.id === dishId);
      return dish && dish.mealType === mealType;
    }).length;
  };

  const totalSelectedCount = selectedDishes.length;

  const handleAddRemove = (dishId) => {
    setSelectedDishes(prev => 
      prev.includes(dishId) 
        ? prev.filter(id => id !== dishId)
        : [...prev, dishId]
    );
  };

  const handleIngredientPress = (dish) => {
    navigation.navigate('Ingredient', { dish });
  };

  const renderDish = ({ item }) => (
    <DishCard
      dish={item}
      isSelected={selectedDishes.includes(item.id)}
      onAddRemove={handleAddRemove}
      onIngredientPress={handleIngredientPress}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        placeholder="Search dishes..."
      />

      {/* Veg/Non-Veg Filters */}
      <View style={styles.filterContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, vegFilter && styles.activeFilter]}
          onPress={() => setVegFilter(!vegFilter)}
        >
          <Text style={[styles.filterText, vegFilter && styles.activeFilterText]}>
            🟢 Veg
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterButton, nonVegFilter && styles.activeFilter]}
          onPress={() => setNonVegFilter(!nonVegFilter)}
        >
          <Text style={[styles.filterText, nonVegFilter && styles.activeFilterText]}>
            🔴 Non-Veg
          </Text>
        </TouchableOpacity>
      </View>

      {/* Meal Type Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
      >
        {mealTypes.map((mealType) => (
          <TabButton
            key={mealType}
            title={mealType}
            isActive={selectedTab === mealType}
            count={getSelectedCount(mealType)}
            onPress={() => setSelectedTab(mealType)}
          />
        ))}
      </ScrollView>

      {/* Dishes List */}
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDish}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      {/* Bottom Summary */}
      {totalSelectedCount > 0 && (
        <View style={styles.bottomContainer}>
          <Text style={styles.totalCount}>
            Total Selected: {totalSelectedCount} dishes
          </Text>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    backgroundColor: '#fff',
  },
  activeFilter: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#fff',
  },
  tabContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 100,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  continueButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MenuScreen;