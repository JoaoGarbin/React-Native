import { Text, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

export function User() {
    return (
        <View className="items-center">

            <Avatar alt="Imagem de perfil" className="w-32 h-32 border-4 border-gray-800">
                <AvatarImage source={{ uri: "https://github.com/joaogarbin.png" }} />
                <AvatarFallback className="text-white">JG</AvatarFallback>
            </Avatar>

            <Text className="text-white font-bold text-2xl mt-4">João Garbin</Text>
            <Text className="text-gray-400 text-lg">@joaogarbin</Text>
        </View>
    )
}