import { createStackNavigator } from '@react-navigation/stack';
import CardsGrid from './CardsGrid';
import Results from './Results';
import Upload from './Upload';


const Stack = createStackNavigator();

export default function HomePage() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CardsGrid">
        <Stack.Screen name="CardsGrid" component={CardsGrid} options={{ headerTitle:"Home" }} />
        <Stack.Screen name="ResultsPage" component={Results} />
        <Stack.Screen name="NewInterview" component={Upload} />
      </Stack.Navigator>
    </NavigationContainer>
    
    
  );
}