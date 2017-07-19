import React from "react";
import {Text, Linking, View, ScrollView, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/EvilIcons';
import I18n from "../components/Languages";


export default class Liberty extends React.Component {


    constructor(props) {
        super(props);
    };


    componentWillMount() {
        this.state = {};
        if (this.props && this.props.state)
            Object.assign(this.state, this.props.state);
    }

    componentWillUnmount() {
        this.state = {};
        if (this.props && this.props.state)
            Object.assign(this.state, this.props.state);
    }

    componentDidMount() {
    }


    render() {
        const {params} = this.props;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.textContainer}>
                    <Text style={styles.text}>{I18n.t('Information')} </Text>
                </ScrollView>
            </View>
        );
    }
    ;
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        marginTop: 0,
        padding: 0,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    header: {
        height: 48,
        width: '100%',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dd1834',
        justifyContent: 'space-between',
        elevation: 2
    },
    leftIcon: {
        fontSize: 38,
        color: '#fff',
        padding: 10,
        alignSelf: 'flex-start'
    },
    textContainer: {
        padding: 10
    },
    centerText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
    },
    rightIcon: {
        alignSelf: 'flex-end',
        padding: 10,
        textAlign: 'center',
        fontSize: 28,
        width: 50,
        color: '#254117',
    },
    text: {
        color: '#343434',
        textAlign: 'justify',
        padding: 8
    },

});
