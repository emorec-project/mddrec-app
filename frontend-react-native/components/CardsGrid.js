import React from 'react';
import {Text, StyleSheet, View, SectionList, SafeAreaView, FlatList } from 'react-native';
import AppCard from './AppCard';


export default function CardsGrid({ cardProps }) 
{
    const sections = [
        { title: 'Section 1', data: cardProps },
        // You can add more sections if needed
      ];

    return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <SectionList
                sections={sections}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <AppCard cardProps={item} />
                )}            
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.container}
            />
          </View>
        </SafeAreaView>
      
      );
  }
  
  const styles = StyleSheet.create({
    safeArea: {
        flex: 1
      },
    container: {
    // justifyContent: 'center',
    flexGrow: 1,
    marginVertical:10
    },
    cardContainer: {
      flexGrow: 1,
      marginVertical: 50, // Adjust vertical margin
    },
    separator: {
      height: 0, // Adjust the height of the separator (controls space between cards)
      backgroundColor: 'transparent', // Make sure the separator is not visible
    },
  });
