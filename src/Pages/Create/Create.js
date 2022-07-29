import { React, useRef, useState } from "react";
import {
  AvForm,
  AvField,
  AvInput,
  AvGroup,
} from "availity-reactstrap-validation";
import { Label } from "reactstrap";
import Collecting from "./Collecting.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddProduct } from "../../Redux/Reducer/Orders";
import Loader from "../../Loader/loader";

function Create() {
  const toggle = useRef(null);
  const [img, setImg] = useState(null);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function Upload(e) {
    setLoader(true);
    const onload = e.target.files[0];
    const formData = new FormData();
    formData.append("image", onload);
    axios({
      url: "https://store-management-backend-app.herokuapp.com/api/v1/attachment",
      method: "POST",
      data: formData,
    }).then((res) => {
      setImg(res.data);
    });
  }

  function Submit(event, errors, values) {
    if (errors.length === 0) {
      let value = {
        ...values,
        imageId: img,
      };
      dispatch(AddProduct(value));
      navigate("/products");
    }
  }

  return (
    <div>
      <AvForm id={"submit"} onSubmit={Submit}>
        <div className="d-flex form flex-wrap justify-content-around p-4">
          <div className="firstForm col-md-7 col-11 p-3 mb-3 formShadow">
            <h3>Create a new product</h3>
            <AvField
              name={"productName"}
              placeholder={"Product name"}
              className={"AvField"}
              required
            />
            <AvGroup>
              <Label for={"description"}>
                <h5>Description</h5>
              </Label>
              <AvInput
                type={"textarea"}
                name={"description"}
                id={"description"}
                placeholder={"Write something awesome"}
                className={"AvField"}
              />
            </AvGroup>
            <h5 className="d-flex justify-content-between">
              Add Images
              {img ? (
                <b
                  className={"cancel text-danger"}
                  onClick={() => {
                    setLoader(false);
                    setImg("");
                  }}
                >
                  <i className="bi bi-x-lg"></i>
                </b>
              ) : (
                ""
              )}
            </h5>
            <label htmlFor={"ChooseImg"} className={"w-100"}>
              {img ? (
                <div className={"selectedImg w-100"}>
                  <img
                    className={"w-100"}
                    src={`https://store-management-backend-app.herokuapp.com/api/v1/attachment/${img}`}
                    alt="product"
                  />
                </div>
              ) : (
                <div>
                  {loader ? (
                    <div className="load mt-4">
                      <Loader />
                    </div>
                  ) : (
                    <div className="ChooseImg d-flex justify-content-center align-items-center">
                      <img
                        className="Collecting"
                        src={Collecting}
                        alt="Collecting"
                      />
                      <div>
                        <h3>Drop or Select file</h3>
                        <h6>
                          Drop files here or click browse thorough your machine
                        </h6>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </label>
            <input
              type="file"
              id={"ChooseImg"}
              onChange={Upload}
              className={"d-none"}
            />
          </div>
          <div className="secondForm col-md-4 col-11 mb-5">
            <div className="bg-white formShadow p-3">
              <AvField
                name={"price"}
                placeholder={"Price"}
                className={"AvField"}
                required
              />
              <AvGroup>
                <Label for={"category"}>
                  <h5> Select a Category </h5>
                </Label>
                <AvField
                  type={"select"}
                  name={"category"}
                  className={"AvField"}
                  id={"category"}
                  required
                >
                  <option value="computer">Computers</option>
                  <option value="smartphone">Smartphones</option>
                  <option value="watch">Watches</option>
                  <option value="other">Other</option>
                </AvField>
              </AvGroup>
              <AvField
                name={"amount"}
                placeholder={"Amount"}
                className={"AvField mt-4"}
                required
              />
            </div>
            <button className="Btn AvField mt-4" form={"submit"}>
              Create Product
            </button>
          </div>
        </div>
      </AvForm>
    </div>
  );
}

export default Create;
