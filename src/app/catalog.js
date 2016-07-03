import React from 'react';

import title_0 from 'static/img/title_0.png';
import title_1 from 'static/img/title_1.png';
import title_2 from 'static/img/title_2.png';
import title_3 from 'static/img/title_3.png';
import title_4 from 'static/img/title_4.png';

import imgTop from 'static/img/bg_top.jpg';
import imgBottom from 'static/img/bg_bottom.jpg';

// 首先我们需要导入一些组件...
import { Router, Route, Link } from 'react-router'


export class Catalog extends React.Component {
    componentDidMount(){
        
    }
    render() {
        let html='<p>海淀地处京城西北,紧邻太行余脉,山环水映,湖泉丰沛。在古都北京五十万年的人类居住史、三千余年的建城史、八百余年的建都史中,海淀形成了独具风貌的山水文化、底蕴丰厚的人文历史和勇于探索、改革创新的精神特质。</p><p>《海淀通史展》展示从新石器时代以来海淀的山川水系、聚落城址、寺庙文化、园林名胜;近现代以来反帝反封建、争取民族独立的斗争;建设新中国和探索中国特色社会主义建设道路的历程,特别是在经济文化、科技教育等方面所取得的非凡成就和海淀人民对美好未来的憧憬。</p>';
        return (
            <div className='catalog-page container'>
                <div className='header-img'>
                    <img src={imgTop} />
                </div>
                <div className='footer-img'>
                    <img src={imgBottom} />
                </div>
                <div className='layer'>
                    <div className='title-container'>
                        <img src={title_0}/>
                    </div>
                    <div className='article'>
                        <i className='symbol'></i>
                        <i dangerouslySetInnerHTML={{__html: html}}></i>
                    </div>
                    <div className='cutline'>站点搜索</div>
                    <div className='search-container'>
                        <label><input type='text' placeholder='搜索展点'/></label>
                    </div>
                    <div className='cutline'>章节索引</div>
                    <div className='cutline search'>搜索结果</div>
                    <ul className='chapter-index'>
                        <li><img src={title_1}/></li>
                        <li><img src={title_2}/></li>
                        <li><img src={title_3}/></li>
                        <li><img src={title_4}/></li>
                    </ul>
                    <div className='copy-right'></div>
                </div>
            </div>
        );
    }
}


export default Catalog;