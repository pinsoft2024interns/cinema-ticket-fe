export type Reservation = {
    id: number;
    status: boolean;
    totalPrice: number;
    movieId: number;
    userId: number;
    seats: Seat[];
};



export const reservations: Reservation[] = [
    {
        id:1,
        status: true,
        totalPrice: 100,
        userId:1,
        movieId:2,
        seats: [
            {
                id:1,
                name:'A1',
                isOccupied:true,
                price:50,
            },
            {
                id:2,
                name:'A2',
                isOccupied:true,
                price:50
            },
        ],
    },
    {
        id:2,
        status: true,
        totalPrice:150,
        userId:102,
        movieId:2,
        seats: [
            {
                id:3,
                name:'A3',
                isOccupied:true,
                price:50,
            },
            {
                id:4,
                name:'A4',
                isOccupied:true,
                price:50,
            },
            {
                id:5,
                name:'A5',
                isOccupied: true,
                price:50,
            },
        ],
    },
];

export type Seat = {
    id: number;
    name: string;
    isOccupied: boolean;
    price:number,
};

export const seats: Seat[] = [
    { id: 1, name: 'A1', isOccupied: false, price: 50 },
    { id: 2, name: 'A2', isOccupied: false, price: 50 },
    { id: 3, name: 'A3', isOccupied: false, price: 50 },
    { id: 4, name: 'A4', isOccupied: false, price: 50 },
    { id: 5, name: 'A5', isOccupied: false, price: 50 },
    { id: 6, name: 'A6', isOccupied: false, price: 50 },
    { id: 7, name: 'A7', isOccupied: false, price: 50 },
    { id: 8, name: 'A8', isOccupied: false, price: 50 },
    { id: 9, name: 'A9', isOccupied: false, price: 50 },
    { id: 10, name: 'A10', isOccupied: false, price: 50 },
    { id: 11, name: 'B1', isOccupied: false, price: 50 },
    { id: 12, name: 'B2', isOccupied: false, price: 50 },
    { id: 13, name: 'B3', isOccupied: false, price: 50 },
    { id: 14, name: 'B4', isOccupied: false, price: 50 },
    { id: 15, name: 'B5', isOccupied: false, price: 50 },
    { id: 16, name: 'B6', isOccupied: false, price: 50 },
    { id: 17, name: 'B7', isOccupied: false, price: 50 },
    { id: 18, name: 'B8', isOccupied: false, price: 50 },
    { id: 19, name: 'B9', isOccupied: false, price: 50 },
    { id: 20, name: 'B10', isOccupied: false, price: 50 },
    { id: 21, name: 'C1', isOccupied: false, price: 50 },
    { id: 22, name: 'C2', isOccupied: false, price: 50 },
    { id: 23, name: 'C3', isOccupied: false, price: 50 },
    { id: 24, name: 'C4', isOccupied: false, price: 50 },
    { id: 25, name: 'C5', isOccupied: false, price: 50 },
    { id: 26, name: 'C6', isOccupied: false, price: 50 },
    { id: 27, name: 'C7', isOccupied: false, price: 50 },
    { id: 28, name: 'C8', isOccupied: false, price: 50 },
    { id: 29, name: 'C9', isOccupied: false, price: 50 },
    { id: 30, name: 'C10', isOccupied: false, price: 50 },
];
