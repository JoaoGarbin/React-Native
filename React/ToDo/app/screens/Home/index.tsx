import { Text, TextInput, View, TouchableOpacity, FlatList, Image, Alert, } from "react-native";
import { styles } from "./styles";
import { Anotation } from "@/app/componets/Anotation";
import React,{ useState } from "react";


export default function Home(){
    const [tarefas, setTarefas] = useState<string[]>([]);
    const [tarefaName, setTarefaName] = useState("");
    const [marcadas, setMarcadas] = useState<string[]>([]);
    const [criadas, setCriadas] = useState(0);
    const [concluidas, setConcluidas] = useState(0);




    function handleMarkerToggle(name:string){
        setMarcadas(prevState =>{
            if(prevState.includes(name)){
                setConcluidas(prevCount => prevCount -1)
                return prevState.filter(item => item !== name)
            }else{
                setConcluidas(prevCount => prevCount + 1)
                return[...prevState, name]
            }
        }
        )
    }
    function handleTarefaAdd(){

        if(tarefas.includes(tarefaName)){
            return Alert.alert("Tarefa já Existente", "Já existe uma tarefa na lista com essa descrição")
        }
        
        setTarefas(prevState => [...prevState, tarefaName])
        setCriadas(prevCount => prevCount + 1)
        setTarefaName('');
    }

    function handleTarefaRemove(name: string){

        Alert.alert("Remover", `Remover Tarefa ?`,[
            {
                text: "Sim",
                onPress: () =>{
                     setTarefas(prevState => prevState.filter(tarefa => tarefa !== name ));
                    setCriadas(prevCount => prevCount - 1);

                    if(marcadas.includes(name)){
                        setMarcadas(prevState => prevState.filter(item => item !== name));
                        setConcluidas(prevCount => prevCount -1);
                    }
                }
            },
            {
                text: "Não",
                style: 'cancel'
            }
        ]);
    }
    return(
    <>
        <View style={styles.container}>
            <Text>
                <Image source={require('@/assets/images/icons8-foguete-50.png')} style={styles.iconFoguete}>
                </Image>
                <Text style={[{ color: '#4EA8DE'}, styles.title]}>to</Text>
                <Text style={[{ color: '#5E60CE' }, styles.title]}>do</Text>
            </Text>
        <View style={styles.form}>

        <TextInput
            style={styles.input}
            placeholder="Adicione uma nova tarefa"
            placeholderTextColor="#808080"
            onChangeText={setTarefaName}
            value={tarefaName}
        > 
         </TextInput>

        <TouchableOpacity style={styles.button} onPress={handleTarefaAdd}>
            <Image source={require('@/assets/images/icons8-adicionar-24.png')} style={styles.iconAdicionar}>
            </Image>
        </TouchableOpacity>


        </View>
        <View style={styles.containerContadores}>
            <Text style={[{ color: '#4EA8DE'},styles.textContadores]}>Criadas</Text>
            <TextInput style={styles.contadores}>{criadas}</TextInput> 
            <Text style={[{ marginLeft: 145, color: '#5E60CE'},styles.textContadores]}>Concluídas</Text>
            <TextInput style={styles.contadores}>{concluidas}</TextInput> 
        </View>
        <FlatList style={styles.containerList}
                data={tarefas}
                keyExtractor={item => item}
                renderItem={({item}) =>(
        <Anotation
            key={item}
            name={item}
            isMarked={marcadas.includes(item)}
            onToggleMark={() => handleMarkerToggle(item)}
            onRemove={() => handleTarefaRemove(item)}/>

        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
            <>
            <Image source={require('@/assets/images/icons8-lista-64.png')} style={styles.iconLista}>
            </Image>
            <Text style={[{fontWeight: 'bold', fontSize: 16},styles.listEmptyText]}>
              Ainda não tem tarefas cadastradas 
            </Text>
              <Text style={styles.listEmptyText}>
                adicione e organize seus itens a fazer
              </Text>
            </>
         )}
        /> 
        </View>
    </>
    );
}