import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { Button, Container, Stack, Form, Table } from "react-bootstrap";

const TaxSlicesTable = () => {
  const [slices, setSlices] = useState([]);

  useEffect(() => {

    axios
        .get("http://localhost:8080/incomeTaxSlice")
        .then((res) => {
          setSlices(res.data);
          console.log(slices)
        })

        .catch((err) => console.log(err));
  }, []);
  return (
    <Container className="mt-4 bg-light pt-3 pb-3" fluid="sm">
      <h3>Hello</h3>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>#</th>
            <th>de</th>
            <th>à</th>
            <th>Pourcentage</th>
          </tr>
        </thead>
        <tbody>
          {slices.sort((a, b)=> a.slice - b.slice).map((slice) => (<tr key={slice.slice}>
            <td>{slice.slice}</td>
            <td>{slice.from}</td>
            <td>{slice.to}</td>
            <td>{slice.percentage} %</td>
            </tr>)
            
          )}
          
        </tbody>
      </Table>
      
    </Container>
  );
};

export default TaxSlicesTable;
