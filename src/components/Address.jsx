import { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function AddressCart() {
  const [fullName, setFullName] = useState("");
  const [number, setNumber] = useState();

  const addressSubmit = () => {};
  return (
    <div>
      <Header />
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="card p-4">
              <div className="card-body">
                <h3 className="mb-4">Select a delivery address</h3>
                <hr />
                <button
                  type="button"
                  class="btn btn-outline-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Add a new delivery address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title fs-5" id="exampleModalLabel">
                Add an address
              </h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={addressSubmit}>
                <div class="mb-3">
                  <label
                    for="name"
                    class="form-label"
                    onChange={(e) => setFullName(e.target.value)}
                  >
                    Full Name
                  </label>
                  <input type="text" class="form-control" id="name" />
                </div>
                <div class="mb-3">
                  <label for="number" class="form-label">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="number"
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label">
                    Flat, House no., Building, Company, Apartment
                  </label>
                  <input type="text" class="form-control" id="address" />
                </div>
                <div class="mb-3">
                  <label for="address" class="form-label">
                    Landmark
                  </label>
                  <input type="text" class="form-control" id="landmark" />
                </div>
                <div className="d-flex gap-3">
                  <div class="mb-3">
                    <label for="address" class="form-label">
                      Town/City
                    </label>
                    <input type="text" class="form-control" id="landmark" />
                  </div>
                  <div class="mb-3">
                    <label for="address" class="form-label">
                      State
                    </label>
                    <input type="text" class="form-control" id="landmark" />
                  </div>
                </div>

                <button type="submit" class="btn btn-primary">
                  Use This address
                </button>
              </form>
            </div>
            {/* <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
