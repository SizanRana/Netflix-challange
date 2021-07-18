import React, { useEffect, useState } from "react";
import "../css/PlanScreen.css";
import db from "../firebase";

function PlanScreen({ productName, productData }) {
  const [products, setProducts] = useState();

  //   useEffect(() => {
  //     db.collection("products")
  //       .where("active", "===", "true")
  //       .get()
  //       .then((querySnapshot) => {
  //         const products = {};
  //         querySnapshot.forEach((productDoc) => {
  //           products(productDoc.id) = productDoc.data();
  //           const priceSnap = productDoc.ref.collection("prices").get();
  //           priceSnap.docs.forEach((price) => {
  //             products[productDoc.id].prices = {
  //               priceId: price.id,
  //               priceData: price.data(),
  //             };
  //           });
  //         });
  //         setProducts(products);
  //       });
  //   }, []);

  const loadCheckout = () => {
    alert(
      "Sorry Sonny I didn't have card so I wasn't able to enable stripe function. Love your contents and thank you so so much for providing this much valuable content for free. I've learned a lot from you and I love the way you teach. Once again Sonny thank you, you are hero for all of us :)"
    );
  };

  return (
    <div className="planScreen">
      <div className="planScreen__plan">
        <div className="planScreen__planInfo">
          <h5>{productName}</h5>
          <h6>{productData}</h6>
        </div>
        <button onClick={loadCheckout}>Subscribe</button>
      </div>
    </div>
  );
}

export default PlanScreen;
