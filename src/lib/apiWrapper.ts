import axios from "axios"
import APIResponse from "../types/api"
import QuestionType from "../types/question"
import UserType from "../types/auth"


const base: string = 'https://cae-bookstore.herokuapp.com'
const questionEndpoint: string = '/question'
const userEndpoint: string = '/user'
const tokenEndpoint: string = '/token'


const apiClientNoAuth = () => axios.create(
    {
        baseURL: base
    }
)

const apiClientBasicAuth = (email:string, password:string) => axios.create(
    {
        baseURL: base,
        headers: {
            Authorization: 'Basic ' + btoa(`${email}:${password}`)
        }
    }
)

const apiClientTokenAuth = (token:string) => axios.create(
    {
        baseURL: base,
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
)


async function getAllQuestions(): Promise<APIResponse<QuestionType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get(questionEndpoint + '/all');
        data = response.data.questions
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}

async function createNewUser(newUserData:UserType): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientNoAuth().post(userEndpoint, newUserData);
        data = response.data
        console.log(response.data)
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}


async function login(email:string, password:string): Promise<APIResponse<{token:string}>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(email, password).get(tokenEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}


async function getMe(token:string): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/me')
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}

async function createQuestion(token:string, questionFormData: Partial<QuestionType>): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).post(questionEndpoint, questionFormData);
        data = response.data;
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}

async function getQuestion(questionId:string): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get(questionEndpoint + '/' + questionId);
        data = response.data;
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}


async function editQuestion(token:string, questionId:string, editedQuestionData:QuestionType): Promise<APIResponse<QuestionType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(questionEndpoint + '/' + questionId, editedQuestionData);
        data = response.data;
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}

async function deleteQuestion(token:string, quetionId:string): Promise<APIResponse<{success:string}>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(questionEndpoint + '/' + quetionId);
        data = response.data;
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {data, error}
}


export {
    getAllQuestions,
    createNewUser,
    login,
    getMe,
    createQuestion,
    getQuestion,
    editQuestion,
    deleteQuestion,
}