import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0.5,
          borderTopColor: '#dbdbdb',
          backgroundColor: '#fff',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ tabBarIcon: () => <Text style={{ fontSize: 24 }}>🏠</Text> }}
      />
      <Tabs.Screen
        name="dms"
        options={{ tabBarIcon: () => <Text style={{ fontSize: 24 }}>✉️</Text> }}
      />
    </Tabs>
  );
}