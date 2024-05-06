import React, { useEffect } from 'react'

const Questionpaging = ({question,handleQuestionSelected}) => {

    useEffect(()=>{
        getButtonColor()
    },[question])

    const getButtonColor = (ele,status) => {
        // console.log(ele);
        // console.log(status);
        switch (status) {
            case 'Answered':
                return 'bg-green-600 text-white';
          case 'notdone':
            return 'bg-gray-200 text-black';
          case 'NotAnswered':
            return 'bg-blue-800 text-white';
            case 'MarkedForReview':
            return 'bg-red-800 text-white';
            case 'MarkedForReviewAndNext':
                return 'bg-yellow-500 text-white';
                default:
                    return 'bg-purple-600 text-black';
        }
      };

    return (
      <div className="pagination rounded-md overflow-scroll bg-white flex flex-row flex-wrap  md:p-2 gap-1 py-3 px-2 justify-center">
      {question.map((ele, index) => (
        <button
          key={index}
          className={`rounded-lg mr-1 border  border-black p-2 ${getButtonColor(ele,ele.status)} text-center font-bold w-10 h-10 `}
          onClick={() => handleQuestionSelected(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
      );
    };

export default Questionpaging