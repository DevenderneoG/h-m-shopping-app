import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddress, addAddress, updateAddress, removeAddress } from "./addressSlice";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function AddressDetail({
  addresses,
  selectedAddress,
  setSelectedAddress,
  onEdit,
  onDelete
}) {
  return (
    <div>
      <h4 className="mb-4">Delivery addresses ({addresses.length})</h4>
      {addresses.map((addr, index) => (
        <div className="mb-3" key={addr._id || index}>
          <div className="d-flex align-items-center">
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
          <div>
            <button
              type="button"
              className="btn btn-link btn-sm"
              onClick={() => onEdit(addr)}
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-dismiss="modal"
            >
              Edit Address
            </button>
            <button
              type="button"
              className="btn btn-link btn-sm text-danger"
              onClick={() => onDelete(addr._id)}
            >
              Delete Address
            </button>
          </div>
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
  const [editingAddress, setEditingAddress] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const resetForm = () => {
    setFullName("");
    setNumber("");
    setAddress("");
    setLandmark("");
    setCity("");
    setState("");
    setEditingAddress(null);
  };

  const closeModal = () => {
    const modal = document.getElementById("exampleModal");
    if (modal) {
      modal.classList.remove("show");
      modal.style.display = "none";
      document.body.classList.remove("modal-open");
      const backdrop = document.querySelector(".modal-backdrop");
      if (backdrop) backdrop.remove();
    }
  };

  const addressSubmit = (e) => {
    e.preventDefault();
    const addressData = { fullName, number, address, landmark, city, state };

    if (editingAddress) {
      dispatch(updateAddress({ id: editingAddress._id, addressData }))
        .unwrap()
        .then(() => {
          toast.success("Address updated successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          closeModal();
          dispatch(fetchAddress()); // Refresh address list
          resetForm();
        })
        .catch((err) => {
          toast.error(
            "Failed to update address: " + (err.message || "Unknown error"),
            {
              position: "top-right",
              autoClose: 3000,
            }
          );
        });
    } else {
      dispatch(addAddress(addressData))
        .unwrap()
        .then(() => {
          resetForm();
          closeModal();
          dispatch(fetchAddress());
        })
        .catch((err) => {
          alert("Failed to add address: " + (err.message || "Unknown error"));
        });
    }
  };

  const handleEdit = (addr) => {
    setEditingAddress(addr);
    setFullName(addr.fullName);
    setNumber(addr.number);
    setAddress(addr.address);
    setLandmark(addr.landmark);
    setCity(addr.city || "");
    setState(addr.state);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      dispatch(removeAddress({ id }))
        .unwrap()
        .then(() => {
          toast.success("Address deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          // fetchAddress already called in removeAddress thunk
        })
        .catch((err) => {
          toast.error("Failed to delete address: " + (err.message || "Unknown error"), {
            position: "top-right",
            autoClose: 3000,
          });
        });
    }
  };

  const handleProceed = () => {
    if (selectedAddress !== null) {
      const chosenAddress = addresses[selectedAddress];
      console.log("Proceeding with:", chosenAddress);
      // Navigate to checkout page with selected address as state
      navigate("/checkout", { state: { selectedAddress: chosenAddress } });
    } else {
      toast.warn("Please select an address to proceed!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  
  // const handleProceed = () => {
  //   if (selectedAddress !== null) {
  //     const chosenAddress = addresses[selectedAddress];
  //     console.log("Proceeding with:", chosenAddress);
  //     // TODO: Add logic to proceed with the selected address
  //   } else {
  //     toast.warn("Please select an address to proceed!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //   }
  // };

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
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )}
                <div className="mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-primary me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={resetForm}
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
                {editingAddress ? "Edit Address" : "Add an address"}
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={resetForm}
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
                    required
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
                    required
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
                    required
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
                    required
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
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  {editingAddress ? "Update Address" : "Use This Address"}
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
