import { useState } from 'react';
import QuestionCard from '../components/Questions';
import { UserType } from '../types';


type HomeProps = {
    isLoggedIn:boolean,
    ccurrentUser: UserType|null,
}

export default function Home({ isLoggedIn, currentUser }: HomeProps) {

    const [question, setQuestions] = useState<Question[]>([]);
    const [newQuestion, setNewQuestion] = useState<Question>({id: 1, title: ''})

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value, event.target.name);
        setNewQuestion({...newQuestion, [event.target.name]: event.target.value})
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setQuestions([...question, newQuestion])
        setNewQuestion({id: question.length + 2, title: ''})
    }

    return (
        <>
            <h1>{ isLoggedIn ? 'Welcome back ' + currentUser!.username : 'Hello and Welcome' }</h1>
            {/* <QuestionForm handleChange={handleInputChange} newQuestion={newQuestion} handleFormSubmit={handleFormSubmit} /> */}
            { question.map( p =>  <QuestionCard question={p} key={p.id} /> ) }
        </>
    )
}
