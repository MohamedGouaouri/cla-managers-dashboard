import NavBar from '@/app/NavBar';
import ChallengeForm from '../_components/ChallengeForm';

const NewChallengePage = () => {
  return <div className="w-full h-full">
    <NavBar />
  <div className="w-full bg-white rounded-lg shadow-md p-8 h-full overflow-scroll">
    <h1 className="text-3xl mb-8">Create new challenge</h1>
    <ChallengeForm />
  </div>
</div>
};

export default NewChallengePage;
