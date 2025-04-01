import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    input:{
        flex: 4.5,
        width: 60,
        height:56,
        backgroundColor: "#262626",
        borderRadius: 5,
        color: '#FFF',
        padding: 16,
        fontSize: 16,
        marginRight: 12,
    },
    title:{
        fontFamily: 'Roboto',
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        
    },
    iconFoguete:{
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        resizeMode: 'contain',
        height: 40,
    },
    container:{
        flex: 1,
        width: '100%',
        height: '20%',
        backgroundColor: '#0D0D0D',
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: 30
    },
    button:{
        flex: 1,
        width:40,
        height:56,
        borderRadius: 5,
        backgroundColor: '#1E6F9F',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconAdicionar:{
        tintColor: '#FFF'
    },
    form:{
        width: '100%',
        flexDirection: 'row',
        marginTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
    },
    containerContadores:{
        backgroundColor: '#1A1A1A',
        width: '100%',
        paddingTop: 30,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        
    },
    textContadores:{
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 'bold',
        flexDirection: 'row',
        textAlignVertical: 'center'
    },
    contadores:{
        color: '#FFF',
        backgroundColor: '#262626',
        borderRadius: 10,
        textAlign: 'center',
        width: 30,
        height: 20,
        fontSize: 12,
        padding: 0,
        marginLeft: 5,
        fontWeight: 'bold'
    },
    listEmptyText:{
        color: '#808080',
        textAlign: 'center'
    },
    containerList:{
        backgroundColor: '#1A1A1A',
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        
    },
    iconLista:{
        tintColor: '#808080',
        marginLeft: 150
    },
    
})