"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import ReviewCard from "./reviewCard";
import { cn } from "@/lib/utils";

// hacky way to import all reviews in mdx directory
const importAll = (r: __WebpackModuleApi.RequireContext) => {
  const filePaths = r.keys();

  const sortedPaths = filePaths.sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
  );

  return sortedPaths.map((path) => r(path).default);
};

const reviews = importAll(require.context("./mdx", false, /\.mdx$/));

type ReviewCarouselProps = {
  showControl?: boolean;
  className?: string;
  cardClassName?: string;
};

const ReviewCarousel = ({
  showControl = true,
  className = "md:basis-1/2",
  cardClassName,
}: ReviewCarouselProps) => {
  return (
    <>
      <div className="my-4">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
          opts={{ align: "start", loop: true }}
        >
          <CarouselContent>
            {reviews.map((ReviewComponent, index) => (
              <CarouselItem key={index} className={cn(className)}>
                <div className="p-1">
                  <ReviewCard
                    ReviewComponent={ReviewComponent}
                    className={cardClassName}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {showControl && (
            <>
              <CarouselPrevious className="hidden md:inline-flex" />
              <CarouselNext className="hidden md:inline-flex" />
            </>
          )}
        </Carousel>
      </div>
    </>
  );
};

export default ReviewCarousel;
