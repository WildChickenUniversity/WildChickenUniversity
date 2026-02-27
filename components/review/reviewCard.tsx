// components/ReviewCard.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ReviewCardProps = {
  ReviewComponent: React.ComponentType;
  className?: string;
};

// Assume ReviewComponent is your MDX content (<Review1 />, <Review2 />, etc.)
export default function ReviewCard({
  ReviewComponent,
  className,
}: ReviewCardProps) {
  return (
    <Dialog>
      <Card>
        <CardContent
          className={cn(
            "flex flex-col h-120 max-h-screen justify-between",
            className,
          )}
        >
          {/* This div will show the preview and fade out */}
          <div className="relative h-full overflow-hidden">
            <div className="mdx-layout">
              <ReviewComponent />
            </div>
          </div>

          <DialogTrigger asChild>
            <Button variant="outline" className="mt-2">
              Read More
            </Button>
          </DialogTrigger>
        </CardContent>
      </Card>

      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Full Review</DialogTitle>
        </DialogHeader>
        <div className="mdx-layout">
          <ReviewComponent />
        </div>
      </DialogContent>
    </Dialog>
  );
}
