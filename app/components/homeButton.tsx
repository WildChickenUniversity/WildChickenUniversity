import { Button } from "@/components/ui/button";
import { menuPaths } from "@/lib/menuEntries";
import { useRouter } from "next/navigation";

const HomeButton = ({ title, tagline }: { title: string; tagline: string }) => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      className="w-[270px] md:w-50 h-20 group flex flex-col justify-center items-start text-left"
      onClick={() => router.push(menuPaths[title])}
    >
      <div className="text-lg">
        <b>
          {title}
          <span className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity">
            {" "}
            &#8594;
          </span>
        </b>
      </div>
      <div className="text-sm mt-1 text-gray-400">{tagline}</div>
    </Button>
  );
};

export default HomeButton;
