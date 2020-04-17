import {createSelector} from 'reselect';

export const selectOrder = state => state.order;

export const selectOrderFromSearch = createSelector (
    [selectOrder],
    order => order.order
)
