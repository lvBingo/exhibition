module.exports = {
    /**
     *  纪录 action 日志的 Middleware
     *  @author James lv
     *  @creatdate 2015-12-25T09:55:48+0800
     *  @param     {[type]}                 options.getState [description]
     *  @return    {[type]}                                  [description]
     */
    logger : function ({ getState }) {
                return (next) => (action) => {
                    console.log('~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ');
                    console.log('will dispatch', action);
                    // 调用 middleware 链中下一个 middleware 的 dispatch。
                    let returnValue = next(action);

                    console.log('state after dispatch', getState().toJS());
                    // 一般会是 action 本身，除非后面的 middleware 修改了它。
                    return returnValue;
                };
            },
    /**
     * 在 state 更新完成和 listener 被通知之后发送崩溃报告。
     */
     crashReporter : store => next => action => {
          try {
            return next(action)
          } catch (err) {
            console.error('Caught an exception!', err)
            // Raven.captureException(err, {
            //   extra: {
            //     action,
            //     state: store.getState()
            //   }
            // })
            throw err
          }
        }

}