type Reservation = {
    movieId: string;
    numSeats: number;
};

type User = {
    id: string;
    email: string;
    password: string;
    reservations: Reservation[];
};

export const users: User[] = [
    {
        id: '1',
        email: 'user1@example.com',
        password: 'password123',
        reservations: [],
    },
    {
        id: '2',
        email: 'user2@example.com',
        password: 'password123',
        reservations: [],
    },
];
