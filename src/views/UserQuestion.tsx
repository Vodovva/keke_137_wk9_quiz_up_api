import {useState, useEffect} from 'react'
import {getMyQuestions} from '../lib/apiWrapper'
import Question from '../components/Questions'



type UserQuestionsProps = {}

export default function UserQuestions({ }: Props) {
    const [questions, setQuestions] = useState([])

    useEffect( () => {
        async function fetchData(){
            const response = await getMyQuestions();
            console.log(response);
            if (response.data){
                let questions = response.data;
                setQuestions(questions)
            }
        }

        fetchData();
    }, [] )

    return (
        <div>{questions.map(q => <Question key={q.id} question = {q} />)}</div>
    )
}