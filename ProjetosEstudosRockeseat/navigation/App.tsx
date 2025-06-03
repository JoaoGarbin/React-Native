import { Product } from '@/app/Product';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        style='dark'
      />
      <Product />
    </>
  );
}
