import Immutable, { Map, List } from 'immutable';
import _ from 'lodash';

import {TYPES} from 'actions/eventTracking';
import serialize from 'utils/serialize';

/*  埋点文档请参见 
                 https://github.com/ronfe/30point/blob/master/Point_Documentation_app.md  */


const helper ={
    newPoint:function (state){
        return {
            eventTime: new Date().getTime(),
            category: 'problems',
            eventValue:{
                topicId:state.get('topicId'),
                levelId: state.get('levelId'),          // 由 ENTER_PROBLEM 更新
                tryTimes: state.get('tryTimes')
            }
        };
    }
}


/**
 *  埋点 Reducer
 *  @author James lv
 *  @creatdate 2016-01-04T11:47:25+0800
 */
function points(state = Immutable.fromJS({
                                        arr: [],
                                        levelId: '',
                                        topicId: '',
                                        tryTimes: 0,
                                        forTeacherEndArr:[]     // 教师端埋点数组
                                    })
                                      , action) {
    let newState = state, point, arr, forTeacherEndArr;

    switch (action.type) {
        case TYPES.FINISH_PROBLEM_SET:
            arr = state.get('arr').toJS();
            forTeacherEndArr = state.get('forTeacherEndArr').toJS();
            if (window.plugins) {
                plugins.YCProblemSetPlugin.recordTrackInfo(arr);
                plugins.YCProblemSetPlugin.recordWrongProblems(forTeacherEndArr);
                plugins.YCProblemSetPlugin.finishProblemSet(action.isSuccess, action.isHanger, action.problemSetId);
            } else
                console.error('plugins is no defined, problemSet ' + (action.isSuccess ? 'is' : 'is not') + ' successed.');
            return state;
        case TYPES.FINISH_EXAM:
            arr = state.get('arr').toJS();
            forTeacherEndArr = state.get('forTeacherEndArr').toJS();
            if (window.plugins) {
                plugins.YCProblemSetPlugin.recordTrackInfo(arr);
                plugins.YCProblemSetPlugin.recordWrongProblems(forTeacherEndArr);
                plugins.YCProblemSetPlugin.finishExam(action.isSuccess, action.examTopicId, action.helpTopic);
            } else
                console.error('plugins is no defined, problemSet ' + (action.isSuccess ? 'is' : 'is not') + ' successed.');
            return state;
        case TYPES.LEVEL_FAIL:
            if (window.plugins)
                plugins.YCProblemSetPlugin.levelFail(action.levelId, action.isHanger, action.operationInfo);
            else
                console.error('plugins is no defined, level is failed.')
            return state;

        case TYPES.LEVEL_SUCCESS:
            if (window.plugins)
                plugins.YCProblemSetPlugin.levelSuccess(action.levelId, action.isLastLevel, action.operationInfo);
            else
                console.error('plugins is no defined, level is successed.')
            return state;

        case TYPES.EXIT_ADN_RECORD:             // 退出做题
            point = helper.newPoint(newState);
            point['eventKey'] = 'clickProblemExit';
            point['eventValue'] =  _.assign(point.eventValue, {
              problemId: action.currentExerciseId
            });
            arr = state.get('arr').push(point).toJS();
            forTeacherEndArr = state.get('forTeacherEndArr').toJS();

            if (window.plugins) {
                plugins.YCProblemSetPlugin.recordTrackInfo(arr);
                plugins.YCProblemSetPlugin.recordWrongProblems(forTeacherEndArr);
                plugins.YCProblemSetPlugin.closeProblemSet();
            } else
                console.error('plugins is no defined, finish state is ' + action.isSuccess)
            return newState;

        case TYPES.ENTER_PROBLEM:
            newState = state.set('tryTimes', action.tryTimes)
                            .set('levelId', action.levelId);
            point = helper.newPoint(newState);
            point['eventKey'] = 'enterProblem';
            point['eventValue'] =  _.assign(point.eventValue, {
              problemId: action.currentExerciseId
            })

            arr = newState.get('arr').push(Immutable.fromJS(point));
            return newState.set('arr', arr);

        case TYPES.ANSWER_PROBLEM:
            point = helper.newPoint(state);
            point['eventKey'] = 'clickProblemOption';
            point['eventValue'] =  _.assign(point.eventValue, {
              problemId: action.currentExerciseId,
              option: action.userChoice || ''
            })

            arr = state.get('arr').push(Immutable.fromJS(point));
            return state.set('arr', arr);

        case TYPES.SUBMIT_ANSWER:
            // 教师端埋点：
            let isBlank = (action.problemType === 'blank');      // 是否是填空题
            let teacherEndPoint = {
                problemId: action.currentExerciseId,
                levelId: state.get('levelId'),
                choices: !isBlank ? [{
                    correct:action.isRight,
                    body:action.userAnswer
                }] : [],
                blank: isBlank ? {
                    correct:action.isRight,
                    body:action.userAnswer
                } : {},
                time: new Date().getTime()
            };
            // 普通埋点：
            point = helper.newPoint(state);
            point['eventKey'] = 'clickProblemSubmit';
            point['eventValue'] =  _.assign(point.eventValue, {
              problemId: action.currentExerciseId,
              userAnswer: action.userAnswer,
              isRight: action.isRight,
              helpTopicId: action.helpTopicId
            });
            
            arr = state.get('arr').push(Immutable.fromJS(point));
            forTeacherEndArr = state.get('forTeacherEndArr').push(Immutable.fromJS(teacherEndPoint));
            return state.set('arr', arr)
                        .set('forTeacherEndArr', forTeacherEndArr);

        case TYPES.START_PROBLEM_SET:
            point = helper.newPoint(newState);
            point['eventKey'] = 'startPractice';

            point['eventValue'] =  _.assign(point.eventValue, {
              problemSetId: action.problemSetId,
              initLayerIndex: action.initLayerIndex
            })
            
            arr = newState.get('arr').push(Immutable.fromJS(point));
            return newState.set('arr', arr);

        case TYPES.CLICK_DRAFT_BTN:
            point = helper.newPoint(state);
            point['eventKey'] = 'clickProblemDraft';

            point['eventValue'] =  _.assign(point.eventValue, {
              problemId: action.currentExerciseId
            })
            
            arr = state.get('arr').push(Immutable.fromJS(point));
            return state.set('arr', arr);

        case TYPES.ENTER_DRAFT:
            point = helper.newPoint(state);
            point['eventKey'] = 'enterDraft';

            point['eventValue'] =  _.assign(point.eventValue, {
              problemId: action.currentExerciseId
            })
            
            arr = state.get('arr').push(Immutable.fromJS(point));
            return state.set('arr', arr);

        case TYPES.CLOSE_DRAFT:
            point = helper.newPoint(state);
            point['eventKey'] = 'clickDraftExit';

            point['eventValue'] =  _.assign(point.eventValue, {
              problemId: action.currentExerciseId
            })
            
            arr = state.get('arr').push(Immutable.fromJS(point));
            return state.set('arr', arr);

        case TYPES.CLEAR_DRAFT:
            point = helper.newPoint(state);
            point['eventKey'] = 'clickDraftClear';

            point['eventValue'] =  _.assign(point.eventValue, {
              problemId: action.currentExerciseId
            })
            
            arr = state.get('arr').push(Immutable.fromJS(point));
            return state.set('arr', arr);

        case TYPES.SHOW_EXPLAIN:
            point = helper.newPoint(state);
            console.log(action.currentExerciseId)
            point['eventKey'] = 'clickProblemExplanation';
            point['eventValue'] =  _.assign(point.eventValue, {
              problemId: action.currentExerciseId
            })
            
            arr = state.get('arr').push(Immutable.fromJS(point));
            return state.set('arr', arr);

         case TYPES.UPDATE_TOPIC_ID:
            newState = state.set('topicId', action.topicId);
            return newState;

        default:
            return state;
    }
}


export default points;