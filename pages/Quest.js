import React from "react";
import {AsyncStorage, Text, View, Button, Image, StyleSheet, ScrollView, RefreshControl} from "react-native";
import AnswerButton from "../components/AnswerButton";
import I18n from "../components/Languages";

export default class Quest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            answered: false,
            point: props.point,
            correct: null,
            history: props.history
        }
    };

    componentWillMount(){
        this.state.image = this.state.point.image;
    }

    componentDidMount() {
        if (this.state.point.noQuest) {
            this.state.history[this.state.point.question] = true;

            this.setState({correct: true});
            this.saveHistory();
        }
    }

    submitAnswer = (id) => {
        this.setState({answered: true});
        if ((id == I18n.t('questions')[(this.state.point.question)]["c"]) ||
            I18n.t('questions')[(this.state.point.question)]["c"] == "*") {
            var history=this.state.history;
            history[this.state.point.question] = true;
            this.setState({history:history});
            this.setState({correct: true});
            this.saveHistory();
            this.props.onAnswer(true);
        } else {
            this.setState({correct: false});
            var history=this.state.history;
            history[this.state.point.question] = false;
            this.setState({history:history});
            this.saveHistory();
            this.props.onAnswer(false);
        }
    };


    saveHistory = async () => {
        await AsyncStorage.setItem('history', JSON.stringify(this.state.history));
    };

    renderAnswers() {
        var self = this;
        var answers = I18n.t('questions')[(this.state.point.question)]["a"].map(function (answer, index) {
            return (<AnswerButton
                key={index}
                text={answer}
                id={index + 1}
                onPress={self.submitAnswer.bind(self)}/>)
        });
        return (<View style={styles.buttons}>{answers}</View>);
    }

    correctOrWrong() {
        if (this.state.correct) {
            return I18n.t('correct') + " " + I18n.t('earned') + " " + 10 + " " + I18n.t('points');
        } else {
            return I18n.t('wrong');
        }
    }

    onCloseButton() {
        this.props.onCloseButton();
    }


    renderQuestion() {
        if (this.state.point.noQuest) {
            return ( <View style={{alignItems: 'center'}}>
                <View
                    style={styles.textContainer}>
                    <Text style={styles.text}>{I18n.t('questions')[this.state.point.question]["e"]} </Text>
                </View >
                <View style={styles.closeButton}>
                    <AnswerButton
                        text="Close"
                        id="close"
                        onPress={() => {
                            this.onCloseButton()
                        }}
                    />
                </View>
            </View>);

        } else if (!this.state.answered) {
            return ( <View>
                    <View
                        style={styles.textContainer}>
                        <Text style={styles.text}>{I18n.t('questions')[this.state.point.question]["q"]} </Text>
                    </View>
                    {this.renderAnswers()}
                </View>
            );
        } else {
            return (<View style={{alignItems: 'center'}}>
                <View
                    style={styles.correctOrWrong}>
                    <Text style={styles.textAnswer}>
                        {this.correctOrWrong()}
                    </Text>
                </View >
                <View
                    style={styles.textContainer}>
                    <Text style={styles.text}>{I18n.t('questions')[this.state.point.question]["e"]} </Text>
                </View >
                <View style={styles.closeButton}>
                    <AnswerButton
                        text="Close"
                        id="close"
                        onPress={() => {
                            this.onCloseButton()
                        }}
                    />
                </View>
            </View>)
        }
    }

    render() {
        return (
            <View style={styles.container}>


                <Image resizeMode='cover' source={this.state.image} style={styles.image}>
                </Image>
                <View style={styles.bottomPart}>
                    <ScrollView >
                        {this.renderQuestion()}

                    </ScrollView>
                </View>

            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
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
    closeButton: {
        alignItems: 'flex-end',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: .1,
        marginBottom: 10,
        width: '40%'
    },
    image: {
        width: '80%',
        borderWidth: 3,
        borderColor: '#c8162f',
        flex: 0.4,
    },
    textContainer: {
        marginTop: 5,
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 15,
        width: '100%',
    },
    text: {
        color: '#343434',
        textAlign: 'justify'
    },
    textAnswer: {
        color: '#343434',
        fontSize: 14,
        textAlign: 'center'
    },

    textHeader: {
        color: '#254117',
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
        marginLeft: -56,
    },
    buttons: {
        width: '80%',
        alignContent: 'center',
        padding: 20,
        alignSelf: 'center',
    },
    correctOrWrong: {
        marginTop: 5,
        backgroundColor: '#e5e5e5',
        padding: 5,
        width: '100%',
    }


});