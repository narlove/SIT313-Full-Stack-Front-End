import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Header from './Header';
import Banner from './Banner';
import CardCollection from './CardCollection';
import MyButton from './MyButton';
import MyHeaderTwo from './MyHeaderTwo';
import Insider from './Insider';
import Footer from './Footer'

const featuredArticles = [
    {
        title: "How to perform a demonstration",
        desc: "If you look at the next card, you'll realise the values are all generic. 'hah, cool' you might think. He's just manually set those values. Nothing special there. WRONG. I have default values so that if they're not entered using props, there's at least something nice there to look at and we don't have to worry about ugly 'undefined' messages.",
        starRating: "2.3",
        author: "narlove",
        imageSource: "https://picsum.photos/seed/cooldemo/700"
    },
    {
        title: "An example article",
        desc: "This article talks about the problems surrounding generative AI. Readers with a background in Machine Learning with at minimum high school experience will benefit from this read.",
        starRating: "1.3",
        author: "narlove",
        imageSource: "https://picsum.photos/seed/badarticle/700"
    },
    {
        title: null,
        desc: null,
        starRating: null,
        author: null,
        imageSource: null
    }
];

const featuredTutorials = [
    {
        title: "An example tutorial",
        desc: "This tutorial covers ReactJs. It expects you to be proficient in JavaScript, TypeScript and Node.JS.",
        starRating: "4.3",
        author: "narlove",
        imageSource: "https://picsum.photos/seed/tutorial/700"
    },
    {
        title: null,
        desc: null,
        starRating: null,
        author: null,
        imageSource: null
    },
    {
        title: null,
        desc: null,
        starRating: null,
        author: null,
        imageSource: null
    }
];

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Header />

        <Banner />

        <MyHeaderTwo title="Featured Articles" />
        <CardCollection collection={featuredArticles} />
        <MyButton section="Articles" />

        <MyHeaderTwo title="Featured Tutorials" />
        <CardCollection collection={featuredTutorials} />
        <MyButton section="Tutorials" />

        <Insider />

        <Footer />

    </StrictMode>
);
