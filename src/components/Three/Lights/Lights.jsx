import EnvironmentLight from "../Lights/Environment";
import KeyLight from "./KeyLight1";
import KeyLight2 from "./KeyLight2";
import RimLight2 from "./RimLight2";
import RimLight3 from "./RimLight3";
import RimLight1 from "./RimLight1";
import WhiteLight from "./WhiteLight";
export default function Lights() {
  return (
    <>
      <EnvironmentLight />
      <WhiteLight/>
      <KeyLight />
<KeyLight2/>
      <RimLight1/>
      <RimLight2/>
      <RimLight3/>
    </> 
  );
}