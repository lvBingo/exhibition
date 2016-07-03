import ActionTypeAddNamespace from 'utils/ActionTypeAddNamespace';

export const _TYPES = {
    ADD_EXERCISE_DATA: 'ADD_EXERCISE_DATA',
    SUBMIT_ANSWER: 'SUBMIT_ANSWER',
    SHOW_KEYBOARD: 'SHOW_KEYBOARD',
    NEW_BLANK_CONTENT: 'NEW_BLANK_CONTENT',
    DELETE_BLANK_CONTENT: 'DELETE_BLANK_CONTENT',
    ENABLE_SUBMIT_BTN: 'ENABLE_SUBMIT_BTN',
    SHOW_EXPLAIN: 'SHOW_EXPLAIN',
    CHANGE_SHOW_IMG_SYMBOL:'CHANGE_SHOW_IMG_SYMBOL',
    CHANGE_DRAFT_DISPLAY: 'CHANGE_DRAFT_DISPLAY',
    RECORD_LEVEL_DATA: 'RECORD_LEVEL_DATA',
    CHANGE_CURRENT_LEVEL: 'CHANGE_CURRENT_LEVEL',
    LOAD_EXERCISE_CONTEXT: 'LOAD_EXERCISE_CONTEXT',
    NEXT_QUESTION: 'NEXT_QUESTION'
}


// ADD NAMESPACE
export const TYPES = ActionTypeAddNamespace(_TYPES, 'exercise');

/**
 *  添加做题数据
 *  @author James lv
 *  @creatdate 2015-12-25T10:15:17+0800
 *  @param     {[object]}                 data [description]
 */
export function addExerciseData(data, contextData) {
    return {
        type: TYPES.ADD_EXERCISE_DATA,
        data,
        contextData
    };
}

/**
 *  提交答案
 *  @author James lv
 *  @creatdate 2015-12-25T10:09:01+0800
 *  @param     {[bool]}                 isRight [当前答案是否正确]
 */
export function submitAnswer(isRight) {
    return {
        type: TYPES.SUBMIT_ANSWER,
        isRight
    };
}

/**
 *  进行下一道题
 *  @author James lv
 *  @creatdate 2015-12-27T10:47:38+0800
 */
export function nextQuestion() {
    return {
        type: TYPES.NEXT_QUESTION
    };
}


/**
 *  显示键盘
 *  @author James lv
 *  @creatdate 2015-12-27T10:47:38+0800
 *  @param     {Boolean}                isShow [是否显示键盘]
 */
export function showKeyboard(isShow) {
    return {
        type: TYPES.SHOW_KEYBOARD,
        isShow
    };
}


/**
 *  追加新的填空题答案内容
 *  @author James lv
 *  @creatdate 2015-12-27T10:47:38+0800
 *  @param     {Boolean}                newField [新的字符]
 */
export function newBlankContent(newField) {
    return {
        type: TYPES.NEW_BLANK_CONTENT,
        newField
    };
}

/**
 *  删除一段填空题答案内容
 *  @author James lv
 *  @creatdate 2015-12-27T10:47:38+0800
 *  @param     {Boolean}                deleted [删除的内容]
 */
export function deleteBlankContent(deleted) {
    return {
        type: TYPES.DELETE_BLANK_CONTENT,
        deleted
    };
}

/**
 *  启用提交按钮
 *  @author James lv
 *  @creatdate 2015-12-27T10:47:38+0800
 *  @param     {Boolean}                isEnable [删除的内容]
 */
export function enableSubmitBtn(isEnable) {
    return {
        type: TYPES.ENABLE_SUBMIT_BTN,
        isEnable
    };
}

/**
 *  显示解析
 *  @author James lv
 *  @creatdate 2015-12-27T10:47:38+0800
 *  @return    {[type]}                 [description]
 */
export function showExplain() {
    return {
        type: TYPES.SHOW_EXPLAIN,
    };
}

/**
 *  改变 isShowImgSymbol 字段，以对特殊符号用图片显示
 *  @author James lv
 *  @creatdate 2015-12-27T10:47:38+0800
 *  @param     {Boolean}                isShowImgSymbol [是否用图片显示特殊符号（如大于等于号）]
 */
export function changeShowImgSymbol(isShowImgSymbol) {
    return {
        type: TYPES.CHANGE_SHOW_IMG_SYMBOL,
        isShowImgSymbol
    }
}

/**
 *  显示草稿本
 *  @author James lv
 *  @creatdate 2016-02-15T14:55:12+0800
 *  @return    {[type]}                 [description]
 */
export function showDraft() {
    return {
        type: TYPES.CHANGE_DRAFT_DISPLAY,
        isShow: true
    };
}


/**
 *  隐藏草稿本
 *  @author James lv
 *  @creatdate 2016-02-15T14:55:12+0800
 *  @return    {[type]}                 [description]
 */
export function hideDraft() {
    return {
        type: TYPES.CHANGE_DRAFT_DISPLAY,
        isShow: false
    };
}


/**
 *  层数据纪录
 *  @author James lv
 *  @creatdate 2016-02-15T14:55:12+0800
 *  @return    {[type]}                 [description]
 */
export function recordLevelData() {
    return {
        type: TYPES.RECORD_LEVEL_DATA,
    };
}


/**
 *  发送修改 current level 的指令，topicInfo 字段中的 level 字段是修改依据。
 *  @author James lv
 *  @creatdate 2016-04-14T13:28:22+0800
 *  @return    {[type]}                 [description]
 */
export function changeCurrentLevel() {
    return {
        type: TYPES.CHANGE_CURRENT_LEVEL,
    };
}