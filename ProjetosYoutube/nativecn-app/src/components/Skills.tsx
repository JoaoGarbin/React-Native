import { Text, View } from "react-native";
import { Title } from "@/components/Title";
import { SKILLS } from "@/utils/skills";
import { Badge } from "./Badge";

export function Skills() {
    return (
        <View className="w-full">
            <Title>Skills</Title>

            <View className="flex-row">
                {
                    SKILLS.map((skill) => (
                        <Badge key={skill.name} variant={"secondary"} icon={skill.icon}>
                            <Text className="text-white">{skill.name}</Text>
                        </Badge>
                    ))}
            </View>
        </View>
    )
}