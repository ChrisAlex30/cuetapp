import React, { useEffect, useState } from 'react';

const QuestionEng = ({ questionobj, questionselected,setquestions,setquestionselected,backbtndisable,nextbtndisable,handlescorecard,questions }) => {

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  

  useEffect(() => {
   
    if (questionobj && questionobj.checkedOptionIndex!=null) {
      console.log(questionobj.checkedOptionIndex);
      setSelectedOptionIndex(questionobj.checkedOptionIndex);
    } else {
      setSelectedOptionIndex(null);
    }
  }, [questionobj]);

  let questionsbutton=[
    {
      buttonname:"SAVE & NEXT",
      color:"bg-green-800",
      disable:false
    },
    {
      buttonname:"SAVE & MARK FOR REVIEW",
      color:"bg-yellow-600",
      disable:false
    },
    {
      buttonname:"CLEAR RESPONSE",
      color:"bg-blue-800",
      disable:false
    },
    {
      buttonname:"BACK",
      color:"bg-blue-600",
      disable:backbtndisable
    },
    {
      buttonname:"NEXT",
      color:"bg-blue-600",
      disable:nextbtndisable
    }
  ]

  const handleOptionChange = (optionIndex,selectedOptionIndex) => {

    setSelectedOptionIndex(optionIndex);
  };

 

  const handlesubmit = (name) => {
    let check=false;
    if(name==='SAVE & NEXT' || name==='SAVE & MARK FOR REVIEW')
    {
    if (selectedOptionIndex===null)
    {
      alert('Please Mark the Option')
      check=true
    }
    }

    if(name && !check){
      let newStatus = '';
    
      switch (name) {
        case 'SAVE & NEXT':
          newStatus = 'Answered';
          break;
        case 'SAVE & MARK FOR REVIEW':
          newStatus = 'MarkedForReviewAndNext';
          break;
        case 'CLEAR RESPONSE':
          newStatus='NotAnswered'
          break;
          case 'NEXT':
          setquestionselected(questionselected+1)
          break;
          case 'BACK':
            setquestionselected(questionselected-1)
            break;
      }
    
    
      if(newStatus!=='')
      {
        const updatedQuestions=[...questions]
        if(newStatus==='NotAnswered')
          {
            updatedQuestions[questionselected]={...updatedQuestions[questionselected], status: newStatus, checkedOptionIndex: null}
            setquestions(updatedQuestions)
            setSelectedOptionIndex(null)
          
          }
         else{
          updatedQuestions[questionselected]={...updatedQuestions[questionselected], status: newStatus, checkedOptionIndex: selectedOptionIndex};

          setquestions(updatedQuestions)
       setquestionselected(questionselected+1)
         }
        // console.log('selectedOptionIndex',selectedOptionIndex);
      
      
    }
  }
   
  };
  
  
//  console.log('questionobj',questionobj);
  return (
    <>
      <div>
    <div className=' mt-3  font-bold text-black rounded-md flex md:flex-row md:justify-between flex-col-reverse'>
      <span className='text-lg'>Question No. {questionselected+1}</span>
      <div><span className='font-medium md:text-[17px] text-lg'>Marks for correct answer <span className='text-green-500'>5</span> | </span>
        <span className='font-medium md:text-[17px] text-lg'>Negative Marks <span className='text-red-600'>1</span></span></div>
     
    </div>
      <hr className='h-[2px] bg-gray-200 border-0 dark:bg-gray-700'/>
<div className="max-h-[13em] overflow-y-scroll"> 
     
<h5 className="text-[17px] font-medium" dangerouslySetInnerHTML={{ __html: `${questionobj.Header}` }} />  
</div>
    
    <div className='max-h-[10em] overflow-y-scroll'>
    <h5 className="text-[17px] mt-3 font-medium" dangerouslySetInnerHTML={{ __html: `${questionobj.Question}` }} />  
    </div>
     
      {questionobj.Option && <ol type='a' className='list list-none'> 
        {questionobj.Option.map((option, optionIndex) => (
          <li key={optionIndex} className='my-2 list-item'>
            <input
              type='radio'
              name={`question_${questionselected}`}
              value={option.optionvalue}
              checked={selectedOptionIndex === optionIndex}
              onChange={() => handleOptionChange(optionIndex,selectedOptionIndex)}
            />
            <label className='mx-1 text-[17px] font-medium' htmlFor={`option_${questionselected}_${optionIndex}`}>
              {String.fromCharCode(97 + optionIndex)}. <span dangerouslySetInnerHTML={{ __html: option.optionvalue }} />
            </label>
          </li>
        ))}
      </ol> }
    </div>
      <div>

      {questionobj.Option &&
      <div className="button-group flex md:justify-start md:flex-row flex-wrap md:mb-10 mt-10 mb-5 ">
      {questionsbutton.map((button,index) => (
            <button
            onClick={()=>handlesubmit(button.buttonname)}
              className={`btn ${button.disable?'bg-gray-700 cursor-not-allowed':`${button.color}`} text-white text-xs font-medium mr-11 mb-3 px-2 py-2 rounded`}
              disabled={button.disable}
            >
              {button.buttonname}
            </button>

            
          ))}

          <button
            onClick={()=>{if(window.confirm("Are You Sure To Submit?")){handlescorecard()}}}
              className={`btn bg-purple-600 ml-auto  text-white text-xs font-medium mb-3 px-2 py-2 rounded`}
            >
            SUBMIT
            </button>
      </div>
    }
      </div>
     
    </>
  );
};

export default QuestionEng;
