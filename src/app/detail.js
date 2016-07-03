import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import Immutable from 'immutable';
import pureRender from 'pure-render-decorator';

/* Others */
import {exerciseFieldName, exerciseTypes} from 'utils/enum';
import {BROWSER} from 'utils/helper';
/* Selector */
import { selector } from './_selectors/selectors'

import bkg from 'static/img/1237487126347.jpg';
import imgBkg from 'static/img/bg_bottom.jpg';
import imgTop from 'static/img/bg_top.jpg';

@pureRender     // Use Shallow Compare
export class Exercises extends React.Component {
    constructor(props){
        super(props);
        this.state={
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        let html = '1991年9月,北京市海淀区八里庄发现唐开 成三年(8 3 8 )幽州节度判官兼殿中侍御史 王公淑及夫人吴氏墓。墓室中北壁留存的一 幅通壁大画《牡丹芦雁图》。<br/>曹魏至五代,蓟城为北方的军事重镇,也是 北方游牧文明,与中原农耕文明交汇融合之区。<br/>海淀地处蓟城的郊外,留下了许多文明交汇 融合的物证。辽、金、元、明、清次第定都 于北京,海淀遂为畿辅之地,经济文化藉京 师地缘优势而跃升、厚积。1991年9月,北京市海淀区八里庄发现唐开 成三年(8 3 8 )幽州节度判官兼殿中侍御史 王公淑及夫人吴氏墓。墓室中北壁留存的一 幅通壁大画《牡丹芦雁图》。<br/>曹魏至五代,蓟城为北方的军事重镇,也是 北方游牧文明,与中原农耕文明交汇融合之区。<br/>海淀地处蓟城的郊外,留下了许多文明交汇 融合的物证。辽、金、元、明、清次第定都 于北京,海淀遂为畿辅之地,经济文化藉京 师地缘优势而跃升、厚积。北方游牧文明,与中原农耕文明交汇融合之区。<br/>海淀地处蓟城的郊外,留下了许多文明交汇 融合的物证。辽、金、元、明、清次第定都 于北京,海淀遂为畿辅之地,经济文化藉京 师地缘优势而跃升、厚积。';
        return (
            <div className='detail-page no-pic'>
                <div className='artwork'>
                    <img src={bkg} />
                </div>
                <div className='desc'>
                    <div className='imgTop'>
                        <img src={imgTop} />
                    </div>
                    <div className='imgBkg'>
                        <img src={imgBkg} />
                    </div>
                    <section>
                        <h1>牡丹芦雁图壁画</h1>
                        <p dangerouslySetInnerHTML={{__html: html}}></p>
                        <div className='control'>
                            <i className='show-article'>展开全文</i>
                            <i className='hidden-article'>收起全文</i>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(selector)(Exercises);