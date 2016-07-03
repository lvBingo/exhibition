/**
 *  使用 Mock 数据 或 YCProblemSetPlugin 加载数据，并初始化数据创建 Store。
 */
import { createStore, applyMiddleware } from 'redux';
import Immutable, { Map, List } from 'immutable';

import serialize from 'utils/serialize';
import * as Middleware from 'store/middleware';
import exerciseApp from '_reducers/reducers';

let data, store;
let MiddlewareArr= __DEV__ ? [Middleware.logger]        // 开发模式
                           : [Middleware.crashReporter];           // 发布模式

let createStoreWithMiddleware = applyMiddleware(...MiddlewareArr)(createStore);

    store = createStoreWithMiddleware(exerciseApp);         // 初始化 Redux Store， 并且不使用任何数据，

export default store;