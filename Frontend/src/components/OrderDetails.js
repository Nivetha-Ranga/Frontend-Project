
import { useLocation } from "react-router-dom";
import PlacingForm from "./PlacingForm";

export default function OrderDetails() {
  const location = useLocation();
  const {product} = location.state //destructing state get the product

  return (
    <div className="orderdetails">
      <div>
        {product ? (
          <div>
            <img className="order-image" src={`/${product.image}`} alt={product.Name} />
            <div className="order-content">
              <h3>{product.productName}</h3>
              <p className="price">Price: Rs.{product.price}</p>
              <p className="category">Category: {product.category}</p>
              <div className="description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>
              <div className="delivery-info">
                <h3>Delivery Information</h3>
                <ul>
                  <li>Be transported between the business and their home in a short period of time. That is, their package will not be sitting in a warehouse or in a delivery truck or plane any longer than necessary.</li>
                  <li>Arrive in a safe and appealing condition. If a product needs to be kept cool, customer expects that when they open the package, the interior will be sufficiently cool so that food safety and quality is not called into question.</li>
                </ul>
              </div>
              <div className="care-instructions">
                <h2>Care Instructions</h2>
                <ul>
                  <li>Some recommend up to four servings each day.</li>
                  <li>Dairy is a highly nutritious food which provides High quality protein.</li>
                  <li>A glass of milk contains 8-10 grams of protein, about one-fifth the daily recommendation for a 135-pound person.</li>
                  <li>Important minerals such as: calcium, iodine, phosphorus and potassium.</li>
                  <li>Geographic locations/destinations to where products will be shipped.</li>
                  <li>Shipping during excessive high temperatures or non-conducive weather.</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <h1>No Data Available</h1>
        )}
      </div>
      {product && <PlacingForm product={product} />} {/* Render PlacingForm only if product exists */}
    </div>
  );
}
