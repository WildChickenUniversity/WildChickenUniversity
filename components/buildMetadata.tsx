import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  title: string;
  keywords: string[] | undefined;
};

const buildMetadata = async (
  { title, keywords }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const parentKeywords = (await parent).keywords ?? [];
  return {
    title: title,
    keywords: [...parentKeywords, ...(keywords ?? [])],
  };
};

export default buildMetadata;