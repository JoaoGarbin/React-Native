import { Heading, HStack, VStack, Text } from "@gluestack-ui/themed"
import { useState } from "react"
import { HomeHeader } from "@components/HomeHeader"
import { Group } from "@components/Group"
import { FlatList } from "react-native"
import { ExerciseCard } from "@components/ExerciseCard"
import { Exercise } from "./Exercise"
import { useNavigation } from "@react-navigation/native"
import { AppNavigatorRoutesProps } from "../routes/app.routes"

export function Home() {
    const [exercises, setExercises] = useState([
        "Puxada Frontal",
        "Remada Curvada",
        "Remada UniLateral",
        "Levantamento Terra",
    ])
    const [groups, setGroup] = useState(["Costas", "Bíceps", "Triceps", "Ombro"])
    const [groupSelected, setGroupSelected] = useState("Costas")

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleOpenExercisedetails() {
        navigation.navigate("exercise")
    }

    return (
        <VStack flex={1}>
            <HomeHeader />

            <FlatList data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected.toLowerCase() === item.toLowerCase()}
                        onPress={() => setGroupSelected(item)}
                    />
                )}
                horizontal
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 32 }}
                style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
            />

            <VStack px="$8" flex={1}>
                <HStack justifyContent="space-between" mb="$5" alignItems="center">
                    <Heading color="$gray200" fontSize="$md" fontFamily="$heading">
                        Exercícios
                    </Heading>

                    <Text color="$gray200" fontSize="$sm" fontFamily="$body">
                        {exercises.length}
                    </Text>
                </HStack>

                <FlatList
                    data={exercises}
                    keyExtractor={(item) => item}
                    renderItem={() => <ExerciseCard onPress={handleOpenExercisedetails} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />

            </VStack>
        </VStack>
    )
}