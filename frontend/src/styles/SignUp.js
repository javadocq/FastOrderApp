import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container : {
        flex : 1,
        color : 'black',
        alignItems : 'center',
        backgroundColor : '#FFF'
    },
    titleText : {
        color : '#484747',
        fontSize : 18,
        fontStyle : 'normal',
        fontWeight : '600',
        marginBottom : '5%',
        marginTop : '5%'
    },
    padding: {
        width: '100%',
        height: 10,
        backgroundColor : 'rgba(218, 218, 218, 0.25)'
    },
    signWrap : {
        width : '100%',
        height : '100%',
        marginTop : '10%',
        marginLeft : '12.5%'
    },
    wrapper : {
        flexDirection : 'row'
    },  
    lableText : {
        color : '#484747',
        fontSize : 14,
        fontWeight : '400',
        fontStyle : 'normal',
        marginTop : '3%'
    },
    input : {
        borderWidth : 1,
        borderColor : '#D9D9D9',
        backgroundColor : 'rgba(217,217,217,0.00)',
        borderRadius : 5,
        width : '88%',
        height : 43,
        marginTop : '2%',
        paddingLeft : '3%'
    },
    inputButton : {
        borderWidth : 1,
        borderColor : '#D9D9D9',
        backgroundColor : 'rgba(217,217,217,0.00)',
        borderRadius : 5,
        width : '64%',
        height : 43,
        marginTop : '2%',
        paddingLeft : '3%'
    },
    buttonBox : {
        height : 'auto',
        width : '22%',
        borderRadius : 5,
        backgroundColor : '#D9D9D9',
        justifyContent : 'center',
        alignItems : 'center',
        marginLeft : '2%',
        marginTop : '2%'
    },
    buttonText : {
        color : '#484747',
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