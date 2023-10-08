import axios from "axios";
import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { SERVER_PATH } from "../../utils/CONSTs";

const TaxSlicesTable = () => {
  const [slices, setSlices] = useState([]);

  const handleDeleteClick = (id) => {
    axios
      .delete(`${SERVER_PATH}incomeTaxSlice/${id}`)
      .then((res) => {
        setSlices(slices.filter((slice) => slice.slice !== id));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get(`${SERVER_PATH}incomeTaxSlice`)
      .then((res) => {
        setSlices(res.data);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mt-4 bg-light pt-3 pb-3">
      <h3>Hello</h3>
      <Table striped bordered hover variant="light" size="xl">
        <thead>
          <tr>
            <th>#</th>
            <th>de</th>
            <th>à</th>
            <th>Pourcentage</th>
          </tr>
        </thead>
        <tbody>
          {slices
            .sort((a, b) => a.slice - b.slice)
            .map((slice) => (
              <tr key={slice.slice}>
                <td>{slice.slice}</td>
                <td>{slice.from}</td>
                <td>{slice.to}</td>
                <td>{slice.percentage} %</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(slice.slice)}
                    className="mx-2"
                  >
                    X
                  </Button>
                  <Button variant="info">Edit</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TaxSlicesTable;
