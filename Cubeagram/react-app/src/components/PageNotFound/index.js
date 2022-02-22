import React from "react";
import {Link} from 'react-router-dom';
import "./PageNotFound.css"

function PageNotFound() {
    return (
        <div className="main-not-found">
            <div className="page-not-found">
                <h1 id='error-code'>404</h1>
                <h2 id='not-not-found'>{`Page Not Found :(`}</h2>
                <Link id='return-cubeagram' to='/'>Return To Cubeagram</Link>
            </div>
        </div>
    )
}

export default PageNotFound
