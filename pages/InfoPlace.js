import React from "react";
import {AsyncStorage, Text, View, Image, ScrollView, StyleSheet} from "react-native";
import I18n from "../components/Languages";

import Icon from 'react-native-vector-icons/EvilIcons';
import {points} from "../components/Helper";


export default class InfoPlace extends React.Component {
    constructor(props) {
        super(props);
        this.indexPoint = this.props.navigation.state.params.point;
    };


    componentWillMount() {
        this.state = {};
        Object.assign(this.state, this.props.navigation.state.params.state);
    }


    componentWillUnmount() {
    }

    componentDidMount() {
    }


    renderQuestion() {
        if (I18n.t('questions')[this.indexPoint + 1]["q"]) {
            return (<View
                style={styles.textContainerQuestion}>
                <Text style={styles.text}>{I18n.t('questions')[this.indexPoint + 1]["q"]} </Text>
            </View>)
        } else {
            return null;
        }
    }

    getImage() {

        return points[this.indexPoint].image;

    }

    render() {
        return (
            <View
                style={styles.container}>
                <View style={styles.header} navigation={this.state}>
                    <Icon style={styles.leftIcon} name={'chevron-left'}
                          onPress={ () => navigation.navigate('Places', {state: this.state})}/>
                    <Text style={styles.centerText}>GiraMi</Text>
                    <Text style={styles.rightIcon}/>
                </View>
                <View style={styles.place}>
                    <Image resizeMode='cover' source={this.getImage()} style={styles.frame}>
                    </Image>
                    <View style={styles.bottomPart}>
                        {this.renderQuestion()}
                        <ScrollView style={styles.textContainer}>
                            <Text style={styles.text}>{I18n.t('questions')[this.indexPoint + 1]["e"]} </Text>
                        </ScrollView>
                    </View>
                </View>
            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        marginTop: 0,
        padding: 0,
        flexDirection: 'column',
    },
    place: {
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        flex: 1,
    },
    bottomPart: {
        flex: 0.6,
        alignItems: 'center',
        top: 0,
        flexDirection: 'column',
    },
    frame: {
        maxWidth: '80%',
        borderWidth: 3,
        borderColor: '#c8162f',
        flex: 0.4
    },
    textContainerQuestion: {
        marginTop: 5,
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 5,
        width: '100%',
    },
    textContainer: {
        marginTop: 5,
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 5,
        width: '100%',
    },
    text: {
        color: '#343434',
        textAlign: 'justify',
        padding: 8
    },
    textHeader: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
        marginLeft: -56,
    },
    quest: {
        width: '100%',
        marginTop: 65,
        position: 'relative',
        borderTopWidth: 1,
        borderColor: "#aaaaaa",
    },
    header: {
        height: 48,
        width: '100%',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#dd1834',
        justifyContent: 'space-between',
        elevation:2
    },
    leftIcon: {
        fontSize: 38,
        color: '#fff',
        padding: 10,
        alignSelf: 'flex-start'
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
});
