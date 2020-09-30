import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings,setBooking] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(()=>{
        fetch('http://localhost:4000/bookings?email='+loggedInUser.email,{
            headers:{
                'Content-Type':'application/json',
                authorization: `Bearar ${sessionStorage.getItem('token')}`
                }
        })
        .then(res => res.json())
        .then(data =>setBooking(data))
    },[])

    return (
        <div>
            <h3>Total {bookings.length} Bookings</h3>
            {
                bookings.map(booking => <li key={booking.__id}>email: {booking.email} From:{(new Date(booking.checkIn).toDateString('dd/MM/yyyy'))} To: {(new Date(booking.checkOut).toDateString('dd/MM/yyyy'))}</li>)
            }
        </div>
    );
};

export default Bookings;