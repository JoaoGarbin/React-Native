import { Heading, HStack, Image, VStack, Text, Icon } from "@gluestack-ui/themed";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ChevronRight } from "lucide-react-native";

type Props = TouchableOpacityProps

export function ExerciseCard({...rest}: Props){
    return (
        <TouchableOpacity {...rest} >
            <HStack
            bg="$gray500"
            alignItems="center"
            p="$2"
            pr="$4"
            rounded="$md"
            mb="$3"
            >
                <Image 
                    source={{
                    uri: "https://static.wixstatic.com/media/2edbed_f174c44ab99c4ddfbac6867900ef849e~mv2.gif/v1/fill/w_980,h_980,al_c,usm_0.66_1.00_0.01,pstr/2edbed_f174c44ab99c4ddfbac6867900ef849e~mv2.gif"
                    }}
                alt="imagem do exercício"
                w="$16"
                h="$16"
                rounded="$md"
                mr="$4"
                resizeMode="cover"
                />
            <VStack flex={1}>
                <Heading fontSize="$lg" color="$white" fontFamily="$heading">
                    Puxada Frontal
                </Heading>

                <Text fontSize="$sm" color="$gray200" mt="$1" numberOfLines={2}>
                    3 séries x 12 repetições
                </Text>
            </VStack>
                <Icon as={ChevronRight} color="$gray300"/>
            </HStack>
        </TouchableOpacity>
    )
}