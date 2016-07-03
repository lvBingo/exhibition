
/**
 *  将一个对象类型的 TYPES 对象的所有 val 值加上一个 namespace 前缀
 *  @author James lv
 *  @creatdate 2016-01-04T18:52:17+0800
 *  @param     {[Object]}                 TYPES     [ACTION TYPES]
 *  @param     {[String]}                 namespace [命名空间的字符串]
 */
function ActionTypeAddNamespace (TYPES, namespace) {
    for(let K in TYPES)
        TYPES[K] = namespace + '_' + TYPES[K];
    return TYPES;
}

export default ActionTypeAddNamespace;