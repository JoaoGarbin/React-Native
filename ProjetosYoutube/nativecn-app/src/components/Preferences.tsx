import { View } from "react-native";
import { Title } from "@/components/Title";
import { Option } from "@/components/Options";
import { Switch } from "@/components/Switch";
import { useState } from "react";
import { Checkbox } from "@/components/Checkbox";

export function Preferences() {
    const [isEnabled, setIsEnabled] = useState(false)

    const [isChecked, setChecked] = useState(false);
    return (
        <View className="w-full">
            <Title>Preferences</Title>

            <Option>
                <Option.Icon icon="dark-mode" />
                <Option.Title>Dark Mode</Option.Title>
                <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
            </Option>

            <Option>
                <Option.Icon icon="email" />
                <Option.Title>Public Email</Option.Title>
                <Checkbox
                    aria-labelledby="terms"
                    checked={isChecked}
                    onCheckedChange={setChecked}
                />
            </Option>
        </View>
    )
}