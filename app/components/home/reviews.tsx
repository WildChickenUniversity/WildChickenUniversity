import ReviewCarousel from "@/components/review/reviewCarousel";
import Section from "./section";

const Reviews = () => {
  return (
    <Section
      id="reviews"
      title="Reviews"
      titleClassName="mb-10 text-3xl md:text-4xl px-6"
    >
      <ReviewCarousel
        showControl={false}
        className="md:basis-1/3"
        cardClassName="h-90"
      />
    </Section>
  );
};

export default Reviews;
