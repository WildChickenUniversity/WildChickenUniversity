import ReviewCarousel from "@/components/review/reviewCarousel";
import Section from "./section";

const Reviews = () => {
  return (
    <Section
      id="reviews"
      title="Reviews"
      titleClassName="mb-10 text-3xl md:text-4xl px-6"
      className="h-[calc(100dvh-4rem)] py-6 md:py-8 overflow-hidden"
    >
      <ReviewCarousel
        showControl={false}
        className="md:basis-1/3"
        cardClassName="h-[min(calc(100dvh-18rem),40rem)]"
      />
    </Section>
  );
};

export default Reviews;
