/**
 * React Router file
 */
import React, {Component} from 'react';
import {Router, Route, IndexRoute} from 'react-router';
/* Description: https://github.com/rackt/history/blob/master/docs/GettingStarted.md */
// import createBrowserHistory from 'history/lib/createBrowserHistory';
import { createHashHistory } from 'history';
import attachFastClick from 'fastclick';

/* Import Component */
import BaseDom from 'app/baseDom';
import Detail from 'app/detail';
import List from 'app/list';
import Catalog from 'app/catalog';

import {BROWSER} from 'utils/helper';
import $ from 'jquery';

/* Import Stylesheets */
import 'static/main.scss';




let history = new createHashHistory();

export default class Routes extends Component {
    
    componentDidMount() {
        // Click 事件在移动端无延迟触发
        attachFastClick.attach(document.body);
        // 注册 css :active 伪类事件
        document.body.addEventListener('touchstart', function () { });

        if(BROWSER.isAndorid) $('body').addClass('android')
    }

    render() {
        return (
            <Router history={history}>
                <Route path='/' component={BaseDom} >
                    <IndexRoute component={Detail} />
                    <Route path='/list' component={List} />
                    <Route path='/catalog' component={Catalog} />
                </Route>
            </Router>
        );
    }
}
export default Routes;