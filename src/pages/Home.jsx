import { useState } from "react"

import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Offers from "../components/Offers"
import Menu from "../components/Menu"
import Location from "../components/Location"
import BookTable from "../components/BookTable"
import Footer from "../components/Footer"

export default function Home({ cart, setCart }) {

  const [search, setSearch] = useState("")

  const addToCart = (item) => {
    const found = cart.find(i => i.title === item.title)

    if (found) {
      setCart(
        cart.map(i =>
          i.title === item.title ? { ...i, qty: i.qty + 1 } : i
        )
      )
    } else {
      setCart([...cart, { ...item, qty: 1 }])
    }
  }

  return (
    <>
      <Navbar cart={cart} search={search} setSearch={setSearch} />

      <Hero />
      <Offers addToCart={addToCart}  />
      <Menu addToCart={addToCart} search={search} />
      <Location />
      <BookTable />
      <Footer />
    </>
  )
}
