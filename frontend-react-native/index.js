// import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { registerRootComponent } from "expo";


// if (Platform.OS === 'web') {
    // const rootTag = document.getElementById('root') || document.getElementById('X');
    // AppRegistry.runApplication('main', { rootTag });
    // console.log("dap");
    registerRootComponent(App);

// } else {
    // AppRegistry.registerComponent('main', () => App);
// }
