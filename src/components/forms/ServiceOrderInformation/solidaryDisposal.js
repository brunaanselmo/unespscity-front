import { useState, useContext, useEffect } from "react";
import { Container } from "./styles";
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

const SolidaryDisposal = (props) => {
	const { user } = useContext(Context);
	const { srcaddress, phoneOption } = props;
	const [formValues, setFormValues] = useContext(LocalContext);
	const [approximateLocation, setApproximateLocation] = useState(false);
	const [Location, setLocation] = useState(!approximateLocation);
	const [houseNumber, setHouseNumber] = useState();
	const [street, setStreet] = useState("");
	const [referencePoint, setReferencePoint] = useState("");
	const [description, setDescription] = useState("");
	const [district, setDistrict] = useState("");
	const [photos, setPhotos] = useState([]);
	const [donationType, setDonationType] = useState({
		roupas: false,
		eletro: false,
		moveis: false,
		outros: false,
	});

	const handleDonationTypeChange = (event) => {
		const { name, checked } = event.target;
		setDonationType({
			...donationType,
			[name]: checked,
		});
	};

	const containerStyle = {
		width: "100%",
		height: "500px",
	};
	const [center, setCenter] = useState({ lat: 0, lng: 0 });
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((location) => {
			fetchLocation(
				location.coords.latitude,
				location.coords.longitude
			).then((data) => {
				console.log("localizacao abaixo");
				console.log(data);
			});
			setCenter({
				lat: location.coords.latitude,
				lng: location.coords.longitude,
			});
		});
	}, []); // Esse useEffect faz com que isto aqui seja executado somente uma vez // //DENTRO DESTE TEM A API DO GEOCODE, DE JEITO NENHUM CRIE UM LOOP NESTE USEEFFECT
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPSAPIKEY,
	});
	const [map, setMap] = useState(null);
	const options = {
		strokeColor: "#FF0000",
		strokeOpacity: 1,
		strokeWeight: 1.5,
		fillColor: "#FF0000",
		fillOpacity: 0.25,
		clickable: false,
		draggable: false,
		editable: false,
		visible: true,
		radius: 100,
		zIndex: 1,
	};
	const onLoad = (circle) => {
		console.log("Circle onLoad circle: ", circle);
	};
	const onUnmount = (circle) => {
		console.log("Circle onUnmount circle: ", circle);
	};

	const handleSubmit = (event) => {
		//alert("Um nome foi enviado: " + this.state.value);
		event.preventDefault();

		const data = JSON.parse(localStorage.getItem("locationLocalStorage"));

		//console.log("foi enviado para:");
		//console.log(`http://localhost:4000/api${srcaddress}`);
		console.log("cityid " + data.city);
		console.log("street " + street);
		console.log("streetNumber " + houseNumber);
		console.log("referencePoint " + referencePoint);
		console.log("description " + description);

		let uid = user.userId;
		if (uid === undefined) {
			uid = -1;
		}

		if (approximateLocation) {
			//caso a pessoa tenha escolhido mandar com a localizacao aproximada
			if (houseNumber === 0) {
				alert("É obrigatório enviar o número");
				return;
			}
			if (street === "") {
				//tenho que pegar a rua usando o geocode
				fetchLocation(center.lat, center.lng).then((data) => {
					console.log("localizacao abaixo");
					console.log(data.results[0].address_components);
					let parts = data.results[0].address_components;
					parts.forEach((part) => {
						if (part.types.includes("route")) {
							setStreet(part.long_name);
							console.log("RUA: " + part.long_name);
						}
						if (
							part.types.includes(
								"political",
								"sublocality",
								"sublocality_level_1"
							)
						) {
							setDistrict(part.long_name);
							console.log("Bairro: " + part.long_name);
						}
					});
				});
			}
			if (district !== "") {
				const endereco = `${street}, ${district}`;
				setStreet(endereco);
			}
			if (referencePoint === "") {
				setReferencePoint("Sem ponto de referência"); //dad NAO obrigatorio
			}
			if (description === "") {
				alert("É necessário ter uma descrição");
				return;
			}
			const res = api
				.post(srcaddress, {
					data: {
						/*coloque aqui os dados que quer mandar na requisicao */
						cityid: data.city,
						userId: uid,
						street: `${street}, ${district}`,
						streetNumber: houseNumber,
						referencePoint: referencePoint,
						latitude: center.lat,
						longitude: center.lng,
						donationType: donationType,
						description: description,
						images: photos,
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
						toast.error(
							"Erro 404 ocorreu, servidor não pôde ser encontrado!",
							{
								position: toast.POSITION.TOP_RIGHT,
							}
						);
					}
				});
		} else {
			if (houseNumber === 0) {
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
			if (description === "") {
				alert("É necessário ter uma descrição");
				return;
			}

			const res = api
				.post(srcaddress, {
					data: {
						/*coloque aqui os dados que quer mandar na requisicao */
						cityid: data.city,
						userId: uid,
						street: `${street}, ${district}`,
						streetNumber: houseNumber,
						referencePoint: referencePoint,
						latitude: -1,
						longitude: -1,
						donationType: donationType,
						description: description,
						images: photos,
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
						toast.error(
							"Erro 404 ocorreu, servidor não pôde ser encontrado!",
							{
								position: toast.POSITION.TOP_RIGHT,
							}
						);
					}
				});
		
			}

		
	};

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<div className="centered-content">
					<Button
						fullWidth
						variant="outlined"
						onClick={() => {
							setApproximateLocation(true);
							setLocation(false);
						}}
					>
						Usar Localização Aproximada
					</Button>
				</div>
				{approximateLocation && (
					<>
						<div className="centered-content">
							<GoogleMap
								mapContainerStyle={containerStyle}
								center={center}
								radius={100}
								zoom={15}
								onLoad={onLoad}
								onUnmount={onUnmount}
							>
								<Circle
									// optional
									onLoad={onLoad}
									// optional
									onUnmount={onUnmount}
									// required
									center={center}
									// required
									options={options}
								/>
								<></>
							</GoogleMap>
						</div>

						<div className="inputs">
							<Stack spacing={2} direction="row">
								<TextField
									fullWidth
									id="outlined-basic"
									label="Número"
									type="number"
									variant="outlined"
									value={houseNumber}
									onChange={(e) =>
										setHouseNumber(e.target.value)
									}
								/>
								<TextField
									fullWidth
									id="outlined-basic"
									label="Ponto de Referência (opcional)"
									variant="outlined"
									value={referencePoint}
									onChange={(e) =>
										setReferencePoint(e.target.value)
									}
								/>
							</Stack>
							<br />
							<Typography variant="body2">
								Caso o endereço desejado não se encontre dentro
								do círculo vermelho no mapa, por favor, insira o
								endereço manualmente após apertar o botão
								abaixo.
							</Typography>
						</div>
					</>
				)}
				<br />
				<div className="centered-content">
					<Typography variant="body1">Ou, caso preferir</Typography>
				</div>

				<br />
				<div className="centered-content">
					<Button
						fullWidth
						variant="outlined"
						onClick={() => {
							setApproximateLocation(false);
							setLocation(true);
						}}
					>
						Insira a exata localização manualmente
					</Button>
				</div>
				<br />
				{Location && (
					<div className="inputs">
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
								type="number"
								variant="outlined"
								value={houseNumber}
								onChange={(e) => setHouseNumber(e.target.value)}
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
								onChange={(e) =>
									setReferencePoint(e.target.value)
								}
							/>
						</Stack>
					</div>
				)}
				<GrayLine />
				<div
					className="centered-content"
					style={{ flexDirection: "column" }}
				>
					<Typography variant="h5">Tipo de Doação</Typography>
					<br />
					<FormGroup>
						<FormControlLabel
							label="Roupas/Calçados"
							control={
								<Checkbox
									name="roupas"
									checked={donationType.roupas}
									onChange={handleDonationTypeChange}
									inputProps={{ "aria-label": "controlled" }}
								/>
							}
						/>

						<FormControlLabel
							label="Eletrodomésticos"
							control={
								<Checkbox
									name="eletro"
									checked={donationType.eletro}
									onChange={handleDonationTypeChange}
									inputProps={{ "aria-label": "controlled" }}
								/>
							}
						/>
						<FormControlLabel
							label="Móveis"
							control={
								<Checkbox
									name="moveis"
									checked={donationType.moveis}
									onChange={handleDonationTypeChange}
									inputProps={{ "aria-label": "controlled" }}
								/>
							}
						/>
						<FormControlLabel
							label="Outros"
							control={
								<Checkbox
									name="outros"
									checked={donationType.outros}
									onChange={handleDonationTypeChange}
									inputProps={{ "aria-label": "controlled" }}
								/>
							}
						/>
					</FormGroup>
				</div>
				<div className="inputs">
					<Stack spacing={2} direction="row">
						<TextField
							fullWidth
							id="outlined-basic"
							label="Descrição"
							variant="outlined"
							multiline
							rows={5}
							value={description}
							helperText={props.descriptionHelperText}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Stack>
				</div>
				<br />
				<InputPhotos />
				<br />
				<div className="inputs">
					<Button
						fullWidth
						variant="contained"
						type="submit"
						value="Enviar"
					>
						Enviar
					</Button>
				</div>
			</form>
		</Container>
	);
};

export default SolidaryDisposal;
