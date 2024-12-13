import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { IrrigationProvider } from './src/context/IrrigationContext';
import { IrrigationScreen } from './src/screens/IrrigationScreen';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <IrrigationProvider>
          <IrrigationScreen />
        </IrrigationProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}