
        import { Link,useNavigate } from "react-router-dom";
        import Button from '@mui/material/Button';
        import axios from 'axios';
import AddShoppingCart from "@mui/icons-material/AddShoppingCart";

        export default function ItemData({ product,isLoggedIn}) {

            const navigate = useNavigate();

            const handleBuyNowClick = () => {
                
                if (isLoggedIn) {
                
                navigate(`/order/${product.id}`, { state: { product } });
                } else {    
                
                navigate('/login', { state: { from: `/order/${product.id}` } });
                }
            };
            const handleAddToCart = async () => {
                if (!isLoggedIn) {
                    alert('need to login')
                    navigate('/login');
                    return;
                }
                else{

        
                    // Retrieve the JWT token from localStorage
                    const jwtToken = localStorage.getItem('jwtToken'); 
                    console.log("recived"+jwtToken)

                    if (!jwtToken) {
                        console.error('JWT token not found');
                        return;
                    }
                
                    try {
                        const response = await axios.post(
                            'http://localhost:8081/user-app/add-productToCart',
                            product,
                            { headers: { Authorization: `Bearer ${jwtToken}` } } 
                        )
                        console.log('Product added to cart:', response.data);
                    } catch (error) {
                        console.error('Error adding product to cart:', error);
                    }
                    alert("product added successfully")
            }
            };
        return (
            <div className="ItemData">
            
                <section>
                <img src={process.env.PUBLIC_URL + '/' + product.image} alt={product.productName} />
                <h3>{product.productName}</h3>
                <p>{product.description}</p>
                <p>Rs {product.price}</p>
                </section>
    
            
            <Link to={`/order/${product.id}`} state={{ product }}> 
                <Button variant="contained" onClick={handleBuyNowClick} sx={{
                    backgroundColor: '#A0DFEF',
                    color: 'white',
                    fontSize: '5px',
                    fontWeight: 'bold',
                    borderRadius: '10px',
                    padding: '10px 20px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',

                }}>
                Buy Now
                </Button>
                </Link>
                <Button variant="contained" onClick={handleAddToCart}  sx={{
                    backgroundColor: '#A0DFEF',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    borderRadius: '10px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    marginLeft:'40px'
                }}>
                <AddShoppingCart></AddShoppingCart>
                </Button>
                
            
            </div>
        );
        }
