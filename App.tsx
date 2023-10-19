import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';

//navigation
import Main from 'navigation/main';

const queryClient = new QueryClient();

export default function App() {
  return (
    <React.Fragment>
      <StatusBar />
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      </NavigationContainer>
    </React.Fragment>
  );
}
