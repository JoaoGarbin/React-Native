import { createDrawerNavigator, DrawerScreenProps } from "@react-navigation/drawer";

import { Home } from "@/app/Home";
import { Product } from "@/app/Product";
import { MaterialIcons } from "@expo/vector-icons"
import { NavigationContainer } from "@react-navigation/native";

export type DrawerRoutesList = {
    home: undefined
    product: undefined | { id: string }
}

export type DrawerRoutesProps<T extends keyof DrawerRoutesList> = DrawerScreenProps<DrawerRoutesList, T>

const Drawer = createDrawerNavigator<DrawerRoutesList>()

export function DrawerRoutes() {
    return (
        <Drawer.Navigator
            initialRouteName="home"
            screenOptions={{
                headerShown: false,
                drawerActiveTintColor: "#2c46b1",
                drawerInactiveTintColor: "#444444",
            }}
        >
            <Drawer.Screen
                name="home"
                component={Home}
                options={{
                    drawerLabel: "Início",
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="product"
                component={Product}
                options={{
                    drawerLabel: "Produto",
                    drawerIcon: ({ color, size }) => (
                        <MaterialIcons name="add-box" color={color} size={size} />
                    ),
                }}
            />
        </Drawer.Navigator>
    )
}