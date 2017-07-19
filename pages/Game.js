import React, {Component} from "react";
import {View, Modal, Button, Text, StyleSheet, TouchableHighlight} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import Map from "./Map";
import Quest from "./Quest";

import Icon from 'react-native-vector-icons/EvilIcons';
import I18n from "../components/Languages";
export default class Game extends React.Component {

    navigation = this.props.navigation;

    componentWillMount() {
        this.state = {
            messagesReceivedFromWebView: null,
            message: "Null",
            myMessage: "not set yet",
            myPoint: {info: null},
            questAvailable: false,
            loadingGame: true,
            questStarted: false,
            iconLeft: 'chevron-left',
            surpriseQuest: false,
        };
        if (this.props && this.props.navigation && this.props.navigation.state
            && this.props.navigation.state.params && this.props.navigation.state.params.state)
            Object.assign(this.state, this.props.navigation.state.params.state);
    }

    componentDidMount() {

    }

    questAvailable = (point, hidden) => {
        if (point) {
            this.setState({questAvailable: point});
            if (hidden) {
                this.setState({surpriseQuest: true});
            }
        }
    };

    startQuest = (point) => {
        if (point) {
            this.setState({questStarted: point});
        }

    };


    hideLoading() {
        this.setState({loadingGame: false});
    }
    ;

    onAnswer(answer) {
        this.state.history[this.state.questStarted.question] = answer;
    }
    ;

    onCloseButton() {
        this.setState({questStarted: false});
    }
    ;

    onNavigate() {
        navigation.navigate('Places', {state: this.state});
    }
    ;

    renderQuestOrMap = () => {
        if (this.state.questStarted) {
            return (
                <Quest style={styles.quest}
                       point={this.state.questStarted}
                       history={this.state.history}
                       onAnswer={this.onAnswer.bind(this)}
                       onCloseButton={this.onCloseButton.bind(this)}
                />
            )
        }
    };

    renderModal = () => {
        return (
            <Modal style={styles.surprise}
                   onRequestClose={() => {
                       console.log("closed")
                   }}
                   animationType={"slide"}
                   transparent={true}
                   visible={this.state.surpriseQuest}

            >
                <TouchableHighlight style={styles.modal} onPress={() => {
                    this.setState({surpriseQuest: false});
                }}>
                    <View style={styles.surpriseInfo}>
                        <Text>{I18n.t('surprise')}</Text>
                    </View>
                </TouchableHighlight>
            </Modal>)
    };


    rightButton() {
        if (this.state.questStarted) {
            return <Icon style={styles.rightIcon} name={'close'} onPress={ () => this.setState({questStarted: false})}/>
        } else {
            return <Text style={styles.rightIcon}/>;
        }
    }
    ;

    displayMap() {
        if (this.state.questStarted == false) {
            return 'flex'
        } else {
            return 'none'
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <Spinner color="#dd1834" overlayColor="rgba(255, 255, 255, 1)" visible={this.state.loadingGame}
                         textContent={"Loading..."}
                         textStyle={{color: '#dd1834'}}/>

                <View style={styles.header} navigation={this.state}>
                    <Icon style={styles.leftIcon} name={'chevron-left'}
                          onPress={ () => navigation.navigate('Home', {state: this.state})}/>
                    <Text style={styles.centerText}>GiraMi</Text>
                    {this.rightButton()}
                </View>

                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                    <View style={[styles.mapContainer, {display: this.displayMap()}]}>
                        <Map onStartQuest={this.startQuest.bind(this)}
                             onLoaded={this.hideLoading.bind(this)}
                             onQuestAvailable={this.questAvailable.bind(this)}
                             onNavigate={this.onNavigate.bind(this)}
                             history={this.state.history}
                             display={this.state.displayMap}
                        />
                    </View>

                    {this.renderQuestOrMap()}
                    {this.renderModal()}

                </View>
            </View>
        )
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
    mapContainer: {
        flex: 1.25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    quest: {
        flex: 1.25,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        backgroundColor: 'transparent',
    },
    bottomStyle: {
        flex: 0.15,
        alignSelf: 'center'
    },
    startButton: {
        alignSelf: 'center'
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
    modal: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    surpriseInfo: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        alignSelf: 'center',
        padding: 50
    }
});
