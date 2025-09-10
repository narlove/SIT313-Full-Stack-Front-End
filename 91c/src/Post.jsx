import React from "react";
import PostHeader from "./PostHeader";
import PostSelector from './PostSelector';
import ArticleForm from './ArticleForm';
import QuestionForm from './QuestionForm';
import { useState } from "react";
import { usePersistence } from "./PersistenceContext";

export default function Post() {
    const [isQuestion, setQuestion] = useState(true);
    const persistence = usePersistence();

    return (
        <>
            <PostHeader content="New Post" />

            <PostSelector setState={setQuestion} />

            <PostHeader content="What do you want to ask/share?" />

            {isQuestion ? (<QuestionForm />) : (<ArticleForm />)}
        </>
    );
}