import clsx from "clsx";
import { FormEvent } from "react";

const CreateChallengeButton = (
    {onClick, type, isEdit, className}: {isEdit?: boolean, onClick?: (e: FormEvent<any>) => void, type?: "button" | "submit" | "reset" | undefined, className?: string}
) => {
  return (
    <button
        onClick={onClick}
        type={type}
        className={clsx('btn bg-main text-white hover:bg-white hover:text-main', className)}
    >
        {isEdit ? <>Edit</> : <>Create</>}
    </button>
  );
};

export default CreateChallengeButton;
