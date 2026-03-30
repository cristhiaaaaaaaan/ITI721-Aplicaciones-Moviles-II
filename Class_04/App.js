import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

/* custom modules */
import Home from './src/views/home';
import Details from './src/views/details';
import About from './src/views/about';

const Drawer = createDrawerNavigator();

function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name="Home" component={Home} />
                    <Drawer.Screen name="Details" component={Details} />
                    <Drawer.Screen name="About" component={About} />
                </Drawer.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}

export default App;
