import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { FormEvent } from "react";

const CreateChallengeButton = (
    {onClick, type, isEdit, className}: {isEdit?: boolean, onClick?: (e: FormEvent<any>) => void, type?: "button" | "submit" | "reset" | undefined, className?: string}
) => {
  return (
    <Button
        onClick={onClick}
        type={type}
        className={clsx('bg-violet-500', className)}
    >
        {isEdit ? <>Edit</> : <>Create</>}
    </Button>
  );
};

export default CreateChallengeButton;
