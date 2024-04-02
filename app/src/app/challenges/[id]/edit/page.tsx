import dynamic from 'next/dynamic';
import ChallengeFormSkeleton from './loading';
import axios from 'axios';
import NavBar from '@/app/NavBar';

const ChallengeForm = dynamic(() => import('@/app/challenges/_components/ChallengeForm'), {
  ssr: false,
  loading: () => <ChallengeFormSkeleton />,
});


const getChallengeById = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/challenges/${id+1}`)
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
  return <div className="w-full h-full">
    <NavBar />
  <div className="w-full bg-white rounded-lg shadow-md p-8 h-full overflow-scroll">
    <h1 className="text-3xl mb-8">Edit challenge</h1>
    {challenge.data ? <ChallengeForm challenge={challenge.data}/> : <div className='w-full text-center text-red-500'>Error loading data</div>};
  </div>
  </div>
};

export default EditChallengePage;
