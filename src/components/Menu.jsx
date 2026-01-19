import { useState } from "react"

export default function Menu({ addToCart, search }) {

  const [showMessage, setShowMessage] = useState(false)
  const [lastAdded, setLastAdded] = useState("")

  const imagePath = (img) =>
    new URL(`../assets/images/${img}`, import.meta.url).href

  const items = [
    // STARTERS
    ["3.jpeg","Paneer Tikka","Chargrilled paneer with spices and yogurt marinade.",220],
    ["4.jpeg","Spring Rolls","Stuffed crispy rolls filled with vegetables.",160],
    ["5.jpeg","Hara Bhara Kebab","Spinach and green peas patty, lightly spiced.",170],
    ["6.jpeg","Mini Samosas","Mini fried triangles stuffed with spicy potato mix.",90],
    ["7.jpeg","Stuffed Mushrooms","Mushroom caps filled with cheese and herbs.",200],
    ["8.jpeg","Masala Papad","Crispy papad topped with onion, tomato & spices.",60],
    ["9.jpeg","Corn Tikki","Golden fried tikkis made with sweet corn and potatoes.",110],
    ["10.jpeg","Paneer Pakora","Fried paneer coated in gram flour batter.",150],
    ["11.jpeg","Garlic Bread","Toasted baguette with garlic and butter.",80],

    // VEG
    ["12.jpeg","Veg Biryani","Fragrant rice layered with vegetables and spices.",200],
    ["13.jpeg","Palak Paneer","Paneer cubes in a smooth spinach gravy.",190],
    ["14.jpg","Paneer Butter Masala","Paneer in a rich tomato-butter sauce.",210],
    ["15.jpeg","Mix Veg Curry","Mixed seasonal veggies in a flavorful curry.",170],
    ["16.jpeg","Aloo Gobi","Stir-fried potatoes and cauliflower with spices.",150],
    ["17.jpeg","Rajma Masala","Kidney beans cooked in a rich gravy.",160],
    ["18.jpeg","Dum Aloo","Baby potatoes in creamy onion-tomato gravy.",180],
    ["19.jpeg","Methi Malai Matar","Peas & fenugreek leaves in a creamy curry.",170],
    ["20.jpeg","Baingan Bharta","Roasted eggplant mashed with spices.",150],

    // NON VEG
    ["21.jpg","Chicken Biryani","Basmati rice layered with spicy chicken.",250],
    ["22.jpg","Butter Chicken","Chicken in a buttery tomato-based sauce.",270],
    ["23.jpg","Mutton Biryani","Basmati rice layered with spicy mutton.",360],
    ["24.jpg","Chicken Curry","Traditional spiced chicken curry.",230],
    ["25.jpg","Mutton Rogan Josh","Kashmiri-style mutton curry.",320],
    ["26.jpg","Fish Fry","Marinated and shallow-fried fish.",220],
    ["27.jpg","Prawn Masala","Prawns in thick spicy gravy.",290],
    ["28.jpg","Chicken 65","Deep-fried spicy chicken bites.",200],
    ["29.jpg","Chicken Tikka","Grilled chicken in tandoori spices.",210],

    // COOL DRINKS
    ["30.jpg","Coca Cola","Chilled fizzy cola beverage.",40],
    ["31.jpg","Pepsi","Popular carbonated cola drink.",40],
    ["32.jpg","Fanta","Orange flavored soft drink.",40],
    ["33.jpg","Sprite","Lemon-lime soda drink.",40],
    ["34.jpg","Thums Up","Strong fizzy cola with bold flavor.",45],
    ["35.jpg","Maaza","Sweet mango drink with pulp.",35],
    ["36.jpg","Red Bull","Energy drink to refresh and energize.",110],
    ["37.jpg","Mountain Dew","Lemon-lime flavored drink.",35],
    ["38.jpg","Monster","Energy drink to refresh and energize.",120],
  ]

  const handleAddToCart = (item) => {
    addToCart(item)
    setLastAdded(item.title)
    setShowMessage(true)

    setTimeout(() => {
      setShowMessage(false)
    }, 2000)
  }

  return (
    <div className="menu" id="menu">
      <h1>MENU</h1>

      <div className="menu-cards">
        {items
          .filter(i => i[1].toLowerCase().includes(search.toLowerCase()))
          .map(([img, title, desc, price], i) => (
            <div key={i} className="card-item">
              <img src={imagePath(img)} alt={title} />
              <h4>{title}</h4>
              <p>{desc}</p>
              <div className="price">₹{price}</div>

              <button
                className="order-btn"
                onClick={() =>
                  handleAddToCart({
                    title,
                    price,
                    image: imagePath(img)
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>

      {/* CENTER ANIMATED "ADDED TO CART" MESSAGE */}
      {showMessage && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#07ff17",
            color: "black",
            padding: "16px 22px",
            borderRadius: "12px",
            boxShadow: "0 0 12px rgba(0,0,0,0.25)",
            textAlign: "center",
            zIndex: 9999,
            animation: "fadeZoom 0.4s ease-out"
          }}
        >
          ✅ <strong>{lastAdded}</strong> added to cart!
        </div>
      )}

      <style>
        {`
          @keyframes fadeZoom {
            from {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.8);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }
        `}
      </style>

    </div>
  )
}
