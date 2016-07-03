import Immutable, { Map, List } from 'immutable';

import {TYPES} from 'actions/exercise';
import {exerciseTypes, exerciseFieldName} from 'utils/enum';
import serialize from 'utils/serialize';


// enum
let str = exerciseFieldName;

/**
 *  操作 exercise 数据集的 Reducer
 *  @author James lv
 *  @creatdate 2015-12-23T17:05:09+0800
 */
function exercise(state=Immutable.fromJS({}), action) {
    let newState, prevContent, regex, problemSetId, $$currentLevel, levelData;
    switch (action.type) {
        case TYPES.ADD_EXERCISE_DATA:       // 添加答案数据
            newState = Immutable.fromJS(
                        serialize.exercise(action.data))
                                .setIn([str.UI, str.isShowImgSymbol],
                                        action.contextData.showImgSymbol)
                                .setIn([str.topicInfo, str.topicType],
                                        action.contextData.topicType);
            if(action.contextData.rewardRules)
                newState = newState.setIn([str.topicInfo, str.rewardRules],
                                            Immutable.fromJS(action.contextData.rewardRules));
            if(action.contextData.topicState){
                newState = newState.setIn([str.topicInfo, str.finishState],
                                            action.contextData.topicState.state);
                if(action.contextData.topicState.levels)
                    newState = newState.setIn([str.topicInfo, str.levels],
                                                Immutable.fromJS(action.contextData.topicState.levels));
            }
            return newState;

        case TYPES.SHOW_KEYBOARD:           // 显示键盘
            newState = state.setIn([str.UI, str.showKeyboard],
                                            action.isShow);
            return newState;

        case TYPES.CHANGE_CURRENT_LEVEL:           // 根据后端记录的层状态恢复层数据
            let $$levels = state.get(str.levels);
            let $$backendLevelsState = state.getIn([str.topicInfo, str.levels]);
            newState = state;       // default value
            $$levels.forEach(function(item, index){
                let tryTimes = $$backendLevelsState.get(item.get(str.id));
                if(!tryTimes){
                    newState = state.setIn([str.UI, str.currentLevel], index);
                    return false;
                }
            })

            if(newState.getIn([str.UI, str.currentLevel]) !== 0)
                newState = updateLevelData(newState);
            
            return newState;

        case TYPES.ENABLE_SUBMIT_BTN:        // 启用提交按钮
            newState = state.setIn([str.UI, str.enableSubmitBtn],
                                            action.isEnable);
            return newState;
        case TYPES.SHOW_EXPLAIN:             // 显示解析
            newState = state.setIn([str.UI, str.showExplain],
                                            true);
            return newState;
        case TYPES.CHANGE_DRAFT_DISPLAY:               // 显示或隐藏草稿本
            newState = state.setIn([str.UI, str.showDraft],
                                            action.isShow);
            return newState;
        case TYPES.NEW_BLANK_CONTENT:           // 追加新的填空题内容
            prevContent = state.getIn([str.common, str.blankContent]);
            newState = state.updateIn([str.common, str.blankContent],
                                                        () => (prevContent + action.newField));
            return newState;
        case TYPES.DELETE_BLANK_CONTENT:           // 删除一段填空题内容
            prevContent = state.getIn([str.common, str.blankContent])//.replace('\\','\\\\');
            regex = new RegExp(action.deleted.replace('\\','\\\\')
                                                .replace(/\$/g,'\\$')
                                                .replace('+','\\+')
                                                .replace('.','\\.')
                                                +'$');   
                    // 把单转义符换成双转义符，把 $ 换为转义后的 $ 符，等等，强制以此正则表达式结尾
            // console.log('regex   '+regex);
            // console.log('prevContent  '+prevContent);
            newState = state.updateIn([str.common, str.blankContent],
                                                        () => (prevContent.replace(regex,'')));
            return newState;
        case TYPES.SUBMIT_ANSWER:           // 提交答案
            newState = state.setIn([str.UI, str.isRight],
                                            action.isRight)
                            .setIn([str.UI, str.isSubmit], true);
            let isHanger = state.getIn([str.currentLevelInfo, str.pool]) == 'hanger';       // 是否是钩子题
            if(action.isRight){
                newState = newState.updateIn([str.UI, str.currentLevel], (val) => ++val);
            }else{

                newState = newState.updateIn([str.UI, str.bloodCount], (val) => isHanger && val === 2? 0          // 如果是钩子题，就只有1次做题机会
                                                                                : (val===0 ? 0 : --val)
                                            );
            }

            if(action.isRight || 
                    (!isRight && !newState.getIn([str.UI, str.bloodCount]))
                ) {
                newState = newState.setIn([
                                                str.common, 
                                                str.levels,
                                                newState.getIn([str.currentLevelInfo, str.id])      // set current level id
                                            ],
                                            3 - newState.getIn([str.UI, str.bloodCount])  // tryTimes
                                    )
            }
            return newState;
        case TYPES.NEXT_QUESTION:       // 添加答案数据
            let isRight = state.getIn([str.UI,str.isRight]);
            if (!state.getIn([str.UI, str.bloodCount])      // 在血量为零时，并在调试状态下，不进行做题状态的更新
                && !__DEV__
                ) return state;


            if(isRight) {                                         // 正确
                newState = updateLevelData(state);
            }
            else                                                // 错误
                newState = state.update(str.seq, 
                                            (val) => {
                                                    ++val; 
                                                    return val < state.get(str.currentLevelExercise).count() ?
                                                                val : 0
                                                            });             // 归零处理
            if(state.getIn([str.UI, str.type]) === exerciseTypes.exam) {  // 如果是挑战题
                problemSetId = newState.getIn([str.currentLevelExercise, 
                                                newState.get(str.seq),
                                                str.problemSetId]);
                newState = newState.setIn([str.UI, str.problemSetId], problemSetId);
            } else {                                                           // 如果是专辑题
            }
            
            // 重置UI状态
            newState = newState.setIn([str.UI, str.isRight], false)
                               .setIn([str.UI, str.isSubmit], false)
                               .setIn([str.UI, str.showExplain], false)
                               .setIn([str.UI, str.enableSubmitBtn], false)
                               .setIn([str.common, str.blankContent], '');
            return newState;
        default:
            return state;
    }
}

/**
 *  将与该层练习相关的联动数据更新
 *  @author James lv
 *  @creatdate 2016-04-15T10:56:28+0800
 *  @param     {[Immutable Map]}                 state [Exercise state]
 *  @return    {[Immutable Map]}                       [new Exercise state]
 */
let updateLevelData =function (state) {
    let $$currentLevel = state.getIn(['levels', state.getIn([str.UI,str.currentLevel])]);
    let isPractice = state.getIn([str.UI, str.type]) == exerciseTypes.practice;
    let newState = state.setIn([str.UI, str.bloodCount], isPractice ? 2 : 1)
                        .update(str.seq, (val) => 0)
                        .set(str.currentLevelExercise,              // 修改当前级别的习题
                            $$currentLevel.get('problems')
                        ).setIn([str.currentLevelInfo, str.id],
                            $$currentLevel.get(str.id)
                        ).setIn([str.currentLevelInfo, str.pool],
                            $$currentLevel.get(str.pool)
                        ).setIn([str.currentLevelInfo, str.helpTopic],
                            $$currentLevel.get(str.helpTopic)
                        );
    return newState;
}


export default exercise;