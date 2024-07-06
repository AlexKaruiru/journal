import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

import { renderTopNav } from '../../components/TopNav';
import { renderBottomNav } from '../../components/BottomNav';

const GuideScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderTopNav()}
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Guide</Text>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="home-outline" size={24} color="#12D18E" />
            <Text style={styles.sectionSubHeader}>Home</Text>
          </View>
          <Text style={styles.sectionText}>The Home screen displays all journals, allowing you to view them or search by title and category.</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="list-outline" size={24} color="#12D18E" />
            <Text style={styles.sectionSubHeader}>My Journals</Text>
          </View>
          <Text style={styles.sectionText}>The My Journals screen allows you to input new journals, view your journals, edit them, or delete them.</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AntDesign name="profile" size={24} color="#12D18E" />
            <Text style={styles.sectionSubHeader}>Account</Text>
          </View>
          <Text style={styles.sectionText}>The Account screen lets you see your profile, update it, and logout.</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="travel-explore" size={24} color="#12D18E" />
            <Text style={styles.sectionSubHeader}>Discover</Text>
          </View>
          <Text style={styles.sectionText}>The Discover screen showcases current features and upcoming features of the app.</Text>
        </View>
      </ScrollView>
      {renderBottomNav()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#12D18E',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
    width: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionSubHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#12D18E',
    marginLeft: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    paddingLeft: 32,
  },
});

export default GuideScreen;
