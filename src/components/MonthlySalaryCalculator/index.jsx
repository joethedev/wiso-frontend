import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Button, Container, Stack, Form } from "react-bootstrap";

const MonthlySalaryCalculator = () => {
  const [annual, setAnnual] = useState("");
  const [result, setResult] = useState("");
  const [select, setSelect] = useState("");

  const annualRef = useRef();
  const salaryType = useRef();

  const handleSelectChange = () => {
    setSelect(salaryType.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnnual(annualRef.current.value);
  };

  useEffect(() => {
    let salType = ""

    select === "Brut" ? salType = "gross" : salType = "net"

    if (annual) {
      axios
        .get(`http://localhost:8080/salary/${salType}/${annual}`)
        .then((res) => {
          setResult(res.data);
        })

        .catch((err) => console.log(err));
    }
  }, [annual]);
  return (
    <div>
      <Container className="mt-4 bg-light pt-3 pb-3" fluid="sm">
        <h3>Calculer le salaire mensuel:</h3>

        <Form onClick={handleSubmit}>
          <Form.Group controlId="annual">
            <Form.Control
              placeholder="Veuillez saisir le salaire annuel"
              ref={annualRef}
              type="number"
              required
            />
          </Form.Group>
          <Stack direction="horizontal" className="mt-3" gap="2">
            <Form.Select onChange={handleSelectChange} ref={salaryType}>
              <option hidden={true}>Brut/Net</option>
              <option>Brut</option>
              <option>Net</option>
            </Form.Select>
            <Button>Calculer</Button>
          </Stack>
        </Form>

        {result.monthlySalary ? (
          <p className="mt-3">
            Votre salaire mensuel {select} est:{" "}
            <strong>{result.monthlySalary}</strong>
          </p>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};

export default MonthlySalaryCalculator;
