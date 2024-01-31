import { useEffect, useState } from "react";
import axios from "axios";
import BuyersPT from "./BuyersPT";

// this is the get request for the buyers 

function GetBuyers() {
  const [buyers, setBuyers] = useState([]);
  useEffect(function () {
    axios
    // this is a get request from the server to post the buyer

      .get("http://localhost:8082/Buyers/get")
      .then((response) => {
        console.log("Response:", response);
        setBuyers(response.data);
        console.log("Buyers:", buyers);
      })
      .catch((err) => console.error(err));
  }, []);

  const buyerArray = [];
  for (const buyer of buyers) {
    buyerArray.push(
      <BuyersPT
        key={buyer.firstName + " " + buyer.postcode}
        FirstName={buyer.firstName}
        LastName={buyer.lastName}
        Address={buyer.address}
        Postcode={buyer.postcode}
        PhoneNumber={buyer.phoneNumber}
      />
    );
  }

  return (
    <div>
      <h2> A list of buyers </h2>
      <br />
      <br />
      <div className="container-fluid">
        <div className="row">{buyerArray}</div>
        {/* this is the display oin the rows */}
      </div>
    </div>
  );
}

export default GetBuyers;
