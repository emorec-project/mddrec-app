import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AppCard = (props) => {
  const navigation = useNavigation();

  const handleClick = (navigateTo) => {
    navigation.navigate(navigateTo);
  };

  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={() => handleClick(props.cardProps.navigationLink)}>
        <View style={styles.card}>
          <Image
            source={props.cardProps.imageUrl}
            style={styles.cardImage}
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{props.cardProps.title}</Text>
            <Text style={styles.cardParagraph}>{props.cardProps.paragraph}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
    root: {
    //   marginTop: 150,
      width: '100%',
      maxWidth: '85%',
      height: '75%',
    //   margin: 'auto',
    //   justifyContent: 'center',
      alignItems: 'center',
    //   textAlign: 'center',
    },
    card: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      overflow: 'hidden',
      width: 300, // Set a fixed width for the card
    },
    cardImage: {
      height: 250,
      width: '100%',
    },
    cardContent: {
      padding: 10,
      flexGrow: 1, // Allow the content to expand and determine the card's height
      justifyContent: 'center', // Vertically center the content
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    cardParagraph: {
      fontSize: 16,
      color: 'gray',
    },
  };
  

export default AppCard;
