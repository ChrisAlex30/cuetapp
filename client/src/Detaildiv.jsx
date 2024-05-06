import React, { useEffect, useState } from 'react'

const Detaildiv = ({questions}) => {
    const [notVisitedCount, setNotVisitedCount] = useState(0);
    const [notAnsweredCount, setNotAnsweredCount] = useState(0);
    const [answeredCount, setAnsweredCount] = useState(0);
    const [markedForReviewCount, setMarkedForReviewCount] = useState(0);
    const [answeredAndMarkedForReviewCount, setAnsweredAndMarkedForReviewCount] = useState(0);
  
    useEffect(() => {

        setNotVisitedCount(0);
      setNotAnsweredCount(0);
      setAnsweredCount(0);
      setMarkedForReviewCount(0);
      setAnsweredAndMarkedForReviewCount(0);
  
      // Calculate counts based on question status
      questions.forEach(question => {
        switch (question.status) {
          case 'notdone':
            setNotVisitedCount(prevCount => prevCount + 1);
            break;
          case 'NotAnswered':
            setNotAnsweredCount(prevCount => prevCount + 1);
            break;
          case 'Answered':
            setAnsweredCount(prevCount => prevCount + 1);
            break;
          case 'MarkedForReview':
            setMarkedForReviewCount(prevCount => prevCount + 1);
            break;
          case 'MarkedForReviewAndNext':
            setAnsweredAndMarkedForReviewCount(prevCount => prevCount + 1);
            break;
          default:
            break;
        }
      });
    }, [questions]);

  return (
    <>
       <div className="firstdetailsdiv flex justify-between ">
        <div className="notvisiteddiv flex flex-row gap-1.5">
            <div className="rounded-lg border border-black text-black p-2 bg-gray-300 text-center  font-bold w-10 h-10">
            {notVisitedCount}
            </div>
            <h2 className='text-[15px] font-medium'>Not <br /> Visited</h2>  
        </div>
        <div className="notanswered text-center  flex flex-row gap-1.5 mr-2">
            <div className="rounded-lg border border-black text-white p-2  bg-blue-700 text-center font-bold w-10 h-10">
            {notAnsweredCount}
            </div>
            <h2 className='text-left text-[15px] font-medium'>Not <br /> Answered</h2>  
        </div>
    </div>

    <div className="seconddetailsdiv flex justify-between ">
        <div className="answered flex flex-row gap-1.5 items-center">
            <div className="rounded-lg border border-black text-white p-2  bg-green-600 text-center font-bold w-10 h-13">
            {answeredCount}
            </div>
            <h2 className='text-left text-[15px] font-medium'>Answered</h2>  
        </div>
        <div className="notvisiteddiv flex flex-row gap-1.5 items-center">
            <div className="rounded-lg border border-black text-white p-2  bg-red-700 text-center font-bold w-10 h-10">
            {markedForReviewCount}
            </div>
            <h2 className='text-left text-[15px] font-medium'>Marked For <br /> Review</h2>  
        </div>
    </div>
    <div className="thirddetailsdiv flex justify-between">
        <div className="answered flex flex-row gap-1.5 items-center">
            <div className="rounded-lg border border-black text-white p-2  bg-yellow-500 text-center font-bold w-14 h-13">
            {answeredAndMarkedForReviewCount}
            </div>
            <h2 className='text-left text-[15px] font-medium'>Answered & <br /> Marked for Review</h2>  
        </div>
        
    </div>
    </>
   
    
  )
}

export default Detaildiv