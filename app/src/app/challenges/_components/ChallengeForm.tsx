'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror'
import {javascript} from '@codemirror/lang-javascript'
import {python} from '@codemirror/lang-python'
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState, useTransition } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { SimpleMdeReact } from 'react-simplemde-editor';
import { FaPlus } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";
import CreateChallengeButton from './CreateChallengeButton';
import { CreateChallengeSchema } from '@/app/validation/challenge';
import { useDispatch, useSelector } from 'react-redux';
import LanguageMenu from './LanguageMenu';
import FontSizeMenu from './FontMenue';
import { submitChallenge } from '../actions/actions';
import { alertAction } from '@/app/redux/slices/ui.slice';
import { CodeCLAlert } from './Alerts';

interface ChallengeFormData {
  _id: string;
  title: string;
  category: string;
  level: 'Easy' | 'Moderate' | 'Hard';
  description?: string;
  function_name: string;
  code?: any,
  tests?: ITestCase[]
}


interface ITestCase {
  weight: number,
  type: any,
  value: any,
  name: string,
  output: any
}

interface ChallengeFormProps {
  challenge? :ChallengeFormData
}


const ChallengeForm = ({ challenge }: ChallengeFormProps) => {
  const isEdit = !!challenge
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ChallengeFormData>({
    resolver: zodResolver(CreateChallengeSchema),
  });

  const language = useSelector((state: any) => state.ui.language)
  const fontSize = useSelector((state: any) => state.ui.fontSize)
  const [challengeDescription, setDescription] = useState(challenge?.description);
  const [functionName, setFunctionName] = useState(challenge?.code?.function_name);
  const [code, setCode] = useState(challenge?.code?.code_text ? challenge?.code?.code_text.find((ct: any) => ct.language == language).text : '')
  const [tests, setTests] = useState<Array<ITestCase>>(challenge?.tests ? challenge?.tests.map((test: any) => ({...test, ...test.inputs[0]})) : [])
  const [isPending, startTransition] = useTransition()
  const dispatch = useDispatch()
  const alert = useSelector((state: any) => state.ui.alert)
  const onChallengeDescriptionChange = useCallback((value: string) => {
    setDescription(value);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (!challengeDescription) {
      setError('description', {
        type: 'required',
        message: 'Challenge description is required',
      })
    }
    if (!code) {
      setError('code', {
        type: 'required',
        message: 'Challenge code is required',
      })
    }
    if(Object.keys(errors).length != 0) {
      return
    }
    data.description = challengeDescription
    data.code = {
      function_name: functionName,
      code_text: [
        {
          language,
          code_text: code,
        }
      ],
      inputs: tests.map((test) => ({name: test.name, type: test.type}))
    }
    data.tests = tests
    if (challenge) {
      data._id = challenge._id ;
    }
    console.log(data)
    try {
      const response = await submitChallenge(data, !isEdit)
      dispatch(alertAction({
        type: 'success',
        message: response.message
      }))
    } catch (error) {
      console.error(error)
      dispatch(alertAction({
        type: 'error',
        message: 'Error happened'
      }))
    }
  });

  const onAddTestCase = () => {
    setTests(prevTests  => {
      return [...prevTests, {
        type: 'number',
        name: 'a',
        output: 10,
        value: 5,
        weight: 0.6
      }]
    });
  }

  const onUpdateTest = (idx: number) => {
    return (test: ITestCase) => {
      const newTests = [...tests]
      newTests[idx] = test
      setTests(newTests)
    }
  }

  const onRemoveTest = (idx: number) => {
    setTests(prevItems  => {
      const newTests = [...prevItems]
      newTests.splice(idx, 1)
      return newTests
    });
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      {alert && <CodeCLAlert type={alert.type} message={alert.message}/>}
      <form 
        onSubmit={(data) => startTransition(() => onSubmit(data))}
        className="space-y-3 grid gap-2 md:grid-cols-2 h-full w-full relative">
          
        <div className='md:col-span-1'>
          
          <div className="space-y-1">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title <span className='text-red-500'>*</span>
            </label>
            <input
              type="text"
              id="title"
              defaultValue={challenge?.title}
              placeholder="Title"
              {...register('title')}
              className="bg-white w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-main focus:ring-main"
            />
            {errors.title && <span className='text-red-500'>{errors.title?.message}</span>}
          </div>
          <div className="space-y-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category <span className='text-red-500'>*</span>
            </label>
            <input
              type="text"
              id="category"
              defaultValue={challenge?.category}
              placeholder="Category"
              {...register('category')}
              className="bg-white w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-main focus:ring-main"
            />
            {errors.category && <span className='text-red-500'>{errors.category?.message}</span>}

          </div>
          <div className="space-y-1">
            <label htmlFor="level" className="block text-sm font-medium text-gray-700">
              Level <span className='text-red-500'>*</span>
            </label>
            <select
              id="level"
              defaultValue={challenge?.level}
              {...register('level')}
              className="w-full p-2 bg-white border-gray-300 rounded-md shadow-sm focus:border-main focus:ring-blue-500"
            >
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Hard">Hard</option>
            </select>
            {errors.level && <span className='text-red-500'>{errors.level?.message}</span>}
          </div>
          <div className="space-y-1 overflow-scroll">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description <span className='text-red-500'>*</span>
            </label>
            <div className='max-h-[500px] overflow-scroll'>
              <SimpleMdeReact 
                id='description' 
                value={challengeDescription} 
                onChange={onChallengeDescriptionChange}
                onFocus={() => clearErrors('description')}
              />
            </div>
            {errors.description && <span className='text-red-500'>{errors.description?.message}</span>}
          </div>
        </div>


        <div className="md:col-span-1">
          <div className="space-y-1">
            <label htmlFor="function_name" className="block text-sm font-medium text-gray-700">
              Function name <span className='text-red-500'>*</span>
            </label>
            <input
              type="text"
              id="function_name"
              placeholder="Function name"
              value={functionName}
              className="bg-white w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-main focus:ring-main"
              onChange={(e) => setFunctionName(e.target.value)}
            />
            {errors.function_name && <span className='text-red-500'>{errors.function_name?.message}</span>}
          </div>

          <div >
              
              <div className='flex justify-between items-center'>
                <label htmlFor="code_text" className="block text-sm font-medium text-gray-700">
                  Code <span className='text-red-500'>*</span>
                </label>
                <div className='flex gap-2'>
                  <LanguageMenu />
                  <FontSizeMenu />
                </div>
              </div>
              <div className='my-2 border border-gray-300 max-h-[300px] overflow-scroll'>
                <CodeMirror 
                  value={code}
                  extensions={language == 'py' ? [python()] : [javascript()]}
                  className='min-h-[150px]'
                  onChange={(value: string) => setCode(value)}
                  onFocus={() => clearErrors('code')}
                  style={{fontSize: `${fontSize}px`, height: '100%'}}
                />
              {errors.code && <span className='text-red-500'>{errors.code?.message?.toString()}</span>}
              </div>
          </div>
          <div className='min-h[300px] overflow-scroll'>
            <div className='flex justify-between'>
              <div>Tests <span className='text-red-500'>*</span></div>
              <div 
                className='flex items-center justify-center bg-violet-600 text-white rounded p-2 cursor-pointer'
                onClick={() => onAddTestCase()}
                
              ><FaPlus /></div>
            </div>
            <div>
              <div className='flex flex-col gap-2 '>
                {tests.map((test, idx) => {
                  return <TestCase key={idx} onRemoveTest={() => {onRemoveTest(idx)}} onUpdateTest={onUpdateTest(idx)} />
                })}
              </div>
              {errors.tests && <span className='text-red-500'>{errors.tests?.message?.toString()}</span>}

            </div>
          </div>
          <CreateChallengeButton 
            className='ml-auto absolute top-1 right-0' 
            type='submit'
            isEdit={isEdit}
          />
        </div>
      </form>
    </div>
  );
};


