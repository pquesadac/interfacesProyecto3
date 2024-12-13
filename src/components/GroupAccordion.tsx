import React, { useState } from 'react';
import { List, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { GroupInterface } from '../interfaces/GroupInterface';
import { ValveCard } from './ValveCard';
import { useIrrigation } from '../context/IrrigationContext';

interface GroupAccordionProps {
  group: GroupInterface;
}

export const GroupAccordion: React.FC<GroupAccordionProps> = ({ group }) => {
  const [expanded, setExpanded] = useState(false);
  const { updateValveState } = useIrrigation();

  const handleToggleValve = (valveName: string) => {
    updateValveState(group.name, valveName);
  };

  return (
    <List.Accordion
      title={group.name}
      left={props => <List.Icon {...props} icon="water" />}
      expanded={expanded}
      onPress={() => setExpanded(!expanded)}
    >
      <View style={styles.accordionContent}>
        {group.values.map((valve) => (
          <ValveCard
            key={valve.name}
            valve={valve}
            onToggle={() => handleToggleValve(valve.name)}
          />
        ))}
        <Text variant="bodySmall" style={styles.lastUpdateText}>
          Última actualización: {group.lastDate || 'Sin datos'}
        </Text>
      </View>
    </List.Accordion>
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