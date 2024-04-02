import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MdModeEdit } from "react-icons/md";

const EditChallengeButton = ({ challengeId }: { challengeId: number }) => {
  return (
    <Button
      className='bg-textViolet text-white hover:bg-white border hover:text-textViolet'
    >
      <Link href={`/challenges/${challengeId}/edit`}><MdModeEdit /></Link>
    </Button>
  );
};

export default EditChallengeButton;
