import PostSelector from './PostSelector';
import QuestionForm from './QuestionForm';
import ArticleForm from './ArticleForm';
import Header from './Header'
import { useState } from 'react';

function App() {
    const [isQuestion, setQuestion] = useState(true);

    return (
        <>
            <Header content="New Post" />

            <PostSelector setState={setQuestion}/>

            <Header content="What do you want to ask/share?" />

            {isQuestion ? (<QuestionForm />) : (<ArticleForm />)}
        </>
    );
}

export default App;