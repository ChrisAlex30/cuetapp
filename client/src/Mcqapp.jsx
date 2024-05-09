import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';
import Questions from './Questions'
import Detaildiv from './Detaildiv'
import Navbar from './Navbar'
import Questionpaging from './Questionpaging'
import Loadingdialog from './components/Loading'
import ScoreCardModal from './components/ScoreCardModal'
import QuestionEng from './QuestionEng'
import {useParams } from 'react-router-dom';



const Mcqapp = () => {

  const [questions,setquestions]=useState([])
  const [questionobj,setquestionobj]=useState({})
  const [questionselected,setquestionselected]=useState(0)
  const [backbtndisable,setbackbtndisable]=useState(false)
  const [nextbtndisable,setnextbtndisable]=useState(false)
  const [scorecard,setscorecard]=useState({
    totalQuestions:0,
    questionsAttempted:0,
    questionsCompleted:0,
    questionsWrong:0,
    totalmarks:0
  })
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(1800); 
 
  const timerRef = useRef(null);
  const getdataCalledRef = useRef(false);

  const [load, setload] = useState(false);
  const scorecardref=useRef()
  let {subject,paper}=useParams()
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(timeLeft);
    if (!getdataCalledRef.current) {
      getdataCalledRef.current = true;
      getdata();
    }
    clearInterval(timer)
  }, []);
  
 
  // useEffect(() => {
  //   if (timeLeft === 0) {
  //     clearInterval(timer);
  //     handlescorecard();
  //   }
  // }, [timeLeft, timer]);

  const getdata=async()=>{
    
    if(!subject || !paper)
      {
        setTimeLeft(0);
        return alert('Plz try Again!')
      }
     
      setload(true)
      const response=await fetch(`/api/cuet/${subject}/${paper}`,{
        method:"GET"
      });
      
        const data=await response.json()
        // const papers = data.msg.Papers;
        // console.log(papers);
        
          // const paperValues = Object.values(papers);
        // console.log(paperValues[0].questions);

        setload(false)

      
      if(data.msg.length===0)
        {
          setTimeLeft(0)
          return navigate('/error')
        }

        if(data.msg.length>0)
          {
            const papers = data.msg[0].Papers;
            const paperValues = Object.values(papers)[0].questions
            // console.log('paperValues',paperValues);
            if(!paperValues || paperValues.length==0)
              {
              setTimeLeft(0)
               return navigate('/error')
              }
              setquestions(paperValues)
              setquestionobj(paperValues[0]);
          }  

  }
 

  // useEffect(()=>{
  //   if (questionselected===0)setbackbtndisable(true)
  //   else
  //   setbackbtndisable(false)
   
  //   if((questionselected===(questions.length-1)))
  //   setnextbtndisable(true)
  //  else
  //  setnextbtndisable(false)
  // },[questionselected])

   useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        if (prevTimeLeft > 0) {
          return prevTimeLeft - 1;
        } else {
          clearInterval(timerRef.current); 
          if(questions.length!=0)
          handlescorecard(); // Handle scorecard when time reaches 0
          return 0;
        }
      });
    }, 1000);

    
    return () => {
      clearInterval(timerRef.current); // Clear previous interval
    };
  }, [timeLeft]);


  useEffect(()=>{
    if (questionselected===0)setbackbtndisable(true)
    else
    setbackbtndisable(false)
   
    if((questionselected===(questions.length-1)))
    setnextbtndisable(true)
   else
   setnextbtndisable(false)
      const updatedQuestions= questions.map((ele,index)=>{
        
        if (index === questionselected && ele.status=="notdone") {
          return { ...ele, status: 'NotAnswered' };
        } 
        else {
          return ele;
        }
      })
      
      setquestions(updatedQuestions)
      setquestionobj(questions[questionselected])
  
  },[questionselected,questionobj])



  const handleQuestionSelected=(index)=>{
    setquestionselected(index)
  }

  const handlestatus = (name) => {
    // console.log('questions',questions);
    let newStatus = '';
    // Determine the new status based on the button name
    switch (name) {
      case 'SAVE & NEXT':
        newStatus = 'Answered';
        break;
      case 'SAVE & MARK FOR REVIEW':
        newStatus = 'MarkedForReview';
        break;
      case 'MARK FOR REVIEW & NEXT':
        newStatus = 'MarkedForReviewAndNext';
        break;
      default:
        newStatus = ''; // Set default status here
        break;
    }
    // console.log('questionselected',questionselected);
    setquestions((prevQuestions) =>
      prevQuestions.map((question, index) =>
        index === questionselected ? { ...question, status: newStatus } : question
      )
    );
   
  };

  const handlescorecard=()=>{
    let totalQuestions = questions.length;
    let questionsAttempted = 0;
    let questionsCompleted = 0;
    let questionsWrong = 0;
    let totalmarks=0;
    // console.log(questions);

    questions.forEach((question) => {
      ;
      // Check if the question has been attempted (i.e., the checkedOptionIndex is not null)
      if (question.status == "Answered" || question.status == "MarkedForReviewAndNext") {
       
        questionsAttempted++;
        // Check if the selected option index is correct
        if (question.checkedOptionIndex===question.correctOptionIndex) {
          questionsCompleted++;
        } else {
          questionsWrong++;
        }
      }
    });

    totalmarks=(questionsCompleted*5)-questionsWrong;
    

    setscorecard({
      totalQuestions: totalQuestions,
      questionsAttempted: questionsAttempted,
      questionsCompleted: questionsCompleted,
      questionsWrong: questionsWrong,
      totalmarks:totalmarks
    });

    scorecardref.current.showModal()
    setTimeLeft(0)
  }

  return (
    <>
    <Loadingdialog  isloading={load}/>
    <ScoreCardModal scorecardref={scorecardref} scorecard={scorecard}/>
    <Navbar timeLeft={timeLeft}/>
    <div className="mainsection w-full md:flex md:flex-row md:justify-between flex flex-col height-cal">
    <div className="questiondiv md:p-0 p-2 flex flex-col justify-between md:mx-4 md:w-[344%]">
      {subject!=="eng"?(questionobj!=undefined && <Questions questionobj={questionobj} questionselected={questionselected} handlestatus={handlestatus} questions={questions} setquestions={setquestions} setquestionselected={setquestionselected} backbtndisable={backbtndisable} nextbtndisable={nextbtndisable} handlescorecard={handlescorecard}/>):
      
      (questionobj!=undefined && <QuestionEng questionobj={questionobj} questionselected={questionselected} handlestatus={handlestatus} questions={questions} setquestions={setquestions} setquestionselected={setquestionselected} backbtndisable={backbtndisable} nextbtndisable={nextbtndisable} handlescorecard={handlescorecard}/>)}
 
  </div>

  <div className="rounded mx-1 py-3 px-5 bg-slate-200 md:w-full">
    
  <div className="detailsdiv flex flex-col gap-4 justify-start">
      <Detaildiv questions={questions}/>
      <Questionpaging question={questions} handleQuestionSelected={handleQuestionSelected}/>
    </div>
   
 
  </div>

</div>
    </>
 
  )
}

export default Mcqapp