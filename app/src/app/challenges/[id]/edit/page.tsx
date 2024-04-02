import dynamic from 'next/dynamic';
import ChallengeFormSkeleton from './loading';
import axios from 'axios';

const ChallengeForm = dynamic(() => import('@/app/challenges/_components/ChallengeForm'), {
  ssr: false,
  loading: () => <ChallengeFormSkeleton />,
});


const getChallengeById = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/challenges/${id+1}`)
    return response.data
    
  } catch (error) {
    return {
      status: 'error',
      data: null
    }
  }
}

interface Props {
  params: { id: string };
}

const EditChallengePage = async ({ params }: Props) => {
  const challenge = await getChallengeById(parseInt(params.id))

  return  challenge.data ? <ChallengeForm challenge={challenge.data}/> : <div className='w-full text-center text-red-500'>Error loading data</div>;
};

export default EditChallengePage;
