import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NewChallengeAction = () => {
  return (
    <Button
    className='bg-violet-600 text-white hover:bg-white hover:text-violet-600 border'
    >
      <Link href="/challenges/new" >New Challenge</Link>
    </Button>
  );
};

export default NewChallengeAction;
