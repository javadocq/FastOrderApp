import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        flex : 1,
        color : 'black',
        alignItems : 'center',
        backgroundColor : '#FFF',
    },
    padding: {
        width: '100%',
        height: 10,
        marginBottom : '2%',
        backgroundColor : 'rgba(218, 218, 218, 0.25)'
    },
    signWrap : {
        width : '100%',
        height : '100%',
        alignItems : 'center',
    },
    authBox : {
        flexDirection : 'row',
        height : '7%',
    },  
    lableText : {
        width : '88%',
        color : '#484747',
        fontSize : 14,
        fontWeight : '400',
        fontStyle : 'normal',
        marginTop : '3%',
        marginLeft : '4%',
    },
    input : {
        borderWidth : 1,
        borderColor : '#FFF',
        backgroundColor : '#F4F4F4',
        borderRadius : 5,
        width : 350,
        height : 50,
        marginTop : '2%',
        paddingLeft : '3%',
        
    },
    inputButton : {
        borderWidth : 1,
        borderColor : '#FFF',
        backgroundColor : '#F4F4F4',
        borderRadius : 5,
        width : 260,
        height : 50,
        marginTop : '2%',
        paddingLeft : '3%'
    },
    inputName : {
        borderWidth : 1,
        borderColor : '#FFF',
        backgroundColor : '#F4F4F4',
        borderRadius : 5,
        width : 350,
        height : 50,
        marginTop : '2%',
        paddingLeft : '3%',
    },
    buttonBox : {
        height : 50,
        width : '22%',
        borderRadius : 5,
        backgroundColor : '#1B1B1B',
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : '2%',
        marginTop : '2%'
    },
    buttonText : {
        color : '#FFF',
        fontSize : 12,
        fontWeight : '400',
        fontStyle : 'normal',
    },
    bottomButtonBox : {
        width: '100%',
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
    }

});

export default styles;