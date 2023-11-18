import dynamic from "next/dynamic";

const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });

const TypewriterWrapper = () => (
  <Typewriter
    onInit={(typewriter) => {
      typewriter.typeString("Hello World!").start();
    }}
  />
);

export default TypewriterWrapper;
