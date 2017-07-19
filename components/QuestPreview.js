import React from "react";
import {Text, View, TouchableHighlight, Image, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/EvilIcons';


export default class QuestPreview extends React.Component {

    constructor(props) {
        super(props);
        this.state = props.state;
    }

    getIcon() {
        if (this.props.completed == 'true') {
            return <Icon style={[styles.completedIcon,{color: '#35b938'}]} name='unlock'/>
        } else {
            return <Icon style={[styles.completedIcon,{color: '#b92228'}]} name='lock'/>
        }
    }

    getColor() {
        if (this.props.completed == 'true') {
            return '#e2e8b6'
        } else {
            return '#d7d9d9'
        }
    }

    render() {
        let myProps = this.props;
        return (
            <TouchableHighlight underlayColor={this.getColor()} style={styles.postContainer}
                                onPress={() => {
                                        myProps.onPress();
                                }}>
                <View style={styles.elements}>
                    <Image resizeMode='cover' source={this.props.image} style={styles.frame}/>
                    <Text style={styles.title}>{this.props.name}</Text>
                    {this.getIcon()}

                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    postContainer: {
        height: 80,
        borderColor: "#aaaaaa",
        borderBottomWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    elements: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    frame: {
        height: 60,
        margin: 10,
        flex: 0.30,
    },
    title: {
        flex: 0.55,
        fontSize: 18,
        fontFamily: 'sans-serif',
        padding: 10,
        textAlign: 'center',
        color: '#131313'
    },
    completedIcon: {
        flex: 0.15,
        alignSelf: 'center',
        fontSize: 30,
        textAlign: 'left',
    }
});