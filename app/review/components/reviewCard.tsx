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

type ReviewCardProps = {
  ReviewComponent: React.ComponentType;
};

// Assume ReviewComponent is your MDX content (<Review1 />, <Review2 />, etc.)
export default function ReviewCard({ ReviewComponent }: ReviewCardProps) {
  return (
    <Dialog>
      <Card>
        <CardContent className="flex flex-col h-120 max-h-screen justify-between">
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
