import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div>
                <h1>Working with React here</h1>
                <hr />
                <h2>This is React App</h2>
                <br />
                <hr />
            </div>

            <div>
                <h1>Welcome to CAMPUS EVENT MANAGEMENT</h1>

                <Link to="/faculty/auth">
                    <button>I'm FACULTY</button>
                </Link>
                <Link to="/student/auth">
                    <button>I'm STUDENT</button>
                </Link>
            </div>
        </>
    );
};

export default Home;
