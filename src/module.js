/**
 *  Bootstrapping module
 *  App 入口程序
 */
import React from 'react';
import ReactDom from 'react-dom';

import Routes from 'routes';

ReactDom.render(<Routes />,
                document.getElementById('react-root'));