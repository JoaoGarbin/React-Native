import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from "@gluestack-ui/themed"
import { Input } from "@components/input"
import { useState } from "react"

import BackgroundImg from "@assets/background.png"
import Logo from "@assets/logo.svg"
import { Button } from "@components/Button"
import { AuthNavigatorRoutesProps } from "../routes/auth.routes"
import { useNavigation } from "@react-navigation/native"
import { Controller, useForm } from "react-hook-form"

import { useAuth } from "@hooks/useAuth"
import { AppError } from "@utils/AppError"
import { ToastMessage } from "@components/ToastMessage"

type FormData = {
    email: string;
    password: string;
}

export function SingIn() {
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useAuth();
    const toast = useToast();

    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    function handleNewAccount() {
        navigation.navigate("signUp")
    }

    async function handleSingIn({ email, password }: FormData) {
        try {
            setIsLoading(true);
            await signIn(email, password);

        } catch (error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : "Não foi possivel acessar. tente novamente mais tarde"

            setIsLoading(false);


            toast.show({
                placement: 'top',
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        action="error"
                        title={title}
                        onClose={() => toast.close(id)}
                    />
                )
            });
        }
    }
    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}>
            <VStack flex={1}>
                <Image
                    w="$full"
                    h={624}
                    source={BackgroundImg}
                    defaultSource={BackgroundImg}
                    position="absolute"
                    alt="Pessoas Treinando"
                />
                <VStack flex={1} px="$10" pb="$16">
                    <Center my="$24">
                        <Logo />

                        <Text color="$gray100" fontSize="$sm">
                            treine sua mente e o seu corpo
                        </Text>
                    </Center>

                    <Center gap="$2">
                        <Heading color="$gray100">Acesse a conta</Heading>

                        <Controller
                            control={control}
                            name="email"
                            rules={{ required: "Informe o e-mail" }}
                            render={({ field: { onChange } }) => (
                                <Input
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    onChangeText={onChange}
                                    errorMessage={errors.email?.message}
                                    autoCapitalize="none"
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            rules={{ required: "Informe a sua Senha" }}
                            render={({ field: { onChange } }) => (
                                <Input
                                    secureTextEntry
                                    placeholder="Senha"
                                    onChangeText={onChange}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />

                        <Button
                            title="Acessar"
                            onPress={handleSubmit(handleSingIn)}
                            isLoading={isLoading}
                        />
                    </Center>

                    <Center flex={1} justifyContent="flex-end" mt="$4">
                        <Text color="$gray100" fontSize="$sm" mb="$3" fontFamily="$body">Ainda não tem acesso?</Text>

                        <Button title="Criar Conta" variant="outline" onPress={handleNewAccount} />
                    </Center>


                </VStack>

            </VStack>
        </ScrollView>
    )
}