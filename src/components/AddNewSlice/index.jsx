import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { SERVER_PATH } from "../../utils/CONSTs";

const AddNewSlice = () => {
  const fromRef = useRef();
  const toRef = useRef();
  const percentageRef = useRef();
  const sliceRef = useRef();
  const [slices, setSlices] = useState([]);
  const [error, setError] = useState("");
  const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    axios
      .get(`${SERVER_PATH}incomeTaxSlice`)
      .then((res) => {
        setSlices(res.data);
      })

      .catch((err) => console.log(err));
  }, []);

  const arr = slices.map((slice) => slice.slice);

  const newArr = numbersArray.filter((value) => !arr.includes(value));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (sliceRef.current.value == "Slice number...") {
      setError(`Vous devez choisir un numéro de slice`);
      return;
    }

    const nextId = sliceRef.current.value;
    const prevId = sliceRef.current.value;

    let prevSlice;
    let nextSlice;
    for (let i = prevId; i > -1; i--) {
      console.log("before if:", i);
      if (slices[i]) {
        prevSlice = slices[i];
        break;
      }
    }

    for (let i = nextId; i < 10; i++) {
      if (slices[i]) {
        nextSlice = slices[i];
        break;
      }
    }
    if (prevSlice) {
      if (prevSlice.to > fromRef.current.value) {
        setError(`Cette valeur doit etre superieur à`);
        return;
      }
    }
    if (nextSlice) {
      if (nextSlice.from < toRef.current.value) {
        setError(`Cette valeur doit etre inferieur à`);
        return;
      }
    }

    if (fromRef.current.value > toRef.current.value) {
      setError("La valeur FROM doit etre inferieur à la valeur TO");
      return;
    }

    if (percentageRef.current.value > 99) {
      setError("Le percentage doit etre inferieur à 100");
      return;
    }

    const slice = {
      from: fromRef.current.value,
      percentage: percentageRef.current.value,
      slice: sliceRef.current.value,
      to: toRef.current.value,
    };
    axios
      .post(`${SERVER_PATH}incomeTaxSlice`, slice)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  };

  return (
    <div
      className="bg-light pt-3 pb-3"
      style={{
        width: "70%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Slice number</Form.Label>
          <Form.Select ref={sliceRef}>
            <option hidden={true}>Slice number...</option>
            {arr.map((slice) => (
              <option disabled style={{ backgroundColor: "lightgray" }}>
                {slice}
              </option>
            ))}
            {newArr.map((slice) => (
              <option>{slice}</option>
            ))}
          </Form.Select>
          {error === "Vous devez choisir un numéro de slice" ? (
            <p style={{ color: "red", fontSize: 9 }}>
              Vous devez choisir un numéro de slice
            </p>
          ) : (
            ""
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>From</Form.Label>
          <Form.Control
            placeholder="from..."
            ref={fromRef}
            type="number"
            required
          />
          {error === "La valeur FROM doit etre inferieur à la valeur TO" ? (
            <p style={{ color: "red", fontSize: 9 }}>
              La valeur FROM doit etre inferieur à la valeur TO
            </p>
          ) : (
            ""
          )}
          {error.includes("Cette valeur doit etre superieur à") ? (
            <p style={{ color: "red", fontSize: 9 }}>
              Cette valeur doit etre superieur au slice precedent
            </p>
          ) : (
            ""
          )}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>To</Form.Label>
          <Form.Control
            placeholder="to..."
            ref={toRef}
            type="number"
            required
          />
        </Form.Group>
        {error.includes("Cette valeur doit etre inferieur à") ? (
          <p style={{ color: "red", fontSize: 9 }}>
            Cette valeur doit etre inferieur à
          </p>
        ) : (
          ""
        )}
        <Form.Group className="mb-3">
          <Form.Label>Percentage</Form.Label>
          <Form.Control
            placeholder="Percentage"
            ref={percentageRef}
            type="number"
            required
          />
          {error === "Le percentage doit etre inferieur à 100" ? (
            <p style={{ color: "red", fontSize: 9 }}>
              Le percentage doit etre inferieur à 100%
            </p>
          ) : (
            ""
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddNewSlice;
