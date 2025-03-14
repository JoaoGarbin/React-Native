
import { HistoryCard } from "@components/HistoryCard"
import { ScreenHeader } from "@components/ScreenHeader"
import { Heading, VStack, Text} from "@gluestack-ui/themed"
import { useState } from "react"
import { SectionList } from "react-native"

export function History(){

    const [exercises, setExercises] = useState([
        {
           title: "10.03.2025",
           data: ["Puxada Frontal", "Remada Unilateral"],
        },
        {
            title: "11.02.2025",
            data: ["Puxada Frontal"],
        },
    ])

    return(
        <VStack flex={1}>
            <ScreenHeader title="Hístorico"/>
            <SectionList 
                sections={exercises}  
                keyExtractor={item => item} 
                renderItem={() => <HistoryCard/>}
                renderSectionHeader={({ section }) => (
                    <Heading 
                        color="$gray200" 
                        fontSize="$md" 
                        mt="$10" 
                        mb="$3" 
                        fontFamily="$hrading" 
                        >
                            {section.title}
                        </Heading>
                )}
                style={{ paddingHorizontal: 32 }}
                contentContainerStyle={
                    exercises.length === 0 && { flex:1, justifyContent: "center"}
                }
                ListEmptyComponent={() => (
                    <Text color="$gray100" textAlign="center">
                        Não há exercícios registrados ainda.{"\n"} 
                        Vamos fazer exercícios hoje?
                    </Text>
                )}
                showsVerticalScrollIndicator={false}
                />
        </VStack>
    )
}