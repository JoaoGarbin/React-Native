import { Routes } from '@/routes';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        style='dark'
      />
      <Routes />
    </>
  );
}
