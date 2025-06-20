import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Preferences } from "@/components/Preferences";
import { Skills } from "@/components/Skills";
import { User } from "@/components/User";
import { Image, Text, View } from "react-native";

export function Profile() {
    return (
        <View className="flex-1 bg-gray-900">
            <Image
                source={require("@/assets/banner.png")}
                className="w-full h-52 -mb-16"
            />
            <View className="flex-1 px-4 pb-4">
                <User />
                <Skills />
                <Preferences />

                <View className="w-full mt-6 flex-1">
                    <Text className="text-white text-base font-bold mb-2">Company</Text>
                    <Input placeholder="Company" />

                    <View className="flex-1 justify-center items-center gap-5">
                        <Button variant={"default"} className="w-full">
                            <Text className="font-bold">Save</Text>
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    )
}