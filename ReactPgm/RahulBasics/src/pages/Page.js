import { Routes,Route } from 'react-router-dom';
import LearnPage from './LearnPage.js';
import BlogPage from './BlogPage.js';
import CommunityPage from './CommunityPage.js';
import ReferencePage from './ReferencePage.js';
import NotFoundPage from './NotFoundPage.js';

import Body from '../components/Body.js';

export default function Page(){
    return(
        <>
        {/* <h2>Pagesssssss</h2> */}
        <Routes>
        <Route path="/" element={<Body/>}/>

            <Route path="/learn" element={<LearnPage/>}/>
            <Route path="/blog" element={<BlogPage/>}/>
            <Route path="/community" element={<CommunityPage/>}/>
            <Route path="/reference" element={<ReferencePage/>}/>
            <Route path="/*" element={<NotFoundPage/>}/>
        </Routes>
        </>
    )
}