function TestCase({onRemoveTest, onUpdateTest}: {onRemoveTest: () => void, onUpdateTest: (test: ITestCase) => void}) {
  const [testCase, setTestCase] = useState<ITestCase>({
    name: 'a',
    value: 10,
    type: 'number',
    output: 10,
    weight: 0.8
  })
  return <div className='w-full flex items-center gap-2 border border-gray-400 p-2 shadow-sm'>
      <div
        onClick={onRemoveTest}
        className='flex items-center justify-center bg-red-400 text-white rounded p-2 cursor-pointer'
      >
        <CiTrash />
      </div>
      <div className='grid grid-cols-4 gap-2 p-2'>
      <div className='col-span-2 grid grid-cols-2 border border-gray-200 p-2'>
        <div className="space-y-1">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  id="type"
                  value={testCase.type}
                  className="w-full p-2 bg-white border-gray-300 rounded-md shadow-sm focus:border-main focus:ring-blue-500"
                  onChange={e => {
                    setTestCase({
                      ...testCase,
                      type: e.target.value
                    })
                    onUpdateTest(testCase)
                  }}
                >
                  <option value="number">number</option>
                  <option value="string">string</option>
                </select>
        </div>
        <div className="space-y-1 col-span-1 border border-gray-200 p-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={testCase.name}
                className="bg-white w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-main focus:ring-main"
                onChange={e => {
                  setTestCase({
                    ...testCase,
                    name: e.target.value
                  })
                  onUpdateTest(testCase)

                }}
              />
      </div>
        <div className="space-y-1">
                <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                  Value
                </label>
                <input
                  type={testCase.type == 'number' ? 'number' : 'text'}
                  id="value"
                  value={testCase.value}
                  className="bg-white w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-main focus:ring-main"
                  onChange={e => {
                    setTestCase({
                      ...testCase,
                      value: e.target.value
                    })
                    onUpdateTest(testCase)

                  }}
              />
        </div>
      </div>
      <div className="space-y-1 col-span-1 border border-gray-200 p-2">
              <label htmlFor="output" className="block text-sm font-medium text-gray-700">
                Output
              </label>
              <input
                type="number"
                id="output"
                value={testCase.output}
                className="bg-white w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-main focus:ring-main"
                onChange={e => {
                  setTestCase({
                    ...testCase,
                    output: e.target.value
                  })
                  onUpdateTest(testCase)

                }}
              />
      </div>
      <div className="space-y-1 col-span-1 border border-gray-200 p-2">
              <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                Weight
              </label>
              <input
                type="number"
                id="weight"
                value={testCase.weight}
                className="bg-white w-full p-2 border-gray-300 rounded-md shadow-sm focus:border-main focus:ring-main"
                onChange={e => {
                  setTestCase({
                    ...testCase,
                    weight: parseFloat(e.target.value)
                  })
                  onUpdateTest(testCase)
                }}
              />
      </div>
    </div>
  </div>
}

export default ChallengeForm;
