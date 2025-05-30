import { Alert, FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';
import { FilterStatus } from '@/types/FilterStatus';

import { Item } from '@/components/Item';
import { Input } from '@/components/input';
import { Filter } from '@/components/Filter';
import { Button } from '@/components/Button';
import { useState } from 'react';
import { FilterIcon } from 'lucide-react-native';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export function Home() {

  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("")
  const [items, setItems] = useState<any>([])

  function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição para Adicionar")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    }

    setItems(prevState => [...prevState, newItem])
  }

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />

      <View style={styles.form}>
        <Input placeholder="O que você precisa comprar?" onChangeText={setDescription} />
        <Button title="Adicionar" onPress={handleAdd} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {
            FILTER_STATUS.map((status) => (
              <Filter
                key={status}
                status={status}
                isActive={status === filter}
                onPress={() => setFilter(status)}
              />
            ))
          }
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <Item
              data={item}
              onStatus={() => console.log("mudar o status")}
              onRemove={() => console.log("remove o item")}
            />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => (
            <Text style={styles.empty}>Nenhum item aqui.</Text>
          )}
        />

      </View>
    </View>
  );
}