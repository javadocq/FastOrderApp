import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        position : 'relative',
    },
    wrap : {
        backgroundColor : '#EC424C',
        position : 'absolute',
        height : width * 0.04,
        width : width * 0.04,
        borderRadius : 20,
        justifyContent : 'center',
        alignItems : 'center',
        top : -6,
        right : 12
    },
    text : {
        color : '#FFF',
        fontSize : 8.381,
        fontStyle : 'normal',
        fontWeight : '600',
    }
});

export default styles;