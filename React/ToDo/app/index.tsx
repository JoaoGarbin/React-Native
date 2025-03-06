import { StatusBar } from "react-native";
import Home from "./screens/Home";

export default function Index() {
  return (

<>
    <StatusBar 
      barStyle="light-content"
      backgroundColor="#0D0D0D"
      translucent={true}
      />
    <Home/>
    </>
  );
}
