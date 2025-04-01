import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { gluestackUIConfig } from "@gluestack-ui/config";

import { Home } from "@screens/Home";
import { Exercise } from "@screens/Exercise";
import { Profile } from "@screens/Profile";
import { History } from "@screens/History";

import HomeSvg from "@assets/home.svg"
import HistorySvg from "@assets/history.svg"
import ProfileSvg from "@assets/profile.svg"
import { Platform } from "react-native";
import { useTheme } from "@gluestack-style/react";

type AppRoutes = {
    home: undefined;
    exercise: { exerciseId: string };
    profile: undefined;
    history: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
    const { tokens } = gluestackUIConfig
    const iconSize = tokens.space["6"]
    const { colors } = useTheme();

    return (
        <Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: tokens.colors.green500,
            tabBarInactiveTintColor: tokens.colors.light300,
            tabBarStyle: {
                backgroundColor: tokens.colors.backgroundLight900,
                borderTopWidth: 0,
                height: Platform.OS === "android" ? "auto" : 96,
                paddingBottom: tokens.space["10"],
                paddingTop: tokens.space["6"],
            }

        }}>
            <Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => <HomeSvg fill={color}
                        width={iconSize} height={iconSize}
                    />
                }}
            />
            <Screen
                name="history"
                component={History}
                options={{
                    tabBarIcon: ({ color }) => <HistorySvg fill={color}
                        width={iconSize} height={iconSize}
                    />
                }}
            />
            <Screen
                name="profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => <ProfileSvg fill={color}
                        width={iconSize} height={iconSize}
                    />
                }}
            />
            <Screen
                name="exercise"
                component={Exercise}
                options={{ tabBarButton: () => null }}
            />
        </Navigator>
    )
}

