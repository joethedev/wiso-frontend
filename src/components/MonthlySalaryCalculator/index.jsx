import axios from "axios";
import { useState, useRef } from "react";
import { Button, Container, Stack, Form } from "react-bootstrap";
import serverPath from "../../utils/CONSTs"


const MonthlySalaryCalculator = () => {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const SERVER_PATH = serverPath()


  const annualRef = useRef();
  const salaryRef = useRef();


  const handleSubmit = () => {

    const annualValue = annualRef.current.value
   
    let salaryType = salaryRef.current.value === "Brut" ?  "gross" : "net"

    if (annualValue > 999999) {
      setMessage("Sauf si vous êtes Mbappé, votre salaire ne doit pas dépasser 999 999,0 €")
    }else if (annualValue) {
      setMessage("")
      axios
        .get(`${SERVER_PATH}salary/${salaryType}/${annualValue}`)
        .then((res) => {
          setResult(res.data);
        })

        .catch((err) => console.log(err));
    }
  };

  
  return (
    <div>
      <Container className="mt-4 bg-light pt-3 pb-3" fluid="sm">
        <h3>Calculer le salaire mensuel:</h3>

        <Form>
          <Form.Group controlId="annual">
            <Form.Control
              placeholder="Veuillez saisir le salaire annuel"
              ref={annualRef}
              type="number"
              required
            />
            <p style={{fontSize: 10 + "px", color: "red"}}>{message}</p>
          </Form.Group>
          <Stack direction="horizontal" className="mt-3" gap="2">
            <Form.Select ref={salaryRef}>
              <option hidden={true}>Brut/Net</option>
              <option>Brut</option>
              <option>Net</option>
            </Form.Select>
            <Button onClick={handleSubmit}>Calculer</Button>
          </Stack>
        </Form>

        {result.monthlySalary ? (
          <p className="mt-3">
           Votre salaire mensuel {salaryRef.current.value} est:{" "}
            <strong>{result.monthlySalary}€</strong>
          </p>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
};

export default MonthlySalaryCalculator;
