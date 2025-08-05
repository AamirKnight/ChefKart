import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
  Pressable
} from 'react-native';
import VegIcon from '../../assets/veg';
import NonVegIcon from '../../assets/nonveg';

const { width, height } = Dimensions.get('window');

const DishCard = ({ dish, isSelected, onAddRemove, onIngredientPress }) => {
  const [showModal, setShowModal] = useState(false);

  const getTwoLineDescription = (text) => {
    const words = text.split(' ');
    const twoLineLimit = 5;
    if (words.length <= twoLineLimit) return text;
    return words.slice(0, twoLineLimit).join(' ') + '...';
  };

  const DishDetailModal = () => (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowModal(false)}
    >
      <Pressable style={styles.modalOverlay} onPress={() => setShowModal(false)}>
        <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.modalHeader}>
              <View style={styles.modalHandle} />
            </View>

            <Image
              source={{ uri: dish.category.image || 'https://via.placeholder.com/300x200' }}
              style={styles.modalImage}
              resizeMode="cover"
            />

            <View style={styles.modalDetailsContainer}>
              <View style={styles.modalTitleRow}>
                <Text style={styles.modalDishName}>{dish.name}  {dish.type === 'VEG' ? <VegIcon size={20} /> : <NonVegIcon size={20} />}</Text>
                <View style={{marginTop: 30,marginRight: 40}}>
 <TouchableOpacity
                style={[
                  styles.addButton,
                  isSelected && styles.selectedButton
                ]}
                onPress={() => onAddRemove(dish.id)}
              >
                <Text
                  style={[
                    styles.addButtonText,
                    isSelected && styles.selectedButtonText
                  ]}
                >
                  {isSelected ? 'Remove' : 'Add +'}
                </Text>
              </TouchableOpacity>
                </View>
                
              </View>

            
  
              <Text style={styles.modalDescription}>{dish.description}</Text>
                   <TouchableOpacity
   style={styles.modalIngredientButton}
                onPress={() => {
                  setShowModal(false);
                  onIngredientPress(dish);
                }}
>
  <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft: -10 }}>
    <Image 
      source={require('../../assets/oil.png')} // adjust path as needed
      style={{ width: 16, height: 16, marginRight: 6 }} 
      resizeMode="contain"
    />
    <Text style={styles.ingredientText}>Ingredients</Text>
  </View>
</TouchableOpacity>
             
              
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );

  return (
    <>
      <View style={styles.card}>
        <View style={styles.container}>
          {/* Left Section */}
          <View style={styles.leftSection}>
            <View style={styles.nameRow}>
              <Text style={styles.dishName} numberOfLines={1}>{dish.name}  {dish.type === 'VEG' ? <VegIcon size={16} /> : <NonVegIcon size={16} />}</Text>
             
            </View>

            {/* Description + Read More in one block */}
            <Text style={styles.description} numberOfLines={2}>
              {getTwoLineDescription(dish.description)}{' '}
              <Text style={styles.readMoreText} onPress={() => setShowModal(true)}>Read More</Text>
            </Text>

          <TouchableOpacity
  style={styles.ingredientButton}
  onPress={() => onIngredientPress(dish)}
>
  <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft: -10 }}>
    <Image 
      source={require('../../assets/image.png')} // adjust path as needed
      style={{ width: 16, height: 16, marginRight: 6 }} 
      resizeMode="contain"
    />
    <Text style={styles.ingredientText}>Ingredients</Text>
  </View>
</TouchableOpacity>

          </View>

          {/* Right Section */}
          <View style={styles.rightSection}>
            <View style={{ position: 'relative' }}>
              <Image
                source={{ uri: dish.category.image }}
                style={styles.dishImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={[
                  styles.addButton,
                  isSelected && styles.selectedButton
                ]}
                onPress={() => onAddRemove(dish.id)}
              >
                <Text
                  style={[
                    styles.addButtonText,
                    isSelected && styles.selectedButtonText
                  ]}
                >
                  {isSelected ? 'Remove' : 'Add +'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
  <View
  style={{
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 30,
  }}
/>

      <DishDetailModal />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    
    marginHorizontal: 16,
    marginVertical: 6,
    
  },
  container: {
    flexDirection: 'row',
    padding: 5,
  },
  leftSection: {
    flex: 1,
    paddingRight: 16,
    justifyContent: 'space-between',
  
  },
  rightSection: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    marginTop:20
  },
  dishName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,

  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 6,
    width:'75%'
  },
  readMoreText: {
    fontWeight: '700',
    color: '#000',
  },
  ingredientButton: {
  
   
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  ingredientText: {
    color: '#FF941A',
    fontSize: 16,
    fontWeight: '500',
  },
  dishImage: {
    width: 120,
    height: 130,
   
  },
  addButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 5,
    position: 'absolute',
    bottom: -12,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2, 
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
    marginBottom: 12,
  },
  selectedButton: {
    backgroundColor: 'white',
    
  },
  addButtonText: {
    color: '#73AE78',
    fontSize: 14,
    fontWeight: '600',
  },
  selectedButtonText: {
    color: '#FF941A',
  },
  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.5,
    minHeight: height * 0.2,
  },
  modalHeader: {
    alignItems: 'center',
    paddingTop: 12,
    
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
  },
  modalImage: {
    width: '100%',
    height: 210,
    marginTop:10,
    
  },
  modalDetailsContainer: {
    paddingHorizontal: 20,
    marginBottom:20
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalDishName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  modalVegText: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF941A',
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 24,
  },
  modalIngredientButton: {
       borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  modalIngredientText: {
    fontSize: 14,
    color: '#FF941A',
    fontWeight: '600',
  },
  modalAddButton: {
    backgroundColor: '#FF941A',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalSelectedButton: {
    backgroundColor: '#FF941A',
  },
  modalAddButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalSelectedButtonText: {
    color: '#fff',
  },
});

export default DishCard;
