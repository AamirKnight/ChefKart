import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dishData, mealTypes } from '../data/mockData';
import SearchBar from '../components/SearchBar';
import TabButton from '../components/TabButton';
import DishCard from '../components/DishCard';
import VegIcon from '../../assets/veg';
import NonVegIcon from '../../assets/nonveg';
import IconSwitch from '../components/IconSwitch'; 
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
        (nonVegFilter && dish.type === 'NON-VEG');
      
      return matchesTab && matchesSearch && matchesVegFilter;
    });
  }, [selectedTab, searchText, vegFilter, nonVegFilter]);

  // Count selected dishes by category
  const getSelectedCount = (mealType) => {
    return selectedDishes.filter(dishId => {
      const dish = dishData.find(d => d.id === dishId);
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
      
      <SearchBar
        searchText={searchText}
        onSearchChange={setSearchText}
        placeholder="Search dish"
      />
       {/* Meal Type Tabs */}
    <View style={[styles.tabContainer, { flexDirection: 'row' }]}>
  {mealTypes.map((mealType) => (
    <TabButton
      key={mealType}
      title={mealType}
      isActive={selectedTab === mealType}
      count={getSelectedCount(mealType)}
      onPress={() => setSelectedTab(mealType)}
    />
  ))}
</View>
     
<View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
  }}
>
  <Text style={{ fontSize: 16, fontWeight: '600', color: '#333' }}>
    {selectedTab} Selected ({getSelectedCount(selectedTab)})
  </Text>

  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <IconSwitch
      value={vegFilter}
      onToggle={setVegFilter}
      icon={<VegIcon size={18} />}
      activeColor="#539A64"
    />
    <View style={{ width: 12 }} />
    <IconSwitch
      value={nonVegFilter}
      onToggle={setNonVegFilter}
      icon={<NonVegIcon size={18} />}
      activeColor="#FF941A"
    />
  </View>
</View>


     

   
      <FlatList
        data={filteredDishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderDish}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

    
    {totalSelectedCount > 0 && (
  <View style={styles.bottomContainer}>
    
    {/* Top Half - Text with background color */}
    <View style={styles.topHalf}>
      <Text style={styles.totalCount}>
        Total Dish Selected{' '}
        <Text style={{fontWeight: '700'}}>{totalSelectedCount}</Text>
      </Text>
    </View>

    {/* Bottom Half - Button */}
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
    backgroundColor: '#fff',
    marginTop: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    
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
    backgroundColor: '#FF941A',
    borderColor: '#FF941A',
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
  marginTop:8
  },
  listContainer: {
    paddingBottom: 100,
  },
 bottomContainer: {
  position: 'absolute',
  bottom: 43,
  left: 0,
  right: 0,
  backgroundColor: '#fff',
  padding: 16,
  borderTopWidth: 1,
  borderTopColor: '#eee',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start', 
  
},
totalCount: {
  fontSize: 16,
  fontWeight: '500',
  color: '#333',
  alignSelf: 'flex-start', // Ensures text stays on the left
  marginBottom: 12, // Add some spacing between text and button
},
continueButton: {
  backgroundColor: '#000', // Changed from '#FF941A' to black
  borderRadius: 8,
  paddingHorizontal: 24,
  paddingVertical: 12,
  width: '100%', // Makes button take full width
  alignItems: 'center', // Centers the text inside the button
},
continueText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},
  summaryRow: {
  marginTop: 8,
  marginHorizontal: 16,
  marginBottom: 12,
},
summaryText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#333',
},
topHalf: {
  backgroundColor: '#fffaf4',
  width:'100%'
},

});

export default MenuScreen;