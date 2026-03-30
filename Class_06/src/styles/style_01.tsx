import { StyleSheet } from 'react-native';

const style_01 = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 18,
        color: '#666',
        marginBottom: 5,
    },
    inputFiled: {
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 4,
        width: '100%',
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: 10,
        borderWidth: 0,
        borderRadius: 4,
        borderColor: '#4CAF50',
        justifyContent: 'center',
    },
    buttonHover: {
        backgroundColor: '#3e8e41',
    },
});

export default style_01;
