import { OneSignal } from "react-native-onesignal";

export function tagUserInfoCreate() {
    OneSignal.User.addTags({
        user_name: "Rodrigo",
        user_email: "rodrigo.goncalves@rocketseat.team",
    })
}

export function tagCartUpdate(itemCount: string) {
    OneSignal.User.addTag("cart_item_count", itemCount)
}