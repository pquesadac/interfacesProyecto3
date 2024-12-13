import React from 'react';
import { Card, Switch, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { ValveInterface } from '../interfaces/ValveInterface';

interface ValveCardProps {
  valve: ValveInterface;
  onToggle: () => void;
}

export const ValveCard: React.FC<ValveCardProps> = ({ valve, onToggle }) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text variant="titleMedium">{valve.name}</Text>
          {valve.description && (
            <Text variant="bodySmall" style={styles.description}>
              {valve.description}
            </Text>
          )}
        </View>
        <Switch 
          value={valve.state}
          onValueChange={onToggle}
          color="#4CAF50"
        />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
    card: {
      marginVertical: 4,
      marginHorizontal: 8,
    },
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textContainer: {
      flex: 1,
      marginRight: 10,
    },
    description: {
      color: 'grey',
    },
    accordionContent: {
      paddingVertical: 8,
    },
    lastUpdateText: {
      textAlign: 'right',
      marginTop: 8,
      marginRight: 16,
      color: 'grey',
    },
  });