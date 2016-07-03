import { createSelector } from 'reselect'
import Immutable from 'immutable';


/*
 * Definition of input-selectors.
 * Input-selectors should be used to abstract away the structure
 * of the store in cases where no calculations are needed
 * and memoization wouldn't provide any benefits.
 */
const exerciseSelector = state => state.get('exercise')

/*
 * Definition of combined-selector.
 * In visibleTodosSelector, input-selectors are combined to derive new
 * information. To prevent expensive recalculation of the input-selectors
 * memoization is applied. Hence, these selectors are only recomputed when the
 * value of their input-selectors change. If none of the input-selectors return
 * a new value, the previously computed value is returned.
 */
export const selector = createSelector(
    () => {
        return {
            
        }
    }
);