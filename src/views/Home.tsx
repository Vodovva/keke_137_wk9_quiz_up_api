import { useState } from 'react';
import QuestionCard from '../components/Questions';
import { QuestionFormDataType, UserType } from '../types';
import QuestionForm from '../components/QuestionForm'
import { createQuestion } from '../lib/apiWrapper';


type HomeProps = {
    isLoggedIn:boolean,
    currentUser: UserType|null,
}

export default function Home({ isLoggedIn, currentUser }: HomeProps) {

    // const [question, setQuestions] = useState<Question[]>([]);
    const [newQuestion, setNewQuestion] = useState<QuestionFormDataType>({question: '', answer: ''})

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value, event.target.name);
        setNewQuestion({...newQuestion, [event.target.name]: event.target.value})
    }

    const handleFormSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        console.log(newQuestion)
        let token = localStorage.getItem('token') || ''
        let response = await createQuestion(token, newQuestion)
        if (response.error){
            console.log(response.error)
        }else{
            console.log(response.data)
        }
        // setQuestions([...question, newQuestion])
        // setNewQuestion({id: question.length + 2, title: ''})
    }

    return (
        <>
            <h1>{ isLoggedIn ? 'Welcome back ' + currentUser!.username : 'Hello and Welcome' }</h1>
            {isLoggedIn ? <QuestionForm handleChange={handleInputChange} newQuestion={newQuestion} handleFormSubmit={handleFormSubmit} />
            :'Please Signup To Create A Question'}
            {/* { question.map( p =>  <QuestionCard question={p} key={p.id} /> ) } */}
        </>
    )
}
