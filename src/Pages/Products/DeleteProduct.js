import React from "react";
import { Modal, ModalBody, Button, ModalFooter } from "reactstrap";
import { DeleteProduct } from "../../Redux/Reducer/Orders";
import { useDispatch } from "react-redux";

function DeleteProductModal({ modal, toggle, item }) {
  const dispatch = useDispatch();

  function del() {
    dispatch(DeleteProduct(item.id));
    // console.log(item.id)
    toggle();
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <h3 className="bg-light pt-3 pb-3 text-center text-secondary">
          <i className="bi bi-trash3"></i>
        </h3>
        <ModalBody>
          <h3 className="text-center">
            Do you really want to delete this item?
          </h3>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button onClick={del} color="danger">
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteProductModal;
