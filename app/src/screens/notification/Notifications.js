import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';

import { renderTopNav } from "../../components/TopNav";
import { renderBottomNav } from "../../components/BottomNav";

const Notifications = () => {
  const notificationsData = [
    { _id: "1", status: "read", message: "Welcome to Alex Journals App" },
    { _id: "2", status: "read", message: "You successfully updated your profile" },
    { _id: "3", status: "unread", message: "You created a new journal" },
    { _id: "4", status: "unread", message: "You updated a journal" },
  ];

  const newNotifications = notificationsData.filter((notification) => notification.status === "unread");
  const recentNotifications = notificationsData.filter((notification) => notification.status === "read");

  return (
    <SafeAreaView style={styles.notificationContainer}>
      {renderTopNav()}  
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.notification}>
          <Text style={styles.header}>Notifications</Text>

          <Text style={styles.sectionLabel}>New</Text>
          {newNotifications.map((notification) => (
            <View key={notification._id} style={styles.notificationItem}>
              <Ionicons name="alert-circle" size={24} color="red" style={styles.icon} />
              <Text style={styles.notificationText}>{notification.message}</Text>
            </View>
          ))}

          <Text style={styles.sectionLabel}>Recent</Text>
          {recentNotifications.map((notification) => (
            <View key={notification._id} style={styles.notificationItem}>
              <Ionicons name="checkmark-circle" size={24} color="green" style={styles.icon} />
              <Text style={styles.notificationText}>{notification.message}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      {renderBottomNav()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    flexGrow: 1,
  },
  notification: {
    backgroundColor: "#ffffff",
    padding: 16,
  },
  header: {
    color: "#130138",
    fontFamily: "Roboto",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  sectionLabel: {
    color: "#130138",
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 12,
    marginTop: 16,
  },
  notificationItem: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  notificationText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default Notifications;
