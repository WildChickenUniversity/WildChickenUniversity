import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Chicken from "./chicken";
import Section from "./section";

const red = "#A41D21";
const yellow = "#FFD200";

const Hero = () => {
  const router = useRouter();
  return (
    <Section className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center py-20">
      <div className="flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="max-w-xl mx-auto">
            <Chicken />
          </div>
          <h1 className="mt-6 max-w-[20ch] text-4xl sm:text-5xl font-bold leading-[1.2] tracking-tight">
            <span className="line-through">Possible?</span> things made
            IMPOSSIBLE
          </h1>
          <h2 className="mt-4 max-w-[60ch] text-xl font-semibold">
            Welcome to the <span style={{ color: red }}>Wild</span>{" "}
            <span style={{ color: yellow }}>Chicken</span> University!
          </h2>
          <p className="mt-2 max-w-[60ch] xs:text-lg">
            We do understand how bad you feel when you get a rejection letter
            from the university, that's why we won't say "We regret that we are
            unable to offer you admission."
          </p>
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex-col flex sm:flex-row gap-4 sm:justify-center">
              <Button
                size="lg"
                className="w-48 sm:w-auto rounded-full text-base"
                onClick={() => router.push("/diploma")}
              >
                {/* Start your{" "}
              <span className={`${kavoon.className} pl-2`}>Journey</span> */}
                Diploma
                <ArrowUpLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-48 sm:w-auto rounded-full text-base"
                onClick={() => router.push("/admission")}
              >
                Admission
                <ArrowUpRight className="h-5 w-5" />
              </Button>
            </div>
            <div className="font-mono text-xs text-center">
              read our{" "}
              <Link className="font-bold underline" href="/pages/disclaimer">
                disclaimer
              </Link>{" "}
              before continue.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
