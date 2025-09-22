import Typewriter from "typewriter-effect";
import { Tinos } from "next/font/google";

const font = Tinos({
  weight: "700",
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
          strings: [
            "Possible Things Made Impossible",
            "Effortless Challenges",
            "Ranked QS #0 for Decades",
            "US News Best National University #0",
            `World University Rankings ${new Date().getFullYear()} TOP 0`,
          ],
          autoStart: true,
          loop: true,
          delay: 75,
        }}
      />
    </div>
  );
};

export default TypewriterWrapper;
