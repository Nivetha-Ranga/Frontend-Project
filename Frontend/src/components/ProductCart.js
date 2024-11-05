import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductCart({ jwtToken }) {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);  // To handle loading state
    const [error, setError] = useState(null);  // To handle errors

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = jwtToken || localStorage.getItem('jwtToken');  // Use prop or fallback to localStorage

            if (!token) {
                console.error('JWT token not found');
                setError('Unauthorized access, please log in.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8081/user-app/cart-details', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data && Array.isArray(response.data)) {
                    setCartItems(response.data);  // Only set cart items if data is valid
                } else {
                    console.error('Invalid cart data:', response.data);
                    setError('Failed to fetch cart items');
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError('Error fetching cart items.');
            } finally {
                setLoading(false);  // Ensure loading is turned off after fetch
            }
        };

        fetchCartItems();
    }, [jwtToken]);

    if (loading) return <p>Loading..</p>;  // Display loading indicator
    if (error) return <p>{error}</p>;  // Display error message

    return (
        <div className='Pro'  > 
            <h2>Your Cart!!</h2>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <div className='ProductCartBody' > {/* Ensure you map correct field like 'id' */}
                        <section className="ProductCart">
                            <img src={process.env.PUBLIC_URL + '/' + item.image} alt={item.productName} />
                            <h3>{item.productName}</h3>
                            <p>{item.description}</p>
                            <p>Rs {item.price}</p>
                            <p>Quantity {item.quantity}</p>
                        </section>
                    </div>
                ))
            ) : (
                <p>Your Cart Is Empty!!</p>
            )}
        </div>
    );
}
