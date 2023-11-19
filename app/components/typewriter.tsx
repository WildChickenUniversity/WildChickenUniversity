import { TypeAnimation } from "react-type-animation";

export default function TWrapper() {
  return (
    <TypeAnimation
      sequence={[
        "Possible things made impossible",
        2000,
        "Possible things made chicken",
        2000,
      ]}
      wrapper="p"
      speed={50}
      style={{ display: "inline-block" }}
      repeat={Infinity}
    />
  );
}
