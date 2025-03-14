import { VStack, Icon, HStack, Heading, Text, Image, Box} from "@gluestack-ui/themed"
import { ArrowLeft } from "lucide-react-native"
import { TouchableOpacity, ScrollView } from "react-native"
import { AppNavigatorRoutesProps } from "../routes/app.routes"

import { useNavigation } from "@react-navigation/native"

import BodySvg from "@assets/body.svg"
import SeriesSvg from "@assets/series.svg"
import RepetiotionSvg from "@assets/repetitions.svg"
import { Button } from "@components/Button"

export function Exercise(){

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleGoBack() {
        navigation.goBack()
    }
    return(
        <VStack flex={1}>
            <VStack px="$8" bg="$gray600" pt="$12">
                <TouchableOpacity onPress={handleGoBack}>
                    <Icon as={ArrowLeft} color="$green500" size="xl"/>
                </TouchableOpacity>

                <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    mt="$4"
                    mb="$8"
                >
                    <Heading
                        color="$gray100"
                        fontFamily="$heading"
                        fontSize="$lg"
                        flexShrink={1}
                    >Puxada Frontal</Heading>

                    <HStack alignItems="center">
                        <BodySvg/>

                        <Text color="$gray200" ml="$1" textTransform="capitalize" >Costas</Text>
                    </HStack>
                </HStack>

            </VStack>

            <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={{ paddingBottom: 32}}
            >
            
            <VStack p="$8">
                <Image source={{
                    uri: "https://static.wixstatic.com/media/2edbed_f174c44ab99c4ddfbac6867900ef849e~mv2.gif/v1/fill/w_980,h_980,al_c,usm_0.66_1.00_0.01,pstr/2edbed_f174c44ab99c4ddfbac6867900ef849e~mv2.gif"
                    }}
                    alt="Exercício"
                    mb="$3"
                    resizeMode="cover"
                    rounded="$lg" 
                    w="$full"
                    h="$80"
                    />

                    <Box bg="$gray600" rounded="$md" pb="$4" px="$4">
                        <HStack 
                            alignItems="center" 
                            justifyContent="space-around" 
                            mb="$6" 
                            mt="$5"
                            >
                            <HStack>
                                <SeriesSvg/>
                                <Text color="$gray200" ml="$2">3 séries</Text>
                            </HStack>
                            <HStack>
                                <RepetiotionSvg/>
                                <Text color="$gray200" ml="$2">12 repetições</Text>
                            </HStack>
                        </HStack>

                        <Button title="marcar como realizado"/>
                    </Box>
            </VStack>
            </ScrollView>
        </VStack>
    )
}