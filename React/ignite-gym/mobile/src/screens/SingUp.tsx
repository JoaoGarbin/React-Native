import { VStack, Image, Center, Text, Heading, ScrollView, useToast } from "@gluestack-ui/themed"
import { Input } from "@components/input"
import { useForm, Controller } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { api } from "@services/api";
import axios from "axios";

import BackgroundImg from "@assets/background.png"
import Logo from "@assets/logo.svg"
import { Button } from "@components/Button"
import { useNavigation } from "@react-navigation/native"
import { AppError } from "@utils/AppError"
import { Toast } from "@gluestack-ui/themed";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { ToastMessage } from "@components/ToastMessage";

type FormDataProps = {
    name: string;
    email: string;
    password: string;
    password_confirm: string;
}

const singUpSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    email: yup.string().required('Informe o e-mail').email('E-mail Inválido'),
    password: yup.string().required('Informe a senha')
        .min(6, 'A senha deve ter pelo menos 6 dígitos'),
    password_confirm: yup.string().required('Confirme a sua senha')
        .oneOf([yup.ref("password"), ""], "A confirmação da senha não confere"),
});

export function SingUp() {
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();
    const { signIn } = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(singUpSchema)
    });

    const navigation = useNavigation();

    function handlegoBack() {
        navigation.goBack()
    }

    async function handleSingUp({ name, email, password }: FormDataProps) {
        try {
            setIsLoading(true);

            await api.post('/users', { name, email, password });
            await signIn(email, password)


        } catch (error) {
            setIsLoading(false);
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : "Não foi possível criar a conta. tente novamente mais tarde";


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

                    <Center gap="$2" flex={1}>
                        <Heading color="$gray100">Crie a sua conta</Heading>

                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Nome"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />


                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="E-mail"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.email?.message}
                                />
                            )}
                        />


                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password_confirm"
                            render={({ field: { onChange, value } }) => (
                                <Input
                                    placeholder="Confirme a Senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    value={value}
                                    onSubmitEditing={handleSubmit(handleSingUp)}
                                    returnKeyType="send"
                                    errorMessage={errors.password_confirm?.message}
                                />
                            )}
                        />

                        <Button
                            title="Criar e acessar"
                            onPress={handleSubmit(handleSingUp)}
                            isLoading={isLoading}
                        />

                    </Center>

                    <Button title="Voltar para o login" variant="outline" mt="$12" onPress={handlegoBack} />

                </VStack>

            </VStack>
        </ScrollView>
    )
}