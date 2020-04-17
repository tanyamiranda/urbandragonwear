const SAMPLE_ORDER = {
    order:{
        id: 0,
        createdDate: "",
        email: 'tanya.miranda@gmail.com',
        phone: '201-999-8888 x1234',
        orderStatus: "order processing",
        orderTotal: 122.00,
        currency: "usd",
        paymentInfo: {
            nameOnCard: "Tanya Miranda",
            authorizationId: "ch_1GYFfUGMyRIfeCq0yt6Zv3sJ",
            paymentType: "visa",
            last4: "4242",
            billingAddress: {
                name: "John Smith",
                line1: "99 Main Street",
                line2: "Apt 2B",
                city: "North Bergen",
                state: "NJ",
                zip: "07047"	
            },
        },
        shippingInfo: {
            shippingMethod: "UPS2DAY",
            shippingAddress: {
                name: "Mary Smith",
                line1: "100 Work Street",
                line2: "5th Floor",
                city: "New York",
                state: "NY",
                zip: "10010"	
            }
        },
        orderItems: [
            {
                id: 1,
                name: "Brown Brim",
                imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
                price: 25,
                quantity: 2,
            },
            {
                id: 2,
                price: 18,
                name: "Blue Beanie",
                imageUrl: "https://i.ibb.co/ypkgK0X/blue-beanie.png",
                quantity: 4,
            }
        ]
    }
};

export default SAMPLE_ORDER;