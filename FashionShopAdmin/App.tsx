import { View, Text } from 'react-native'
import React from 'react'
import MyNavigationContainer from './src/router/navigationContainer'
import { AuthProvider } from './src/context/AuthProvider'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <MyNavigationContainer/>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}

export default App;