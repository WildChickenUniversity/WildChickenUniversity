import Typewriter from "typewriter-effect";
import { Monomakh } from "next/font/google";

const font = Monomakh({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  display: "swap",
  fallback: ["Times New Roman", "sans-serif"],
});

const TypewriterWrapper = () => {
  return (
    <div className={`mt-2 ${font.className}`}>
      <Typewriter
        options={{
          strings: ["Possible Things Made Impossible", "Effortless Challenges"],
          autoStart: true,
          loop: true,
          delay: 75,
        }}
      />
    </div>
  );
};

export default TypewriterWrapper;
