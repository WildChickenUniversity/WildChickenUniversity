import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GraduationCap } from "lucide-react";
import Link from "next/link";

const Alumni = () => {
  return (
    <Alert variant="default" className="mb-4">
      <GraduationCap />
      <AlertTitle>Alumni</AlertTitle>
      <AlertDescription>
        <p>
          If you would like to show case Wild Chicken University on your GitHub
          profile page, please open an issue{" "}
          <Link
            className="font-bold hover:underline"
            href="https://github.com/WildChickenUniversity/WildChickenUniversity/issues/new?template=apply.md"
          >
            here
          </Link>
          .
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default Alumni;
