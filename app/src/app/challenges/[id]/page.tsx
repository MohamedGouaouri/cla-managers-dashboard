import delay from "delay";
import { Suspense } from "react";

interface Props {
  params: { id: string };
}

const ChallengeDetailPage = async ({ params }: Props) => {
  // Load challenge
  return (
    <Suspense>Challenge details page: {params.id}.</Suspense>
  );
};

export default ChallengeDetailPage;

