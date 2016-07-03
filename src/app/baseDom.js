import React from 'react';
import { Provider } from 'react-redux';

import store from 'control';


export class BaseDom extends React.Component {
    render() {
        return (
            <Provider store={store}>
                {this.props.children}
            </Provider>
        );
    }
}

export default BaseDom;