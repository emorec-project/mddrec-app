import React from 'react';
import {Text, StyleSheet, View, SectionList, SafeAreaView, FlatList } from 'react-native';
import AppCard from './AppCard';

const cardProps = [
  {
    title: 'הקלטת ריאיון',
    paragraph: 'כאן ניתן להקליט ריאיון עם מטופל חדש',
    imageUrl: require('../temp-images/huge-icon.png'),
    navigationLink: 'NewInterview',
  },
  {
    title: 'מסך תוצאות',
    paragraph: 'כאן ניתן לצפות בתוצאות האבחון',
    imageUrl: require('../temp-images/huge-icon.png'),
    navigationLink: 'ResultsPage',
  },
];


export default function CardsGrid() {
    // return (
    //   <FlatList
    //     data={cardProps}
    //     keyExtractor={(item, index) => index.toString()}
    //     renderItem={({ item, index }) => (
    //       <View key={index} style={styles.cardContainer}>
    //         <AppCard cardProps={item} />
    //       </View>
    //     )}
    //     contentContainerStyle={styles.container}
    //     ItemSeparatorComponent={() => (
    //       <View style={styles.separator} />
    //     )}
    //   />
    // );
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
                // renderItem={({ item }) => (
                // <View style={styles.cardContainer}>
                //     <AppCard cardProps={item} />
                // </View>
                // )}
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
    flex: 1,
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