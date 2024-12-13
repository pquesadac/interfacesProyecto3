import React, { createContext, useState, useContext, useEffect } from 'react';
import { GroupInterface } from '../interfaces/GroupInterface';
import { ApiService } from '../services/ApiService';

interface IrrigationContextType {
  groups: GroupInterface[];
  updateValveState: (groupName: string, valveName: string) => void;
  isLoading: boolean;
}

const IrrigationContext = createContext<IrrigationContextType | undefined>(undefined);

export const IrrigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [groups, setGroups] = useState<GroupInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiService = ApiService.getInstance();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const fetchedGroups = await apiService.fetchGroups();
        setGroups(fetchedGroups);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const updateValveState = async (groupName: string, valveName: string) => {
    const updatedGroups = groups.map(group => {
      if (group.name === groupName) {
        return {
          ...group,
          values: group.values.map(valve => 
            valve.name === valveName 
              ? { ...valve, state: !valve.state }
              : valve
          ),
          lastDate: new Date().toISOString()
        };
      }
      return group;
    });

    setGroups(updatedGroups);
    await apiService.updateGroups(updatedGroups);
  };

  return (
    <IrrigationContext.Provider value={{ groups, updateValveState, isLoading }}>
      {children}
    </IrrigationContext.Provider>
  );
};

export const useIrrigation = () => {
  const context = useContext(IrrigationContext);
  if (!context) {
    throw new Error('Error');
  }
  return context;
};