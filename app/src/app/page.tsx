import { Metadata } from 'next';
import ChallengesList from './challenges/ChallengesList';
import NewChallengeAction from './challenges/NewChallengeAction';
import axios from 'axios';
import { getSession } from './auth/auth';
import { redirect } from 'next/navigation';
import NavBar from './NavBar';

export const getChallenges = async () => {
  const res = await axios.get('http://localhost:8080/api/challenges/');
  return res.data;
}

export default async function Home() {
  const authSession = await getSession()
  if (!authSession) {
    return redirect('/auth/signin')
  }
  try {
    let challenges = await getChallenges()
    return (
      <div className='h-full w-full overflow-scroll'>
        <NavBar />
        <h1 className='text-3xl font-bold p-2'>Your challenges</h1>
        <div className='flex justify-between my-2'>
          <NewChallengeAction />
        </div>
        <ChallengesList challenges={challenges}/>
      </div>
  );
  } catch (error) {
    return <div>Could not load data</div>
  }
  
}

export const metadata: Metadata = {
  title: 'Challenges Manager - Dashboard',
  description: 'View a summary table of created challenges',
};
