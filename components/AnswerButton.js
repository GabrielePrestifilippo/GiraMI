import React from "react";
import {Text, View, TouchableHighlight, Image, StyleSheet} from "react-native";


export default class AnswerButton extends React.Component {

    constructor(props) {
        super(props);
        this.state=props.state;
    }

    render() {
        let myProps=this.props;
        return (
            <TouchableHighlight underlayColor="#a7152a" style={styles.postContainer}
                                onPress={() => {
                                    if (myProps.onPress && myProps.id) {
                                        myProps.onPress(myProps.id);
                                    }
                                }}>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>{this.props.text}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    postContainer: {
        marginTop: 5,
        height: 40,
        width: '100%',
        backgroundColor: '#dd1834',
        borderRadius: 1,
        elevation: 4
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        width: '100%',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
        fontFamily: 'sans-serif',
        fontWeight: '400'
    },


});