'use client';

import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";

const DeleteChallengeButton = ({ challengeId, disabled, onDelete}: { challengeId: number, disabled?: boolean, onDelete: () => void}) => {
  
  const handleClick = () => {
    onDelete()
    console.log('Call on delete ', challengeId)
  }
  return (
    <Button
      className={'bg-red-500 text-white hover:bg-white border hover:text-black'}
      // disabled={disabled}
      onClick={handleClick}
    >
      <MdDelete />
    </Button>
  );
};

export default DeleteChallengeButton;
