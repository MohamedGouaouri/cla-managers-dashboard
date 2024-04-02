'use client'

import clsx from 'clsx';
import Link from 'next/link';
import EditChallengeButton from './_components/EditChallengeButton';
import DeleteChallengeButton from './_components/DeleteChallengeButton';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ChallengesList = ({challenges, reload}: any) => {
  const router = useRouter()
  const [deleteStatus, setDeleteStatus] = useState<{error: any, isDeleting: boolean, challengeId: number}>({
    error: null,
    isDeleting: false,
    challengeId: -1
  })

  const handleDelete = async (id: any) => {
    setDeleteStatus({
      ...deleteStatus,
      isDeleting: true,
      challengeId: id
    })
    try {
      const deleteResponse = await axios.delete(`http://localhost:3000/api/challenges/${id+1}`)
      if(deleteResponse.status === 200) {
        setDeleteStatus({
          error: null,
          isDeleting: false,
          challengeId: -1,
        })
        router.refresh()
      }
      setDeleteStatus({
        error: deleteResponse.data,
        isDeleting: false,
        challengeId: -1
      })
    } catch (error) {
      console.log(error)
      setDeleteStatus({
        error: error,
        isDeleting: false,
        challengeId: -1
      })
    }
  }
  return (
    <div className="overflow-scroll shadow-md bg-inherit rounded-lg p-4 text-inherit dark:bg-bgCardDark dark:text-white">
            <Table>
              <TableCaption>You challenges list</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Solution Rate</TableHead>
                  <TableHead>Created at</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
              {challenges.map((data: any, index: number) => {
                              const difficultyBadgeStyle = clsx('badge', data.level == 'Easy' ? 'badge-success' : data.level == 'Moderate' ? 'badge-warning': 'badge-error')
                              return <TableRow key={index} className="text-center">
                                <TableCell className="border px-4 py-2"><Link href={`/challenges/${index}`}>{data.title}</Link></TableCell>
                                <TableCell className="border px-4 py-2">{data.category}</TableCell>
                                <TableCell className={`border px-4 py-2 ${difficultyBadgeStyle}`}>{data.level}</TableCell>
                                <TableCell className="border px-4 py-2">{data.solutionRate}</TableCell>
                                <TableCell className="border px-4 py-2">{data.createdAt}</TableCell>
                                <TableCell className="border px-4 py-2 flex gap-1 justify-center items-center">
                                  <EditChallengeButton challengeId={index}/>
                                  <DeleteChallengeButton challengeId={index} onDelete={() => handleDelete(index)} disabled={deleteStatus.isDeleting && deleteStatus.challengeId === index}/>
                                </TableCell>
                              </TableRow>
                          })}
              </TableBody>
            </Table>
        </div>
  );
};

export default ChallengesList;
