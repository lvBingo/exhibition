import ActionTypeAddNamespace from 'utils/ActionTypeAddNamespace';

/*
 *  埋点类型
 */
let _TYPES = {
    ANSWER_PROBLEM: 'ANSWER_PROBLEM',
    MODIFY_CHOICE: 'MODIFY_CHOICE',
    SUBMIT_ANSWER: 'SUBMIT_ANSWER',
    CLICK_EXP_VIDEO: 'CLICK_EXP_VIDEO',
    CLICK_NEXT_PROBLEM: 'CLICK_NEXT_PROBLEM',
    EXIT_ADN_RECORD:'EXIT_ADN_RECORD',
    SHOW_EXPLAIN: 'SHOW_EXPLAIN',
    SOFT_KEYBOARD_POP: 'SOFT_KEYBOARD_POP',
    SOFT_KEYBOARD_DISAPPEAR: 'SOFT_KEYBOARD_DISAPPEAR',
    CLICK_PROBLEM_TEXTBOX: 'CLICK_PROBLEM_TEXTBOX',
    START_PROBLEM_SET: 'START_PROBLEM_SET',
    START_CHALLENGE: 'START_CHALLENGE',
    CLICK_DRAFT_BTN: 'CLICK_DRAFT_BTN',
    CLOSE_DRAFT: 'CLOSE_DRAFT',
    FINISH_PROBLEM_SET: 'FINISH_PROBLEM_SET',
    FINISH_EXAM: 'FINISH_EXAM',
    CLEAR_DRAFT: 'CLEAR_DRAFT',
    LEVEL_FAIL: 'LEVEL_FAIL',
    ENTER_DRAFT: 'ENTER_DRAFT',
    LEVEL_SUCCESS: 'LEVEL_SUCCESS',
    UPDATE_TOPIC_ID: 'UPDATE_TOPIC_ID',
    ENTER_PROBLEM: 'ENTER_PROBLEM'
}

// ADD NAMESPACE
export const TYPES = ActionTypeAddNamespace(_TYPES, 'eventTracking');


/**
 *  更新 TopicID
 *  @author James lv
 *  @creatdate 2016-05-03T15:57:02+0800
 *  @param     {[type]}                 topicId [知识点ID]
 *  @return    {[type]}                         [description]
 */
export function updateTopicId(topicId) {
    return {
        type: TYPES.UPDATE_TOPIC_ID,
        topicId
    };
}


/**
 *  结束题集
 *  @author James lv
 *  @creatdate 2016-04-11T15:18:15+0800
 *  @param     {Boolean}                isSuccess    [做题是否成功]
 *  @param     {Boolean}                isHanger     [是否是钩子题]
 *  @param     {[String]}               problemSetId [题集ID]
 */
export function finishProblemSet(isSuccess, isHanger, problemSetId) {
    return {
        type: TYPES.FINISH_PROBLEM_SET,
        isSuccess,
        isHanger,
        problemSetId
    };
}

/**
 *  结束阶段测验
 *  @author James lv
 *  @creatdate 2016-06-01T22:13:41+0800
 *  @param     {Boolean}                isSuccess   [做题是否成功]
 *  @param     {String}                 examTopicId [阶段测验的TopicId]
 *  @param     {Object}                 helpTopic   [{themeId, chapterId, topicId}]
 */
export function finishExam(isSuccess, examTopicId, helpTopic){
    return {
        type: TYPES.FINISH_EXAM,
        isSuccess,
        examTopicId,
        helpTopic
    };
}

/**
 *  答题失败
 *  @author James lv
 *  @creatdate 2016-04-08T19:16:27+0800
 *  @param     {[String]}                 levelId  [层ID]
 *  @param     {Boolean}                  isHanger [是否是钩子题，如果是钩子题。钩子题的失败不会导致题集的失败，而是被跳转到“钩子题失败的成功页”。
 *                                                     钩子题在题集里只出现在最后一层，且只出现 1 次。]
 */
export function levelFail(levelId, isHanger, operationInfo) {
    return {
        type: TYPES.LEVEL_FAIL,
        levelId,
        isHanger,
        operationInfo
    };
}

/**
 *  本层题成功；当最后一层时，通过 isLastLevel 字段，关闭做题系统。
 *  @author James lv
 *  @creatdate 2016-04-08T19:24:06+0800
 *  @param     {[String]}                 levelId       [层ID]
 *  @param     {Boolean}                isLastLevel   [当前层是否是最后一层]
 *  @param     {[Object]}                operationInfo [ 操作信息 
 *                                                      schema: {
 *                                                                 tryTimes: [enum] 1/2（第几次做对,用于积分计算）
 *                                                                 levels: [  （在习题端纪录的层纪录，一般情况下后端不会用这个数据，在数据丢失无法计算完成状态时，会以前端的层纪录为计算依据）
 *                                                                     {levelId:String, tryTimes: 1/2},
 *                                                                     {levelId:String, tryTimes: 1/2}
 *                                                                 ]
 *                                                             }
 *                                                     ]
 */
