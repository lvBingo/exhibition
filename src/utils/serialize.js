import Immutable, { Map, List } from 'immutable';
import _ from 'lodash';
import {exerciseTypes} from 'utils/enum';
import {getRandom} from 'utils/helper';

/**
 *  将传入的 json 数据计算为标准数据
 *  @type {Object}
 */
const serialize = {
    /**
     *  初始化 Redux Store 数据
     *  @author James lv
     *  @creatdate 2015-12-24T16:27:18+0800
     *  @param     {[Object]}                 data 传入一个 Object, 将其附加在初始化数据中
     *  @return    {[immutable Map]}               返回一个计算后的 Immutable Map
     */
    defaultStoreInit:function (data) {
        let defaultStore={
            ...data
        }
        return Immutable.fromJS(defaultStore);
    },


    /**
     *  将练习题数据（专辑题和挑战题）计算为在 App 内使用的标准数据
     *  @author James lv
     *  @creatdate 2015-12-23T11:39:42+0800
     *  @param     {[Array | Object]}                 data 当参数 data 为 Array 时，数据类型为挑战题，type 'C'
     *                                                               当为 Object 时，数据类型为专辑题，type 'P'
     *  @return    {[Object]}                               返回一个经过计算的 Object ，供 App 使用
     */
    exercise: function (data) {
        let { exam, practice } = exerciseTypes;
        let currentLevel;
        let isExam = (data.type == 'exam');

        let exerciseData = {
            UI:{                                // 关于 Components UI 之间的 state
                isSubmit        : false,        // 是否提交了答案
                isShowImgSymbol : false,        // 是否显示图片特殊符号，如大于等于号或小于等于号
                showExplain     : false,
                showDraft       : false,
                enableSubmitBtn : false,
                isRight         : false,            // 当前的答案是否正确
                maxLevel        : 3,                // 进度条长度
                bloodCount      : 2,
                type            : '',               // 'E'阶段测试 'P'练习题
                currentLevel    : 0,                // 进度条的进度
                hyperVideo      : '',
                problemSetId    : '',               // 习题集的id
                showKeyboard    : false             // 显示键盘
            },
            common:{                // Components 间的公共维护内容
                blankContent : '',                 // 填空题输入的内容
                levels: {                          // 习题端保存的的层纪录，在最后一层时通过 Cordova API 发送
                                                   // 一般情况下后端不会用这个数据。当在数据丢失无法计算完成状态时，会以前端的层纪录为计算依据。
                                                   // Schema {_id: tryTimes [enum] 0/1/2 }
                        }
            },
            topicInfo:{
                _id: '',             // Topic ID, Only Exam
                topicType       : 'A',              // 知识点类型：A类和非A类    [enum] 'A', 'B', 'C', 'D', 'E', 'I', 'S'
                rewardRules     : {"summary":10,"target":[10,5],"hyperVideo":10,"hanger":[10,5],"extend":[10,5],"step":[5,2]},
                finishState     : 'unfinished',     //  [enum] 'unfinished' / 'perfect' /  'imperfect'（未完成／完美完成／不完美完成）  （默认值：unfinished）
                levels          : {
                     // '56f7ae99217847fde27a8ef4':1,        // 服务器端已有层状态是不会存在  [level: 1, 2, 4, 5]  这样的层缺失情况的。
                     // '56f7ae99217847fde27a8ef5':1,
                     // '56f7ae99217847fde27a8ef7':0
                }                // 在服务器端已有层的状态，用于进行层恢复
            },
            currentLevelInfo : {
                _id: '',
                helpTopic:{},
                pool: ''                            // pool  enum: ['step', 'target', 'extend', 'hanger'], // 梯子,目标,扩展,钩子
            },
            seq             : 0,            // Sequence 当前级别问题的序列下标
            
            // 以下为不同题型的差异化数据
            currentLevelExercise : 0
        };

        if (isExam) {          // 阶段测试
            exerciseData.topicInfo._id = data.topics[0]._id;
            data = data.topics[0].modules[0].practice;
            exerciseData.levels = problemArrReorder(data.levels) || [];     // 乱序数组
            exerciseData.UI.type = exam;
            exerciseData.UI.bloodCount = 1;
        } else {
            exerciseData.levels = problemArrReorder(data.levels) || [];     // 乱序数组
            exerciseData.UI.type = practice;
            exerciseData.UI.hyperVideo = data.hyperVideo;
        }
        currentLevel = exerciseData.levels[exerciseData.UI.currentLevel];
        exerciseData.currentLevelInfo._id = currentLevel._id;
        exerciseData.currentLevelInfo.pool = isExam ? exam : currentLevel.pool;
        exerciseData.currentLevelInfo.helpTopic = currentLevel.helpTopic;
        exerciseData.UI.problemSetId = data._id;
        exerciseData.UI.maxLevel = exerciseData.levels && exerciseData.levels.length ? exerciseData.levels.length : 3;
        exerciseData.currentLevelExercise = currentLevel.problems;
        return exerciseData;
    },

    /**
     *  选择题选项乱序
     *  @author James lv
     *  @creatdate 2016-01-11T19:07:34+0800
     *  @param     {[immutable List]}                 $$choiceArr [选择题选项 immutable 数组]
     *  @return    {[immutable List]}                 $$newChoiceArr [被乱序后的 immutable 数组]
     */
    choiceReorder:function($$choiceArr){
        let indexArr,
            choiceLength = $$choiceArr.count(),
            index,
            $$newChoiceArr = $$choiceArr;
        let choice,
            isNoNeedReorder = false,        // 不必重新排序
            regex = /^[AB①②]$/;
        for (let K = 0; K < 2; K++) {       // 检查前两个选项是否符合正则表达式
            let choice = $$choiceArr.getIn([K, 'body']);
            isNoNeedReorder = regex.test(choice.replace(/[\s$]/g,''));
            if(!isNoNeedReorder) break;     // 如果选项不符合只有 AB①② 中一项，就结束判断。
        };
        if(isNoNeedReorder) return $$choiceArr;     // 无须重新排序则结束循环

        indexArr = getRandomIndexArray(choiceLength);
        for (let K = 0; K < choiceLength; K++) {
            index = indexArr[K];
            $$newChoiceArr = $$newChoiceArr.set(K, $$choiceArr.get(index));
        };
        return $$newChoiceArr;
    }
}

