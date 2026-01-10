import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Info,
  ScrollText,
  Star,
  ContactRound,
  OctagonX,
  type LucideIcon,
} from "lucide-react";

export type MenuEntry = {
  path: string;
  tagline: string;
  icon: LucideIcon;
};

const getAdmissionTagline = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // note month start from 0...
  if (currentMonth > 7) return `Spring ${currentYear + 1}`;
  else if (currentMonth > 1) return `Fall ${currentYear}`;
  return `Spring ${currentYear}`;
};

export const featureEntryKeys: Record<string, MenuEntry> = {
  Admission: {
    path: "/admission",
    tagline: `Apply for ${getAdmissionTagline()}, Wild Chicken offers scholarly* and professional* paths for learners at all stage of their educational journey`,
    icon: GraduationCap,
  },
  Diploma: {
    path: "/diploma",
    tagline:
      "Too Old for School? Or you just dont want to do all the assignments or paper readings but still be rewarded a degree? We got you, this is your way to go!",
    icon: ScrollText,
  },
  About: {
    path: "/pages/about",
    tagline:
      "When you join the Wild Chicken University, you are on your way to KFC, MCD, or, even better, Chick-fil-A or Max Burgers Aktiebolag!",
    icon: Info,
  },
  Review: {
    path: "/review",
    tagline:
      "What students/alumni/normal* people say about Wild Chicken? We definitely did not pay for these comments.",
    icon: Star,
  },
  Alumni: {
    path: "/alumni",
    tagline: "Once a Chicker, Forever a Chicker",
    icon: ContactRound,
  },
  Disclaimer: {
    path: "/pages/disclaimer",
    tagline:
      "Pretty sure no one will actually read this, but we still decided to put it here.",
    icon: OctagonX,
  },
};

export const FeatureEntry = ({
  title,
  config,
}: {
  title: string;
  config: MenuEntry;
}) => {
  const router = useRouter();
  const Icon = config.icon;
  return (
    <div className="flex flex-col bg-background border rounded-xl py-6 px-5 h-full">
      <div className="flex items-center gap-2 text-lg">
        <Icon />
        <p className="font-bold">{title}</p>
      </div>
      <div className="text-base my-2 flex-1">{config.tagline}</div>
      <Button
        variant="outline"
        className="mt-4 self-start rounded-full text-base shadow-none"
        onClick={() => router.push(config.path)}
      >
        Learn More
      </Button>
    </div>
  );
};
