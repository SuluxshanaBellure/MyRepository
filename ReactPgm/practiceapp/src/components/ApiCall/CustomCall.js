import React from 'react';

const CustomCall = () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
    const [postData, setPostData] = React.useState([]);
    const [newPost, setNewPost] = React.useState([
        {
            userId: 10,
            id: 105,
            title: 'at nam consequatur ea labore ea harum',
            body: 'cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut'
        },
        {
            userId: 10,
            id: 107,
            title: 'at nam consequatur ea labore ea harum',
            body: 'cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut'
        },
        {
            userId: 10,
            id: 109,
            title: 'at nam consequatur ea labore ea harum',
            body: 'cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut'
        },
    ]);

    const fetchApiData = async (url) => {
        try {
            const res = await fetch(url);
            const data = await res.json();
            setPostData([...data, ...newPost]); 
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        fetchApiData(apiUrl);
    }, []);

    return (
        <>
            <h2>All Posts</h2>
            <ul>
                {postData.map(post => (
                    <li key={post.id}>
                        {post.id}-{post.title}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default CustomCall;
