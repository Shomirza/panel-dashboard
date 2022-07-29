import { React, useState, useRef } from "react";
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { useDispatch } from "react-redux";
import axios from "axios";
import Collecting from "../Create/Collecting.png";
import { EditProduct } from "../../Redux/Reducer/Orders";
import Loader from "../../Loader/loader"

function EditModal({ modal, toggle, edit }) {
  const [img, setImg] = useState("");
  const [loader, setLoader] = useState("");
  const useVal = useRef("");
  const dispatch = useDispatch();

  function Submit(event, errors, values) {
    let value = {
      ...values,
      id: edit.id,
      createdAt: edit.createdAt,
      imageId: img ? img : edit.imageId,
    };
    dispatch(EditProduct(value));
    setImg("")
    toggle();
  }

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
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalBody>
          <AvForm id={"f"} onSubmit={Submit} model={edit ? edit : {}}>
            <AvField
              className={"AvField"}
              label={"Product Name"}
              name={"productName"}
            />
            <AvField className={"AvField"} label={"Amount"} name={"amount"} />
            <AvField className={"AvField"} label={"Price"} name={"price"} />
            <AvField
              className={"AvField"}
              label={"Select category"}
              type={"select"}
              name={"category"}
            >
              <option value={""}>Select category</option>
              <option value="computer">Computers</option>
              <option value="smartphone">Smartphones</option>
              <option value="watch">Watches</option>
              <option value="other">Other</option>
            </AvField>
            <AvField
              className={"AvField"}
              label={"Description"}
              type={"textarea"}
              name={"description"}
              required
            />
            <h5 className="d-flex justify-content-between mt-3">
              Add Images
              {img ? (
                <b
                  className={"cancel text-danger"}
                  onClick={() => {
                    setImg("");
                    setLoader(false);
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
                    <div className="load">
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
              ref={useVal}
              onChange={Upload}
              className={"d-none"}
            />
          </AvForm>
        </ModalBody>
        <ModalFooter>
          <Button form={"f"} color={"success"}>
            Edit Product
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EditModal;

/* 

*/