export function levelSuccess(levelId, isLastLevel, operationInfo) {
    return {
        type: TYPES.LEVEL_SUCCESS,
        levelId,
        isLastLevel,
        operationInfo
    };
}

/**
 *  退出做题，并将埋点提交
 *  @author James lv
 *  @creatdate 2016-01-06T12:07:29+0800
 *  @param     {Boolean}                currentExerciseId   [问题ID]
 */
export function exitAndRecord(currentExerciseId) {
    return {
        type: TYPES.EXIT_ADN_RECORD,
        currentExerciseId
    };
}

/**
 *  题目页，题目打开。
 *  @author James lv
 *  @creatdate 2016-02-03T11:16:33+0800
 *  @param     {[ObjectId]}                 currentExerciseId [问题ID]
 *  @param     {[Number]}                 tryTimes        [尝试次数]
 *  @return    {[type]}                                   [description]
 */
export function enterProblem(currentExerciseId, levelId, tryTimes) {
    return {
        type: TYPES.ENTER_PROBLEM,
        currentExerciseId,
        levelId,
        tryTimes
    };
}

/**
 *  每次改变了选择题选项的点击
 *  @author James lv
 *  @creatdate 2016-01-04T15:44:43+0800
 *  @param     {[ObjectId]}                 currentExerciseId [问题ID]
 *  @param     {[String]}                   choiceAnswer    [用户新选择选项]
 */
export function clickOption(currentExerciseId, userChoice) {
    return {
        type: TYPES.ANSWER_PROBLEM,
        currentExerciseId,
        userChoice
    };
}

/**
 *  题目页，用户点击提交按钮。
 *                          进行两个埋点操作，一个数据埋点记录，一个教师端统计埋点记录。
 *  @author James lv
 *  @creatdate 2016-04-13T13:00:07+0800
 *  @param     {[ObjectId]}                 currentExerciseId   [问题ID]［同时用于两种埋点］
 *  @param     {[String]}                   userAnswer          [用户选择选项]［用于数据埋点］
 *  @param     {Boolean}                    isRight             [用户选择正误]［同时用于两种埋点］
 *  @param     {[String]}                   problemType         [题目类型]［选择题或填空题］
 */
export function submitAnswer (currentExerciseId, userAnswer, isRight, problemType, helpTopicId) {
    return {
        type: TYPES.SUBMIT_ANSWER,
        currentExerciseId,
        userAnswer,
        isRight,
        problemType,
        helpTopicId
    };
}

/**
 *  开始练习
 *  @author James lv
 *  @creatdate 2016-04-18T16:42:21+0800
 *  @param     {[ObjectID]}                 problemSetId   [题集ID]
 *  @param     {[type]}                 initLayerIndex [起始层数]
 *  @return    {[type]}                                [description]
 */
export function startProblemSet(problemSetId, initLayerIndex) {
    return {
        type: TYPES.START_PROBLEM_SET,
        problemSetId,
        initLayerIndex
    };
}

/**
 *  填空题题目页，调起软键盘后，点击“草稿本”图标
 *  @author James lv
 *  @creatdate 2016-03-08T12:05:53+0800
 *  @param     {[ObjectId]}                 currentExerciseId [题目ID]
 */
export function clickDraftBtn(currentExerciseId) {
    return {
        type: TYPES.CLICK_DRAFT_BTN,
        currentExerciseId
    };
}


/**
 *  进入草稿本
 *  @author James lv
 *  @creatdate 2016-04-27T14:56:18+0800
 *  @param     {[ObjectId]}                 currentExerciseId [题目ID]
 */
export function enterDraft(currentExerciseId) {
    return {
        type: TYPES.ENTER_DRAFT,
        currentExerciseId
    };
}



/**
 *  草稿本页，点击“关闭”按钮
 *  @author James lv
 *  @creatdate 2016-03-08T12:12:46+0800
 *  @param     {[type]}                 currentExerciseId [埋点发送时所在的题目ID]
 *  @return    {[type]}                                   [description]
 */
export function closeDraft(currentExerciseId) {
    return {
        type: TYPES.CLOSE_DRAFT,
        currentExerciseId
    };
}

/**
 *  [草稿本页，点击“清除”按钮]
 *  @author James lv
 *  @creatdate 2016-03-08T12:38:51+0800
 *  @param     {[type]}                 currentExerciseId [埋点发送时所在的题目ID]
 *  @return    {[type]}                                   [description]
 */
export function clearDraft(currentExerciseId) {
    return {
        type: TYPES.CLEAR_DRAFT,
        currentExerciseId
    };
}

/**
 *  显示解析
 *  @author James lv
 *  @creatdate 2016-01-28T16:48:59+0800
 *  @param     {[string]}                 currentExerciseId [问题ID]
 *  @return    {[type]}                                   [description]
 */
export function showExplain(currentExerciseId) {
    return {
        type: TYPES.SHOW_EXPLAIN,
        currentExerciseId
    };
}