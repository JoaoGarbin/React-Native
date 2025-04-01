import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    container:{
        flex: 1,
        width: '100%',
        backgroundColor: '#262626',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#333333'
    },
    name:{
        flex: 1,
        color: '#FFF',
        fontSize: 16,
        marginLeft: 16,
    },
    buttonImage:{
        tintColor: '#808080',
        resizeMode: 'contain',
        height: 25,
    },
    button:{
        width:56,
        height: 56,
        borderRadius: 5,
        backgroundColor: '#262626',
        alignItems: 'center',
        justifyContent: 'center'
    },
    listItem:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, 
    },
    marker:{
        width: 20,
        height: 20, 
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#4EA8DE',
        backgroundColor: '#262626',
        marginRight: 0,
        marginLeft: 20,
        marginTop: 10 
    },
    markedactive:{
        backgroundColor: '#5E60CE',
        borderColor: '#5E60CE',
    },
    markedContainer:{
        padding:0,
    },
    taskTextMarked:{
        textDecorationLine: 'line-through',
        color: '#808080'
    }
});