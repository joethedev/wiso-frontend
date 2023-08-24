import axios from "axios";
import { useState, useRef } from "react";
import { Button, Container, Stack, Form } from "react-bootstrap";
import { SERVER_PATH } from "../../utils/CONSTs";

const MonthlySalaryCalculator = () => {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const annualRef = useRef();
  const salaryRef = useRef();

  const handleSubmit = () => {
    const annualValue = annualRef.current.value;

    console.log(annualValue);
    let salaryType =
      salaryRef.current.value === "Brut"
        ? "gross"
        : salaryRef.current.value === "Net"
        ? "net"
        : "erreur";

    if (annualValue < 20966.4 || annualValue > 999999) {
      setMessage("Il faut saisir une valeur entre 20966.4 et 999 999,0 €");
    } else if (salaryType === "erreur") {
      setMessage("Il faut choisir le type de salaire");
    } else {
      setMessage("");
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
            <p style={{ fontSize: 10 + "px", color: "red" }}>
              {message ===
                "Il faut saisir une valeur entre 20966.4 et 999 999,0 €" ? message : ""}
            </p>
          </Form.Group>
          <Stack direction="horizontal" className="mt-3" gap="2">
            <Form.Select ref={salaryRef}>
              <option hidden={true}>Brut/Net</option>
              <option>Brut</option>
              <option>Net</option>
            </Form.Select>
            <p style={{ fontSize: 10 + "px", color: "red" }}>
              {message === "Il faut choisir le type de salaire" ? message : ""}
            </p>
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
