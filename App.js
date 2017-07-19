import React from "react";
import {AppRegistry, Text, View, Button, ToastAndroid} from "react-native";
import {StackNavigator, TabNavigator} from "react-navigation";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Information from "./pages/Information";
import Places from "./pages/Places";
import Quest from "./pages/Quest";
import InfoPlace from "./pages/InfoPlace";
import I18n from "./components/Languages";


const GiraMi = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    City: {
        screen: Game,
        navigationOptions: {
            header: null
        }
    },
    Information: {
        screen: Information,
        navigationOptions: {
            header: null
        }
    },
    Places: {
        screen: Places,
        navigationOptions: {
            header: null
        }
    },
    Quest: {
        screen: Quest,
        navigationOptions: {
            header: null
        }
    },
    InfoPlace: {
        screen: InfoPlace,
        navigationOptions: {
            header: null
        }
    }
}, {
    tabBarPosition: "bottom"
});
const defaultGetStateForAction = GiraMi.router.getStateForAction;

GiraMi.router.getStateForAction = (action, state) => {
    var self = this;
    if (state && action.type === 'Navigation/BACK') {
        const routes = state.routes;
        if (this.alreadyPressed) {
            return null;
        } else if (state.routes[state.routes.length - 1].routeName == "Home") {
            this.alreadyPressed = true;
            ToastAndroid.showWithGravity(I18n.t('closeApp'), ToastAndroid.SHORT, ToastAndroid.CENTER);
            setTimeout(() => {
                this.alreadyPressed = false;
            }, 3000)

        }
        return {
            state,
            routes,
            index: state.index,
        };
    }
    return defaultGetStateForAction(action, state);
};


console.ignoredYellowBox = ['Warning: View.propTypes'];
AppRegistry.registerComponent('GiraMi', () => GiraMi);