import { useRouter } from 'next/router';

const ChallengeDetails = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      ChallengeDetails component {id}
    </>
  );
};

export default ChallengeDetails;
