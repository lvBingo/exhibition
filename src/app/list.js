import React from 'react';

import title_0 from 'static/img/title_0.png';
import title_1 from 'static/img/title_1.png';
import title_2 from 'static/img/title_2.png';
import title_3 from 'static/img/title_3.png';
import title_4 from 'static/img/title_4.png';

import imgTop from 'static/img/bg_top.jpg';
import imgBottom from 'static/img/bg_bottom.jpg';


export class TestApp extends React.Component {
    componentDidMount(){
        
    }
    render() {
        let html='<p>距今约5000年前,海淀就有人类活动。从战 国、汉代开始,海淀得到逐步开发。辽金以后, 皇家行宫、园林、寺庙、墓冢依山水而聚,其分 布之密集,为京郊之冠。至清代,园林建设达于 鼎盛。其中,“三山五园”既是皇家园林胜地,也 是清廷政治文化中心。</p>';
        return (
            <div className='list-page container'>
                <div className='header-img'>
                    <img src={imgTop} />
                </div>
                <div className='footer-img'>
                    <img src={imgBottom} />
                </div>
                <div className='layer'>
                    <div className='title-container'>
                        <img src={title_1}/>
                    </div>
                    <div className='article'>
                        <i className='symbol'></i>
                        <i dangerouslySetInnerHTML={{__html: html}}></i>
                    </div>
                    <div className='cutline'>文明启蒙</div>
                    <ul className='chapter-index'>
                        <li><a>重点展点名称</a></li>
                        <li><a>重点展点名称</a></li>
                        <li><a>重点展点名称</a></li>
                        <li><a>重点展点名称</a></li>
                    </ul>
                    <div className='cutline'>文明启蒙</div>
                    <ul className='chapter-index'>
                        <li><a>重点展点名称</a></li>
                        <li><a>重点展点名称</a></li>
                        <li><a>重点展点名称</a></li>
                        <li><a>重点展点名称</a></li>
                    </ul>
                    <div className='cutline'>文明启蒙</div>
                    <ul className='chapter-index'>
                        <li><a>重点展点名称</a></li>
                        <li><a>重点展点名称</a></li>
                        <li><a>重点展点名称</a></li>
                        <li><a>重点展点名称</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}


export default TestApp;