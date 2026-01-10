import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-white font-bold text-3xl">418 - I'm a teapot</h1>
      <p>
        Unfortunately we cannot custimize the http status code to 418, but
        please enjoy this lovely cat picture :&#41;
      </p>
      <Image
        src="https://http.cat/418"
        alt="418"
        width={600}
        height={480}
        priority
      />
      <Button className="text-xl font-semibold mb-2" asChild>
        <Link href="/">Go Back</Link>
      </Button>
    </div>
  );
}
