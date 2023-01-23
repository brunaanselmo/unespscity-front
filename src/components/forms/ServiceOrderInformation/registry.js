import { useState, useContext, useEffect } from "react";
import { Container } from "./stylesRegistry";
import Button from "@mui/material/Button";
import LocalContext from "../../../pages/user-location/Context";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import GrayLine from "../../styled-components/gray-line";
import InputPhotos from "../../images-input";
import { FormGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { api } from "../../../services/api";
import { fetchLocation } from "../../../services/GoogleMaps";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { Circle } from "@react-google-maps/api";
import { Context } from "../../../context/Auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Registry = (props) => {
  const { user } = useContext(Context);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const { srcaddress, phoneOption } = props;
  const [formValues, setFormValues] = useContext(LocalContext);
  const [approximateLocation, setApproximateLocation] = useState(false);
  const [Location, setLocation] = useState(!approximateLocation);
  const [streetNumber, setStreetNumber] = useState("");
  const [street, setStreet] = useState("");
  const [referencePoint, setReferencePoint] = useState("");
  const [district, setDistrict] = useState("");
  const [car, setCar] = useState("");
  const [sign, setSign] = useState("");


  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  

		localStorage.setItem(
			"locationLocalStorage",
			JSON.stringify(name, cpf, street, streetNumber, district, referencePoint, car, sign)
		);

    

  const handleSubmit = (event) => {
    //alert("Um nome foi enviado: " + this.state.value);
          event.preventDefault();

		      const data = JSON.parse(localStorage.getItem("locationLocalStorage"));
          
          //console.log("foi enviado para:");
          //console.log(`http://localhost:4000/api${srcaddress}`);
          console.log("name " + name);
          console.log("cityid " + data.city);
          console.log("street " + street);
          console.log("streetNumber " + streetNumber);
          console.log("referencePoint " + referencePoint);
          console.log("sign" + sign);

          let uid = user.userId;
          if (uid === undefined) {
            uid = -1;
          }

          if (streetNumber === "") {
            alert("É obrigatório enviar o número");
            return;
          }
          if (street === "") {
            alert("É obrigatório enviar a rua");
            return;
          }
          if (referencePoint === "") {
            setReferencePoint("Sem ponto de referência"); //dad NAO obrigatorio
          }
          if (name === "") {
            alert("É necessário cadastrar um nome");
            return;
          }
          if (cpf === "") {
            alert("É necessário cadastrar um CPF");
            return;
          }
          if (car === "") {
            alert("É necessário cadastrar um carro");
            return;
          }
          if (sign === "") {
            alert("É necessário cadastrar uma placa");
            return;
          }

          if (data.city === undefined && data.state === undefined) {
            setFormValues({
              ...formValues,
              state: 'SP',
              city: 3541406,
            });
          }
 
            const res = api
              .post(srcaddress, {
                data: {
                  /*coloque aqui os dados que quer mandar na requisicao */
                  cityid: data.city,
                  userId: uid,
                  street: street,
                  streetNumber: streetNumber,
                  referencePoint: referencePoint,
                  latitude: -1,
                  longitude: -1,
                  name: name,
                  cpf: cpf,
                  car: car,
                  sign: sign,
                },
              })
              .then((response) => {
                console.log(response);
                toast.success("Formulário enviado com sucesso", {
                  position: toast.POSITION.TOP_RIGHT,
                });
              })
              .catch((e) => {
                console.log(e);
                if (e.response.status === 404) {
                  toast.error("Erro 404 ocorreu, servidor não pôde ser encontrado!", {
                    position: toast.POSITION.TOP_RIGHT,
                  });
                }
              });

              console.log("aquiiiiii", data.cpf)
  };

  
    return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="centered-content">
          <br />
          {Location && (
            <div className="inputs">
              <Stack spacing={2} direction="row">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Nome"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Stack>
              <br />
              <Stack spacing={2} direction="row">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="CPF"
                  variant="outlined"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </Stack>
              <br />
              <Stack spacing={2} direction="row">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Carro"
                  variant="outlined"
                  value={car}
                  onChange={(e) => setCar(e.target.value)}
                />

                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Placa"
                  variant="outlined"
                  value={sign}
                  onChange={(e) => setSign(e.target.value)}
                />
              </Stack>
              <br />
              <Stack spacing={2} direction="row">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Rua"
                  variant="outlined"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </Stack>
              <br />
              <Stack spacing={2} direction="row">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Bairro"
                  variant="outlined"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Número"
                  variant="outlined"
                  value={streetNumber}
                  onChange={(e) => setStreetNumber(e.target.value)}
                />
              </Stack>
              <br />
              <Stack spacing={2} direction="row">
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Ponto de Referência (opcional)"
                  variant="outlined"
                  value={referencePoint}
                  onChange={(e) => setReferencePoint(e.target.value)}
                />
              </Stack>
            </div>
          )}
        </div>
        <GrayLine />

     
        <div className="inputs">
          <Button fullWidth variant="contained" type="submit" value="Enviar">
            Enviar
          </Button>
        </div>
      </form>
    </Container>
  );

};


export default Registry;
