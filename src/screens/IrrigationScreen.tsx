import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useIrrigation } from '../context/IrrigationContext';
import { GroupAccordion } from '../components/GroupAccordion';
import { ActivityIndicator, MD2Colors, Text } from 'react-native-paper';

export const IrrigationScreen: React.FC = () => {
  const { groups, isLoading } = useIrrigation();

  if (isLoading) {
    return (
      <ActivityIndicator 
        animating={true} 
        color={MD2Colors.blue500} 
        size="large" 
        style={styles.loader}
      />
    );
  }

  return (
    <ScrollView style={styles.container}>
      {groups.length === 0 ? (
        <Text variant="bodyLarge" style={styles.noDataText}>
          No hay grupos de riego disponibles
        </Text>
      ) : (
        groups.map(group => (
          <GroupAccordion key={group.name} group={group} />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
  },
});