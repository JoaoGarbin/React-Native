import { Button } from "@components/Button"
import { ScreenHeader } from "@components/ScreenHeader"
import { UserPhoto } from "@components/UserPhoto"
import { Input } from "@components/input"
import { ToastMessage } from "@components/ToastMessage"
import { Controller, useForm } from "react-hook-form"

import * as ImagePicker from "expo-image-picker"
import * as FileSystem from "expo-file-system"
import { useState } from "react"

import defaultUserPhotoImg from '@assets/userPhotoDefault.png'

import { VStack, Center, Text, Heading, useToast } from "@gluestack-ui/themed"
import { ScrollView, TouchableOpacity, Alert } from "react-native"
import { useAuth } from "@hooks/useAuth"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { api } from "@services/api"
import { AppError } from "@utils/AppError"


type FormDataProps = {
    name: string;
    email: string;
    password: string;
    old_password: string;
    confirm_password: string;
}

const profileSchema = yup.object({
    name: yup.string().required('Informe o nome.'),
    password: yup.string().min(6, 'A senha deve ter pelo menos 6 dígitos.').nullable().transform((value) => !!value ? value : null),
    confirm_password: yup
        .string()
        .nullable()
        .transform((value) => !!value ? value : null)
        .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere.')
        .when('password', {
            is: (Field: any) => Field,
            then: yup
                .string()
                .nullable()
                .required('Informe a confirmação da senha.')
                .transform((value) => !!value ? value : null)
        }),
});

export function Profile() {

    const [isUpdate, setIsUpdate] = useState(false);

    const [photoIsLoading, setPhotoIsLoading] = useState(false);

    const toast = useToast();
    const { user, updateUserProfile } = useAuth();
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email,
        },
        resolver: yupResolver(profileSchema)
    });

    async function handleProfileUpdate(data: FormDataProps) {
        try {
            setIsUpdate(true);

            const userUpdated = user;
            userUpdated.name = data.name;

            await api.put('/users', data);

            await updateUserProfile(userUpdated);

            toast.show({
                placement: 'top',
                render: ({ id }) => (
                    <ToastMessage
                        id={id}
                        action="success"
                        title="Perfil atualizado com sucesso!"
                        onClose={() => toast.close(id)}
                    />
                )
            });
        } catch (error) {
            const isAppError = error instanceof AppError;
            const title = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';

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

        } finally {
            setIsUpdate(false);
        }
    }

    async function handleUserPhotoSelect() {

        setPhotoIsLoading(true);
        try {

            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true,
            })

            if (photoSelected.canceled) {
                return
            }

            const photoURI = photoSelected.assets[0].uri

            if (photoURI) {

                const photoInfo = await FileSystem.getInfoAsync(photoURI) as {
                    size: number
                }

                if (photoInfo && (photoInfo.size / 1024 / 1024) > 5) {

                    return toast.show({
                        placement: "top",
                        render: ({ id }) => (
                            <ToastMessage
                                id={id}
                                action="error"
                                title="Essa imagem é muito grande. Escolha uma de até 5MB"
                                onClose={() => toast.close(id)}
                            />
                        ),
                    })
                }

                const fileExtension = photoURI.split('.').pop();

                const photoFile = {
                    name: `${user.name}.${fileExtension}`.toLowerCase(),
                    uri: photoURI,
                    type: `'image'/${fileExtension}`
                } as any;

                const userPhotoUploadForm = new FormData();
                userPhotoUploadForm.append('avatar', photoFile);

                const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                const userUpdated = user;
                userUpdated.avatar = avatarUpdatedResponse.data.avatar;
                updateUserProfile(userUpdated);

                toast.show({
                    placement: 'top',
                    render: ({ id }) => (
                        <ToastMessage
                            id={id}
                            action="success"
                            title="Foto atualizada com sucesso!"
                            onClose={() => toast.close(id)}
                        />
                    )
                });

                //setUserPhoto(photoURI)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setPhotoIsLoading(false)
        }
    }

    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil" />

            <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
                <Center mt="$6" px="$10">
                    <UserPhoto
                        source={user.avatar ?
                            { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                            : defaultUserPhotoImg}
                        alt="Foto do usuário"
                        size="xl"
                    />

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text
                            color="$green500"
                            fontFamily="$heading"
                            fontSize="$md"
                            mt="$2"
                            mb="$8"
                        >Alterar Foto
                        </Text>
                    </TouchableOpacity>

                    <Center w="$full" gap="$4">

                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    bg="$gray600"
                                    placeholder='Nome'
                                    onChangeText={onChange}
                                    value={value}
                                    errorMessage={errors.name?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="email"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    bg="$gray600"
                                    placeholder="E-mail"
                                    isReadOnly
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                    </Center>
                    <Heading
                        alignSelf="flex-start"
                        fontFamily="$heading"
                        color="$gray200"
                        fontSize="$md"
                        mt="$12"
                        mb="$2"
                    >
                        Alterar Senha
                    </Heading>

                    <Center w="$full" gap="$4">
                        <Controller
                            control={control}
                            name="old_password"
                            render={({ field: { onChange } }) => (
                                <Input
                                    bg="$gray600"
                                    placeholder="Senha antiga"
                                    secureTextEntry
                                    onChangeText={onChange}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="password"
                            render={({ field: { onChange } }) => (
                                <Input
                                    bg="$gray600"
                                    placeholder="Nova senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    errorMessage={errors.password?.message}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="confirm_password"
                            render={({ field: { onChange } }) => (
                                <Input
                                    bg="$gray600"
                                    placeholder="Confirme a nova senha"
                                    secureTextEntry
                                    onChangeText={onChange}
                                    errorMessage={errors.confirm_password?.message}
                                />
                            )}
                        />
                        <Button title="Atualizar"
                            mt={4}
                            onPress={handleSubmit(handleProfileUpdate)}
                            isLoading={isUpdate}
                        />
                    </Center>
                </Center>

            </ScrollView>
        </VStack>
    )
}