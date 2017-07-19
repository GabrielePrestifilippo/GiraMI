import React from "react";
import {Text, View, ScrollView, StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/EvilIcons';
import QuestPreview from '../components/QuestPreview';
import {points} from "../components/Helper";
import {Actions} from 'react-native-router-flux';

export default class Info extends React.Component {


    constructor(props) {
        super(props);
    };

    shouldComponentUpdate() {
        return true;
    }

    componentWillUnmount() {
        this.state = {};
    }

    componentWillMount() {
        this.state = {};
        if (this.props && this.props.state)
            Object.assign(this.state, this.props.state);
    }


    onPress(index, completed) {
        if (completed == "true") {
            Actions.infoPlace({state: this.state, point: index});
        }
    }

    renderPlaces() {
        var self = this;
        var places = points.map(function (point, index) {
            var completed;
            var image = point.image;
            if (self.props.state.history) {
                if (self.state.history[index + 1] || self.state.history[index + 1] == false) {
                    completed = 'true';
                } else {
                    completed = 'false';
                }
            }

            return (<QuestPreview name={point.info}
                                  key={index}
                                  completed={completed}
                                  image={image}
                                  onPress={self.onPress.bind(self, index, completed)}/>)
        });
        return (<View>{places}</View>);
    }

    render() {
        const {params} = this.props;

        return (
            <View style={styles.container}>

                <ScrollView style={styles.quest}>
                    {this.renderPlaces()}
                </ScrollView>
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
        backgroundColor: '#fff'
    },
    quest: {
        width: '100%',
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
