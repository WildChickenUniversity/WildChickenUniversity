import {
  FeatureEntry,
  featureEntryKeys,
} from "@/app/components/home/featureEntry";
import { Kavoon } from "next/font/google";
import Section from "./section";

const kavoon = Kavoon({
  variable: "--font-kavoon",
  weight: "400",
});

const Features = () => {
  return (
    <Section
      className="min-h-[calc(100vh-6rem)] h-full"
      title={
        <>
          Effortless <span className={kavoon.className}>Challenges</span>
        </>
      }
      titleClassName="text-3xl sm:text-4xl"
    >
      <div className="mx-auto mt-10 sm:mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(featureEntryKeys).map(([title, config]) => (
          <FeatureEntry key={title} title={title} config={config} />
        ))}
      </div>
    </Section>
  );
};

export default Features;
