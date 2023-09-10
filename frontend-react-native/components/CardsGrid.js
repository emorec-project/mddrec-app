import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
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
    return (
      <FlatList
        data={cardProps}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.cardContainer}>
            <AppCard cardProps={item} />
          </View>
        )}
        contentContainerStyle={styles.container}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      //justifyContent: 'center',
    },
    cardContainer: {
      marginVertical: 50, // Adjust vertical margin
    },
    separator: {
      height: 0, // Adjust the height of the separator (controls space between cards)
      backgroundColor: 'transparent', // Make sure the separator is not visible
    },
  });