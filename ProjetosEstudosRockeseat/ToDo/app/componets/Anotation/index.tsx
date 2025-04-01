import { View, Text, TouchableOpacity, Image } from "react-native";

import { styles } from "./styles";

type Props = {
    name: string;
    isMarked: boolean;
    onToggleMark: () => void;
    onRemove: () => void;
}

export function Anotation( {name, onRemove, onToggleMark, isMarked}: Props ){
    return(
        <View style={styles.container}>

                <View style={styles.listItem}>
            <TouchableOpacity onPress={onToggleMark} style={styles.markedContainer}>
                <View style={[styles.marker, isMarked && styles.markedactive]}></View>
            </TouchableOpacity>
            
            </View>
            <Text style={[styles.name, isMarked && styles.taskTextMarked]}>
                {name}
            </Text>

        <TouchableOpacity 
                style={styles.button} onPress={onRemove}>
        <Image source={require('@/assets/images/icons8-lixeira-30.png')} style={styles.buttonImage}> 
        </Image>
        </TouchableOpacity>
        </View>
    )
}