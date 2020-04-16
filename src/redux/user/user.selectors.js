import {createSelector} from 'reselect';

const selectUser = state => state.user;

export const selectCurrentUser = createSelector (
    [selectUser],
    user => user.currentUser
)

export const selectOrderHistory = createSelector (
    [selectUser],
    user => user.orderHistory
)

export const selectOrderFromOrderHistory = (orderId) => createSelector (
    [selectUser],
    user => user.orderHistory.find(order => order.id === orderId)
)