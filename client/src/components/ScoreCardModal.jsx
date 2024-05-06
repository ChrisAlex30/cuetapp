import React from 'react'


const ScoreCardModal=({scorecardref,scorecard})=>{
 
    return(
      
      <dialog ref={scorecardref} className='w-fit md:w-[35%] h-fit rounded-xl shadow-lg bg-slate-100'>
       
        <div className='DetailsModal h-fit py-6 px-8 border border-1 border-gray-400 DetailsModal'>
                  
        <div className='DetailsModaldiv px-4'> 
        <h1 className='text-xl underline underline-offset-2 font-bold text-center p-3'>Score Card Details</h1>

        {/* <a href="/upload-files/1-15 (1) (1) (1).pdf" download="">Download</a> */}

        <div className="mt-5  flex justify-start flex-col">
           <div className="input-organisation w-full flex justify-between mb-3">
           <span className='text-blue-600 text-lg font-medium'>Total Questions:</span>
           <span className=' text-lg font-medium'>{scorecard.totalQuestions}</span>
            </div>
          

            <div className="input-staff w-full flex justify-between mb-3">
            <span className='text-blue-600 text-lg font-medium'>Questions Attempted:</span>
           <span className='text-lg font-medium'>{scorecard.questionsAttempted}</span>
            </div>
              <div className="input-applicantname w-full flex justify-between mb-3">
              <span className='text-blue-600 text-lg font-medium'>Questions Correct:</span>
           <span  className='text-lg font-medium'>{scorecard.questionsCompleted}</span>
            </div>
            <div className="input-mobileno w-full flex justify-between mb-3">
            <span className='text-blue-600 text-lg font-medium'>Questions Wrong:</span>
           <span  className='text-lg font-medium'>{scorecard.questionsWrong}</span>
            </div>

            <hr className='h-0.5 bg-gray-500'/>
            <div className="input-mobileno w-full flex justify-between ">
            <span className='text-green-800 text-lg font-medium'>Total Marks:</span>
           <span  className='text-lg font-medium'>{scorecard.totalmarks}</span>
            </div>
            <hr className='h-0.5 bg-gray-500'/>
            <div className='flex justify-center'>
                <button className='bg-green-700 hover:bg-green-800 mt-7 text-white text-md rounded px-5 py-2' onClick={()=>{window.open('https://cuetugexam.in/cuet-exam-mock-test-papers')}}>Done</button>
            </div>
          </div>  
     </div>
    </div>
        
      </dialog>
      
    )
            
  }


  export default ScoreCardModal