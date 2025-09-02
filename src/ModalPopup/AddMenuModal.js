import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { Formik } from "formik";
import * as Yup from "yup";
import { fetchGstSlabs } from "../redux/action/GstSlabAction";

const MenuModal = ({ show, onHide, onSave, categories = [], initialData = null }) => {
  const [menuId, setMenuId] = useState(initialData?.menuId || "");
  const dispatch = useDispatch();
  const { gstSlabs = [], loading, error } = useSelector((state) => state.gstSlab || {});

  useEffect(() => {
    dispatch(fetchGstSlabs());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#27500B" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#27500B",
      },
    }),
  };

  const validationSchema = Yup.object({
    itemName: Yup.string()
      .required("Item Name is required.")
      .matches(/^[A-Za-z\s]+$/, "Item Name must contain only alphabets"),
    price: Yup.number()
      .positive("Price must be greater than 0.")
      .required("Price is required."),
    categoryId: Yup.string().required("Category is required."),
    description: Yup.string()
      .required("Description is required.")
      .matches(/^[A-Za-z\s]+$/, "Description must contain only alphabets"),
    isVegetarian: Yup.boolean(),
    isAvailable: Yup.boolean(),
    gstSlabId: Yup.number().required("GST Slab is required."),
  });

  const handleSubmit = (values) => {
    const menuData = {
      ...(menuId !== "" && { menuId: parseInt(menuId, 10) }),
      ...values,
      price: parseFloat(values.price),
      gstSlabId: values.gstSlabId ? parseInt(values.gstSlabId, 10) : null,
    };
    onSave(menuData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          {initialData ? "Edit Menu Item" : "Add Menu Item"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            itemName: initialData?.itemName || "",
            price: initialData?.price || "",
            categoryId: initialData?.categoryId || "",
            description: initialData?.description || "",
            isVegetarian: initialData?.isVegetarian || false,
            isAvailable: initialData?.isAvailable || true,
            gstSlabId: initialData?.gstSlabId || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
            errors,
            touched,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="itemName" className="mb-3">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  type="text"
                  name="itemName"
                  value={values.itemName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.itemName && errors.itemName}
                />
                {errors.itemName && touched.itemName && (
                  <div className="text-danger">{errors.itemName}</div>
                )}
              </Form.Group>

              <Form.Group controlId="price" className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.price && errors.price}
                />
                {errors.price && touched.price && (
                  <div className="text-danger">{errors.price}</div>
                )}
              </Form.Group>

              <div className="input-block mb-3">
                <label className="col-form-label">Category</label>
                <Select
                  options={categories.map((category) => ({
                    label: category.categoryName,
                    value: category.categoryId,
                  }))}
                  placeholder="Select Category..."
                  styles={customStyles}
                  value={
                    values.categoryId
                      ? {
                          label: categories.find(
                            (cat) => cat.categoryId === values.categoryId
                          )?.categoryName,
                          value: values.categoryId,
                        }
                      : null
                  }
                  onChange={(selectedOption) =>
                    setFieldValue("categoryId", selectedOption.value)
                  }
                />
                {errors.categoryId && touched.categoryId && (
                  <div className="text-danger">{errors.categoryId}</div>
                )}
              </div>

              <Form.Group controlId="description" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.description && errors.description}
                />
                {errors.description && touched.description && (
                  <div className="text-danger">{errors.description}</div>
                )}
              </Form.Group>

              <div className="col-lg-6 d-flex justify-content-between gap-5 align-items-center mb-3 mt-2">
                <Form.Group controlId="isVegetarian" className="d-flex align-items-center">
                  <Form.Label className="me-2 mt-2">Vegetarian</Form.Label>
                  <label className="switch" style={{ transform: "scale(0.8)" }}>
                    <input
                      type="checkbox"
                      name="isVegetarian"
                      checked={values.isVegetarian}
                      onChange={(e) =>
                        setFieldValue("isVegetarian", e.target.checked)
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                </Form.Group>

                <Form.Group controlId="isAvailable" className="d-flex align-items-center">
                  <Form.Label className="me-2 mt-2">Available</Form.Label>
                  <label className="switch" style={{ transform: "scale(0.8)" }}>
                    <input
                      type="checkbox"
                      name="isAvailable"
                      checked={values.isAvailable}
                      onChange={(e) =>
                        setFieldValue("isAvailable", e.target.checked)
                      }
                    />
                    <span className="slider round"></span>
                  </label>
                </Form.Group>
              </div>

              <Form.Group controlId="gstSlabId" className="mb-3">
                <Form.Label>GST Slab</Form.Label>
                <Select
                  options={gstSlabs.map((slab) => ({
                    label: slab.gstSlabId,
                    value: slab.gstSlabId,
                  }))}
                  placeholder="Select GST Slab..."
                  styles={customStyles}
                  value={
                    values.gstSlabId
                      ? {
                          label: gstSlabs.find((slab) => slab.gstSlabId === values.gstSlabId)?.gstSlabId || "",
                          value: values.gstSlabId,
                        }
                      : null
                  }
                  onChange={(selectedOption) =>
                    setFieldValue("gstSlabId", selectedOption.value)
                  }
                />
                {errors.gstSlabId && touched.gstSlabId && (
                  <div className="text-danger">{errors.gstSlabId}</div>
                )}
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                {initialData ? "Update" : "Add"}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default MenuModal;
