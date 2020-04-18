import {createSelector} from 'reselect';

export const selectOrder = state => state.order;

export const selectOrderFromSearch = createSelector (
    [selectOrder],
    order => order.searchOrder
)

export const selectNewOrder = createSelector (
    [selectOrder],
    order => order.newOrder
)