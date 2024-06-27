import { TypeAnimation } from "react-type-animation";

export default function TWrapper() {
  return (
    <TypeAnimation
      sequence={[
        "Possible Things Made Impossible",
        2000,
        "Confirmed Rumors",
        2000,
        "Organized Chaos",
        2000,
        "Expected Suprises",
        2000,
        "Effortless Challenges",
        2000,
      ]}
      wrapper="p"
      speed={50}
      style={{ display: "inline-block" }}
      repeat={Infinity}
    />
  );
}
