export const formatDisplayDate = (dateValue) => {
    let current_datetime = new Date(dateValue);
    let formatted_date = (current_datetime.getMonth() + 1) + "/" + current_datetime.getDate() + "/" +current_datetime.getFullYear() ;
    return formatted_date;
};

export const formatDisplayDateTime = (dateTimeValue) => {
    let current_datetime = new Date(dateTimeValue);
    const formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
    return formatted_date;
};

export const formatDisplayDollarValue = (value) => {

    const currencyFormatter = new Intl.NumberFormat('en-US', {style: 'currency',currency: 'USD',});
    return currencyFormatter.format(value);
}