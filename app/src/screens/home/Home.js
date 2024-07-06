import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView, TextInput, Modal, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import { renderTopNav } from '../../components/TopNav';
import { renderBottomNav } from '../../components/BottomNav';
import { backendUrl } from '../../../config/config';

const Home = () => {
  const [journals, setJournals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntry, setSelectedEntry] = useState(null);

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/journals`);
      setJournals(response.data);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchEntries();
    }, [])
  );

  const filteredEntries = journals.filter(entry =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderTopNav()}
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search-circle-sharp" size={24} color="black" />
          <TextInput
            style={styles.searchBarText}
            placeholder="Search Journal Entries"
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>

        {/* Display Journal Entries */}
        <ScrollView>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Top Journal Entries</Text>
            {filteredEntries.map((entry) => (
              <TouchableOpacity key={entry.id} style={styles.card} onPress={() => setSelectedEntry(entry)}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{entry.title}</Text>
                  <Text style={styles.cardCategory}>{entry.category}</Text>
                  <Text style={styles.cardDate}>{new Date(entry.date).toLocaleDateString()}</Text>
                  <Text numberOfLines={3}>{entry.content}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      {renderBottomNav()}

      {selectedEntry && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectedEntry !== null}
          onRequestClose={() => setSelectedEntry(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedEntry(null)}>
                <Ionicons name="close-circle" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{selectedEntry.title}</Text>
              <Text style={styles.modalCategory}>{selectedEntry.category}</Text>
              <Text style={styles.modalDate}>{new Date(selectedEntry.date).toLocaleDateString()}</Text>
              <ScrollView>
                <Text style={styles.modalText}>{selectedEntry.content}</Text>
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  searchBar: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    width: '80%',
    height: 45,
    alignSelf: 'center',
  },
  searchBarText: {
    color: '#11273F',
    marginLeft: 10,
    flex: 1,
  },
  sectionContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#12D18E',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardCategory: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalCategory: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 10,
  },
  modalDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Home;
