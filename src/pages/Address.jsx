import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress, addAddress } from "./addressSlice"; // Import addAddress
import Header from "../components/Header";
import Footer from "../components/Footer";

function AddressDetail({ addresses, selectedAddress, setSelectedAddress }) {
  return (
    <div>
      <h4 className="mb-4">Delivery addresses ({addresses.length})</h4>
      {addresses.map((addr, index) => (
        <div key={index} className="mb-3 d-flex align-items-center">
          <input
            type="checkbox"
            id={`address-${index}`}
            checked={selectedAddress === index}
            onChange={() => setSelectedAddress(index)}
            className="me-2"
          />
          <label htmlFor={`address-${index}`} className="mb-0">
            {addr.fullName} - {addr.address}, {addr.city}, {addr.state}
          </label>
        </div>
      ))}
    </div>
  );
}

export default function AddressCart() {
  const [fullName, setFullName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const dispatch = useDispatch();
  const {
    address: addresses = [],
    status = "idle",
    error = null,
  } = useSelector((state) => state.address || {});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAddress());
    }
  }, [status, dispatch]);

  const addressSubmit = (e) => {
    e.preventDefault();
    const newAddress = { fullName, number, address, landmark, city, state };
    dispatch(addAddress(newAddress)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setFullName("");
        setNumber("");
        setAddress("");
        setLandmark("");
        setCity("");
        setState("");

        const modal = document.getElementById("exampleModal");
        if (modal) {
          modal.classList.remove("show");
          modal.style.display = "none";
          document.body.classList.remove("modal-open");
          const backdrop = document.querySelector(".modal-backdrop");
          if (backdrop) backdrop.remove();
        }

        // Optional: Fetch addresses again if addAddress doesn't update the store directly
        dispatch(fetchAddress());
      }
    });
  };

  const handleProceed = () => {
    if (selectedAddress !== null) {
      const chosenAddress = addresses[selectedAddress];
      console.log("Proceeding with:", chosenAddress);
      // TODO: Add logic to proceed with the selected address
    } else {
      alert("Please select an address to proceed!");
    }
  };

  return (
    <div>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="card p-2">
              <div className="card-body">
                <h3 className="mb-4">Select a delivery address</h3>
                <hr />
                {status === "loading" && <p>Loading addresses...</p>}
                {status === "failed" && <p>Error: {error}</p>}
                {status === "succeeded" && (
                  <AddressDetail
                    addresses={addresses}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                  />
                )}
                <div className="mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-primary me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Add a new delivery address
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleProceed}
                    disabled={selectedAddress === null}
                  >
                    Proceed with Selected Address
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title fs-5" id="exampleModalLabel">
                Add an address
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={addressSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="number" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Flat, House no., Building, Company, Apartment
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="landmark" className="form-label">
                    Landmark
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="landmark"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </div>
                <div className="d-flex gap-3">
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      Town/City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Use This Address
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
