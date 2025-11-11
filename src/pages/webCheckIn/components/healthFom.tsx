import React, { useEffect, useState } from 'react';
import '../index.css'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSaveDeclarationMutation } from '../../../../src/services/webCheckIn/webCheckIn';
interface HealthProps {
    guestData: any,
    bookingData: any
}
export default function HealthForm({ guestData, bookingData }: HealthProps) {
    const [error, setError] = useState<any>('');
    const [termError, setTermError] = useState<any>('');
    const [loading, setLoading] = useState<any>(false);

    const [saveDeclaration] = useSaveDeclarationMutation();
    const [questions, setQuestions] = useState<any>({
        booking_id: "c98ae894-88a7-44eb-a349-26fa7d49c957",
        guest_id: "58579535-8d0f-4e53-91b2-be443a5020da",
        declaration_accepted: true,
        question_responses: [
            { question_no: 1, question: "Have you recently developed cough (dry or productive)", question_type: "boolean", answer: "No" },
            { question_no: 2, question: "Fever (or feeling feverish)", question_type: "boolean", answer: "No" },
            { question_no: 3, question: "General weakness", question_type: "boolean", answer: "No" },
            { question_no: 4, question: "Generalized muscle ache", question_type: "boolean", answer: "No" },
            { question_no: 5, question: "Sudden loss of smell and/or taste", question_type: "boolean", answer: "No" },
            { question_no: 6, question: "Any respiratory distress", question_type: "boolean", answer: "No" },
            { question_no: 7, question: "In the last 14 days before your journey, were you in contact with anyone diagnosed with COVID-19 inspection?", question_type: "boolean", answer: "No" },
            { question_no: 8, question: "In the last four hours before temperature check, have you consumed antipyretics or other analgesics?", question_type: "boolean", answer: "No" },
            { question_no: 9, question: "In the last 14 days before your journey, list the cities and countries you have visited and indicate the duration of your stay in each one;", question_type: "2d_array", answer: [{ row: 1, columns: [{ name: "Place", value: "" }, { name: "Arrival", value: "" }, { name: "Departure", value: "" }] }] },
            { question_no: 10, question: "I/we am/are not residing in any containment zone.", question_type: "boolean", answer: "Yes" },
            { question_no: 11, question: "I/we am are not under quarantine.", question_type: "boolean", answer: "Yes" },
            { question_no: 12, question: "I/we develop any of the above-mentioned symptoms I shall contact the concerned health authorities immediately.", question_type: "boolean", answer: "Yes" },
            { question_no: 13, question: "I/we have not tested COVID-19 positive in last two months.", question_type: "boolean", answer: "Yes" },
            { question_no: 14, question: "I /we are eligible to travel as per the extant norms.", question_type: "boolean", answer: "Yes" },
            { question_no: 15, question: "I/we make my mobile number/contact details available to the cruise lines whenever required by them", question_type: "boolean", answer: "Yes" },
            { question_no: 16, question: "I/we undertake to adhere to the health protocol prescribed by the destination State/UT.", question_type: "boolean", answer: "Yes" },
        ]
    });

    useEffect(() => {
        setQuestions({
            ...questions,
            guest_id: guestData?.id,
            booking_id: bookingData?.id
        })
    }, [])
    console.log(questions)

    const handleBooleanChange = (index: any, answer: any) => {
        const updatedQuestions = { ...questions };
        updatedQuestions.question_responses[index].answer = answer;
        setQuestions(updatedQuestions);
    };

    const handle2DArrayChange = (questionIndex: any, columnIndex: any, value: any) => {
        const updatedQuestions: any = { ...questions };
        updatedQuestions.question_responses[questionIndex].answer[0].columns[columnIndex].value = value;
        setQuestions(updatedQuestions);
    };

    const navigate = useNavigate();

    const submitData = async (data: any) => {
        
        const hasEmptyAnswer = questions.question_responses.some(
            (response: any) => response.answer === "" || response.answer === null
        );
        if (hasEmptyAnswer) {
            console.log('error found')
            setError('Please Select all fields')
        } else {
            console.log('error Not found')
            if (questions?.declaration_accepted === false) {
                setTermError('Please Accept not been tested COVID positive ');
            } else {
                setLoading(true)
                await saveDeclaration(questions)
                    .unwrap()
                    .then((res: any) => {
                        // setBookingData(res)
                        if (res?.status === "success") {
                            setLoading(false)
                            navigate('/checkInGuestDetail', {
                                state: {
                                    data: guestData,
                                    currentStep: 3
                                }
                            })
                        } else {
                            setLoading(false)
                            // setError(res?.message);
                        }
                    })
                    .catch((res: any) => {
                        setLoading(false)
                        console.log('Error: ', res)
                    })
            }
        }
    };

    const handleChange = (e: any) => {
        setQuestions({
            ...questions,
            declaration_accepted: e.target.checked
        })
        setTermError('');
    }
    return (
        <>
            <div className="lg:shadow-allSide lg:mx-12 lg:px-10 lg:pt-10 py-4 rounded-2xl lg:mt-12">
                <div>
                    <div>
                        <p className='font-bold lg:text-lg text-sm'>Health Declaration Form</p>
                        <p className='text-gray-100 lg:text-sm text-xs font-semibold mt-2'>
                            In the last 8 days before your journey, have you had any of the symptoms? (Please mark yes or no against each symptom)
                        </p>
                    </div>
                    <div className='mt-12 lg:mx-2'>
                        {questions.question_responses.map((question: any, index: any) => (
                            <>
                                {question.question_type === 'boolean' ? (
                                    <div className='grid grid-cols-12 lg:my-9 my-6 items-center'>
                                        <div className="lg:col-span-8 col-span-8">
                                            <div className='lg:text-sm text-xs font-semibold flex gap-2'>
                                                <p>{index + 1}.</p>
                                                <p className='text-start'>{question.question}</p>
                                            </div>
                                        </div>
                                        <div className="lg:col-span-4 col-span-4">
                                            <div className='flex flex-wrap lg:gap-4 gap-2 justify-end lg:mx-8'>
                                                <div className="flex items-center gap-2 me-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={question.answer === 'Yes'}
                                                        onChange={() => handleBooleanChange(index, 'Yes')}
                                                        className="lg:w-5 lg:h-5 w-4 h-4 text-brand-green bg-white border lg:border-2 border-black rounded focus:ring-brand-green dark:focus:ring-brand-green dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                                                    />
                                                    <label className="ms-2 lg:text-md text-xs font-bold lg:font-semibold">YES</label>
                                                </div>
                                                <div className="flex items-center gap-2 me-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={question.answer === 'No'}
                                                        onChange={() => handleBooleanChange(index, 'No')}
                                                        className="lg:w-5 lg:h-5 w-4 h-4 text-danger bg-white border lg:border-2 border-black rounded focus:ring-danger dark:focus:ring-brand-green dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                                                    />
                                                    <label className="ms-2 lg:text-md text-xs font-bold lg:font-semibold">NO</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : question.question_type === '2d_array' ? (
                                    <div className='grid grid-cols-12 gap-4 my-9'>
                                        <div className="lg:col-span-12 col-span-12">
                                            <div className='lg:text-sm text-xs font-semibold flex gap-2'>
                                                <p>{index + 1}.</p>
                                                <p className='text-start'>{question.question}</p>
                                            </div>
                                        </div>

                                        {question.answer[0]?.columns.map((column: any, columnIndex: any) => (
                                            <div className={`  lg:col-span-4 mt-4 col-span-12  `}>
                                                {column?.name === 'Arrival' || column?.name === 'Departure' ? (<input
                                                    key={columnIndex}
                                                    type="date"
                                                    name={column.name}
                                                    value={column.value}
                                                    onChange={(e) => handle2DArrayChange(index, columnIndex, e.target.value)}
                                                    placeholder={column.name}
                                                    className="w-full px-4 lg:py-6 py-4 bg-[#f8f8f8] border border-[#f8f8f8] rounded-md focus:outline-none placeholder:text-sm placeholder:font-semibold focus:ring-purple-500 mt-2"
                                                />) : (
                                                    <input
                                                        key={columnIndex}
                                                        type="text"
                                                        name={column.name}
                                                        value={column.value}
                                                        onChange={(e) => handle2DArrayChange(index, columnIndex, e.target.value)}
                                                        placeholder={column.name}
                                                        className="w-full px-4 lg:py-6 py-4 bg-[#f8f8f8] border border-[#f8f8f8] rounded-md focus:outline-none placeholder:text-sm placeholder:font-semibold focus:ring-purple-500 mt-2"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                        {/* </div> */}
                                    </div>
                                ) : null}
                            </>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex lg:items-center gap-2 lg:mx-12 lg:mt-8">
                <input id="terms-checkbox" onChange={handleChange} checked={questions?.declaration_accepted} type="checkbox" className="lg:w-5 w-4 lg:h-5 h-4 text-blue-500 bg-white border lg:border-2 border-black rounded focus:ring-none dark:focus:ring-brand-green dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer" />
                <label htmlFor="terms-checkbox" className="ms-2 text-sm font-semibold">I Agree that I have not been tested COVID positive</label>
            </div>
            <div>
                <div className='' >
                    {error ? <p className='text-danger text-sm mt-6 lg:mx-12' >*{error}</p> : null}
                    {termError ? <p className='text-danger text-sm mt-6 lg:mx-12' >{termError}</p> : null}
                </div>

            </div>
            <div className='flex justify-center mt-7'>
                <button
                    disabled={loading}
                    onClick={submitData}
                    className="bg-brand-primary w-full disabled:bg-brand-primary/40 lg:w-[27%] rounded-md text-white cursor-pointer mt-3 py-3 font-semibold px-4 flex justify-center gap-3 mx-5 text-md"
                >
                    Generate Boarding Pass  
                    {loading && 
                        <span>
                            <svg aria-hidden="true" role="status" className="inline w-6 h-6 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                        </span>
                    }
                </button>
            </div>
        </>
    );

}