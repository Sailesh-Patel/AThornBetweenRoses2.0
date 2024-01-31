import { useEffect, useState } from "react";
import axios from "axios";
import PropertiesForSalePT from "./PropertiesForSalePT";
import { useNavigate } from "react-router-dom";

function GetSale() {
  const [sale, setSale] = useState([]);
  const [filterty, setFilterty] = useState("");
  const [filterpr, setFilterpr] = useState("");
  const [filterbd, setFilterbd] = useState("");
  const [filterbt, setFilterbt] = useState("");
  const [filtergd, setFiltergd] = useState("");
  const [filterad, setFilterad] = useState("");
  const [filterpc, setFilterpc] = useState("");
  // const navigate = useNavigate();

  useEffect(function () {
    axios
      .get("http://localhost:8082/PSale/get")
      .then((response) => {
        console.log("Response:", response);
        setSale(response.data);
        console.log("sale:", sale);
      })
      .catch((err) => console.error(err));
  }, []);

  const saleArray = [];
  for (const psale of sale) {
    if (filterty && !psale.type.toLowerCase().includes(filterty.toLowerCase())) continue;
    if (filterpr && psale.price > parseInt(filterpr)) continue;
    if (filterbd && psale.bedrooms < parseInt(filterbd)) continue;
    if (filterbt && psale.bathrooms < parseInt(filterbt)) continue;
    if (filtergd && !psale.garden.toLowerCase().includes(filtergd.toLowerCase())) continue;
    if (filterad && !psale.address.toLowerCase().includes(filterad.toLowerCase())) continue;
    if (filterpc && !psale.postcode.toLowerCase().includes(filterpc.toLowerCase())) continue;

    saleArray.push(
      <PropertiesForSalePT
        key={psale.id}
        Type={psale.type}
        Price={psale.price}
        Bedrooms={psale.bedrooms}
        Bathrooms={psale.bathrooms}
        Garden={psale.garden}
        Address={psale.address}
        Postcode={psale.postcode}
        id={psale.id}
      />
    );
  }

  return (
    <>

      <div className="col">
        <form className="drop-menu">
          <h1>Filter Properties &nbsp;</h1>
          <label htmlFor="ty">Type</label>
          <input
            value={filterty}
            onChange={(event) => setFilterty(event.target.value)}
            id="ty"
            type="text"
            class="form-control"
          ></input>
          <label htmlFor="pr">Price £</label>
          <input
            value={filterpr}
            onChange={(event) => setFilterpr(event.target.value)}
            id="pr"
            type="£"
            class="form-control"
          ></input>
          <label htmlFor="bd">Bedrooms</label>
          <input
            value={filterbd}
            onChange={(event) => setFilterbd(event.target.value)}
            id="bd"
            type="number"
            min={0}
            class="form-control"
          ></input>
          <label htmlFor="bt">Bathrooms</label>
          <input
            value={filterbt}
            onChange={(event) => setFilterbt(event.target.value)}
            id="bt"
            type="number"
            min={0}
            class="form-control"
          ></input>
          <label htmlFor="gn">Garden</label>
          <input
            value={filtergd}
            onChange={(event) => setFiltergd(event.target.value)}
            id="gn"
            type="text"
            class="form-control"
          ></input>
          <label htmlFor="ad">Address</label>
          <input
            value={filterad}
            onChange={(event) => setFilterad(event.target.value)}
            id="ad"
            type="text"
            class="form-control"
          ></input>
          <label htmlFor="pc">Postcode</label>
          <input
            value={filterpc}
            onChange={(event) => setFilterpc(event.target.value)}
            id="pc"
            type="text"
            class="form-control"
          ></input>
          <br />
          <button type="search" className="btn btn-danger btn-md">
            {" "}
            Clear{" "}
          </button>
        </form>
      </div>
      <h2> Show Properties for Sale</h2>
      <br />
      <br />
      <br />

      <div className="container-fluid">
        <div className="row">{saleArray}</div>
      </div>

    </>
  );
}

export default GetSale;
