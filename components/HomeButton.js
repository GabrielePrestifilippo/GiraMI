import React from "react";
import {Text, View, TouchableHighlight, Image, StyleSheet} from "react-native";


export default class HomeButton extends React.Component {

    constructor(props) {
        super(props);
        this.state=props.state;
    }

    render() {
        let myProps=this.props;
        var self=this;
        return (
            <TouchableHighlight underlayColor='#a7152a' style={styles.postContainer}
                                onPress={() => {
                                    if (myProps.onPress) {
                                        myProps.onPress();
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
        marginLeft: 20,
        marginRight: 20,
        marginTop: 15,
        height: 40,
        width: '50%',
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
        width: '95%',
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'sans-serif',
        fontWeight: '400'
    },
    placeImage: {
        width: '35%',
        height: 20,
        resizeMode: "contain"
    }

});