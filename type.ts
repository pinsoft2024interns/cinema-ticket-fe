

export interface Movie {
    id: number;
    name: string;
    base64image: string,
    description: string;
}


export interface Hall {
    id: number;
    name: string;
    screenType: string;
    capacity: number
}


export interface Show {
    id: number;
    showtime: String;
    ticketPrice: number;
}

export type Showings = Array<Show>


export interface ReservationProps {
    showingId: number
    userId: number
}

export interface ReservationObject {
    id: number;
    seatInfo: number[];
    numberOfPeople: number;
    cancel: boolean;
    payment: {
        amount: number | null
        paymentDate: String | null
    }
}

export interface User {
    id: number;
    email: string;
    username: string;
    reservations: ReservationObject[];
}

export interface Reservation {
    key: number;
    reservationId: number;
    seatInfo: string;
    numberOfPeople: number;
    isCancel: boolean;
    amount: number | null;
    paymentDate: String | null;
    userId: number;
}


export interface CardInfo {
    id: number;
    creditCardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    cvv: string;
}


export interface CardProps {
    id: number;
    creditCardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    cvv: string;
    reservationId: number | null
}

export interface Payment {
    id:number | null
    amount:number | null
    paymentDate:string | null

}