/**
 *  乱序一个结构为[Array: 
 *                      {Object: problems: [Array], _id: ObjectID},
 *                      {Object: problems: [Array], _id: ObjectID},
 *                      {Object: problems: [Array], _id: ObjectID},
 *                      ...]
 *                                                  的数组
 *  @author James lv
 *  @creatdate 2016-01-26T11:22:18+0800
 *  @param     {[Array]}                 arr [数据结构固定的练习题数组]
 *  @return    {[type]}                 [description]
 */
function problemArrReorder(arr){
    let indexArr;
    for (let J = 0; J < arr.length; J++) {      // 乱序
        let itemArr = arr[J].problems, newItemArr =[];
        if (itemArr.length == 1) continue;      // 题池为1时无须乱序
        indexArr = getRandomIndexArray(itemArr.length
                                            , !persistentStorageLevelsID(arr[J]._id));          
                                                                    // 如果 level ID 没有存在于持久化存储中，第一个元素则不参与重新排序
        for (let N = 0; N < itemArr.length; N++) {
            newItemArr[N] = itemArr[indexArr[N]];
        };
        arr[J].problems = newItemArr;
    };
    return arr;
}


let levelsIDStorage;        // 数据缓存，当此变量中有值时将从该变量中取值，而不是 localStorage

/**
 *  检视持久化存储中是否存在给定的levels ID，如果不存在则将加入持久化存储中。
 *  @author James lv
 *  @creatdate 2016-03-29T16:04:09+0800
 *  @param     {[ObjectID]}                 levelsID [level ID]
 *  @return    {[Blooean]}                           [level ID是否已经存在在持久化数组中]
 */
function persistentStorageLevelsID (levelsID) {
    let IDisExist = false;
    levelsIDStorage = levelsIDStorage 
                                ? levelsIDStorage :
                                    (localStorage.getItem('levelsID')
                                                ? eval(localStorage.getItem('levelsID'))
                                                : []);
    if(_.includes(levelsIDStorage, levelsID))
        IDisExist = true;
    else {
        if(levelsIDStorage.length > 39)     // 持久化存储中只存储会 40 个的元素
            levelsIDStorage.splice(0, 15);      // 一次性删除“末尾” 15 个元素
        levelsIDStorage.push(levelsID);
        localStorage.setItem('levelsID', JSON.stringify(levelsIDStorage));
    }
    return IDisExist;
}


/**
 *  得到一个长度与参数相等的随机下标数组
 *  @author James lv
 *  @creatdate 2016-01-25T18:58:49+0800
 *  @param     {[Number]}                 arrLength [要得到的随机下标数组的长度]
 *  @param     {[Boolean]}                firstOneNoReorder [第一个元素是否参与重新排序]
 *  @return    {[Array]}                  [一个存储乱序下标的数组]
 */
function getRandomIndexArray (arrLength, firstOneNoReorder) {
    let indexArr = [],
        index,
        zeroIndex_In_IndexArr = -1;       // 记录下标零在随机数组中的位置，用于将此位置替换成下标 arrLength - 1
    do{
        index = getRandom(arrLength);
        if(!_.includes(indexArr, index)){
            zeroIndex_In_IndexArr = index == 0 ? indexArr.length : zeroIndex_In_IndexArr;     // 当下标 0 出现时，记录其在数组中的位置
            indexArr.push(index);
        }
    }while(indexArr.length < arrLength);

    if(firstOneNoReorder && zeroIndex_In_IndexArr!=0 ){          // 如果第一个元素不参与乱序
        indexArr.splice(zeroIndex_In_IndexArr, 1);        // 将数组中下标0的元素替换成 arrLength - 1
        indexArr.unshift(0);        // 保证下标 0 在乱序数组的下标第一的位置
    }
    return indexArr;
}

export default serialize;