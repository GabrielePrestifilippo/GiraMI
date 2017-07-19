import React from "react";
import {
    AppState,
    AsyncStorage,
    View,
    StyleSheet,

} from "react-native";

var PushNotification = require('react-native-push-notification');
import {Actions} from "react-native-router-flux";

import HomeButton from "../components/HomeButton";
import I18n from "../components/Languages";

import {points, getDistance} from "../components/Helper"


PushNotification.configure({
    onNotification: function (notification) {
        if (notification.message == "Start Quest") {
            PushNotification.cancelAllLocalNotifications();
        }
    },
    popInitialNotification: true,
    requestPermissions: true,
});

class Loading extends React.Component {

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
                this.positionChange(position);
            }, (error) => console.log(JSON.stringify(error)),
            {enableHighAccuracy: false, distanceFilter: 1, timeout: 1000});


    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }


    componentWillMount() {

        var self = this;

        this.state = {
            history: {},
            notifications: {}
        };
        if (this.props && this.props.state) {
            Object.assign(this.state, this.props.state)
        } else {
            this.getHistory();
        }


    };

    getHistory = async () => {
        var self=this;
        await AsyncStorage.getItem('history', (err, value) => {
            if (value !== null) {
                var history = JSON.parse(value);
                this.setState({history: history});
                this.setState({loadingHome: false});
            } else {
                var history = {};
                this.setState({history: history});
                this.setState({loadingHome: false});
            }

            Actions.Game({state: self.state});

        });
    }


    notify() {
        PushNotification.localNotification({
            autoCancel: true, // (optional) default: true
            largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
            smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
            color: "red", // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: 'some_tag', // (optional) add tag to message
            group: "group", // (optional) add group to message
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            title: 'GiraMi', // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
            message: I18n.t('newQuest'), // (required)
            playSound: false, // (optional) default: true
            soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)

        });
    };

    positionChange = (position) => {
        var point = undefined;
        var self = this;

        if (!this.state.position) {
            var initialPosition = JSON.stringify(position);
            this.setState({position: initialPosition});
            this.props.updateState(this.state);
        }

        var lastPosition = position.coords;
        points.some(function (p, index) { //check if we are close to a point and return it
            if (self.state && self.state.history && self.state.history[index + 1] == undefined) {
                var d = getDistance(p.lat, p.lon, lastPosition.latitude, lastPosition.longitude);
                if (d < 100) {//limit distance
                    if (!self.state.notifications[index] && AppState.currentState !== "active") {
                        PushNotification.cancelAllLocalNotifications();
                        self.notify();
                    }
                    self.setState({notifications: {[index]: true}});
                    point = p;
                    self.setState({myPoint: p});
                    return;
                } else {
                    self.setState({questAvailable: false});
                }
                this.props.updateState(this.state);
            }
        });
    };


    constructor(props) {
        super(props);
        this.state = {
            loadingHome: true
        };
    }

    onPress = (page) => {
        //navigation.navigate(page, {state: this.state});
    };

    render() {

        return (
            <View><View style={styles.buttons}>
                <HomeButton text="City" onPress={this.onPress.bind(this, "City")}/>
                <HomeButton text="Places" onPress={this.onPress.bind(this, "Places")}/>
                <HomeButton text="Info" onPress={this.onPress.bind(this, "Information")}/>

            </View></View>
        );
    }


}

const
    styles = StyleSheet.create({
        mainView: {
            flex: 1,
            alignSelf: 'center',
            alignContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
        },
        textContainer: {
            flex: 0.8,
            justifyContent: 'center',
            alignItems: 'center'
        },

        mainText: {
            color: '#254117',
            fontSize: 46,
            textAlign: 'center',
            fontFamily: 'Campanile',

        },
        placeImage: {
            alignSelf: 'center',
            alignContent: 'center',
            resizeMode: "contain",
            flex: 1,
        },
        buttons: {
            alignSelf: 'center',
            alignContent: 'center',
            flex: 1,
        },
        footer: {
            height: '6%',
            resizeMode: "contain",
            marginBottom: 10,
            marginTop: 20,
            bottom: 10,
            alignSelf: 'center',
            alignContent: 'center',
            position: 'relative',
        },

        container: {
            flex: 1,
            flexDirection: 'column',
            width: '100%',
        },


    });
module.exports = Loading;