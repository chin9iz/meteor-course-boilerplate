import React from 'react';
// import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';

export default () => {
    return (
        <div>
            <PrivateHeader title='Dashboard'/>
            <div className='page--content'>
                Dashboard page content
            </div>
        </div>
    );
};