// Higher Order Component (HOC) - A component (HOC) that renders another component
// Reuse code
// Renedr hijacking
// Prop manipulation
// Abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>Yhe info is:{props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>            
            {props.isAdmin && <p>This is private info. Please don't share!</p>}
            <WrappedComponent {...props} />
        </div>
    );
};

const requireAuthentification = (WrappedComponent) => {
    return (props) => (
        <div>            
            {props.isAthenticated ? <WrappedComponent {...props} /> : <p>You are not authenticated, please authenticate </p> }
        </div>
    );
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentification(Info);

ReactDOM.render(<AdminInfo isAdmin={false} info="This is the detail" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAthenticated={true} info="These are the details" />, document.getElementById('app'));