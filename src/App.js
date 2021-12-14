import { useEffect, useState } from "react";
import { predictCrime } from "./API";
import {
	Button,
	Container,
	Divider,
	Form,
	Header,
	Input,
	Segment,
	Message,
	Icon,
} from "semantic-ui-react";
function App() {
	const [sAge, setSAge] = useState(0);
	const [vAge, setVAge] = useState(0);
	const [vSex, setVSex] = useState(2);
	const [sSex, setSSex] = useState(2);
	const [placeOfCrime, setPlaceOfCrime] = useState(0);
	const [suspectUseOF, setSuspectUseOF] = useState(9);
	const [results, setResults] = useState({});
	const [messageVisible, setMessageVisible] = useState(false);
	const [prediction, setPrediction] = useState({});
	const [otherPred, setOtherPred] = useState([]);

	const predict = async () => {
		// return;
		if (isNaN(sAge)) {
			alert("Suspect Age Is Not A Number ");
		} else if (isNaN(parseInt(vAge))) {
			alert("Victim Age Is Not A Number ");
		} else {
			const input = {
				v_age: parseInt(vAge),
				v_sex: vSex,
				s_age: parseInt(sAge),
				s_sex: sSex,
				s_use_of: suspectUseOF,
				place: placeOfCrime,
			};
			setMessageVisible(true);

			setResults(await predictCrime(input));
		}
	};

	useEffect(() => {
		// console.log(
		// 	parseInt(results["decision tree"]["confidence"].replace("%", "")),
		// );
		console.log(results);
		let tempPred = {};
		const algos = Object.keys(results);
		for (let i in algos) {
			const currConfi = parseInt(
				results[algos[i]]["confidence"].replace("%", ""),
			);
			if (
				currConfi > tempPred["confidence"] ||
				tempPred["confidence"] === undefined
			) {
				tempPred = {
					algorithm: algos[i],
					prediction: results[algos[i]]["prediction"],
					confidence: results[algos[i]]["confidence"],
				};
			}
		}
		setPrediction(tempPred);
		const tempArr = [];
		for (let i in algos) {
			if (algos[i] !== tempPred["algorithm"]) {
				tempArr.push(
					`${algos[i]} algorithm predicted ${
						results[algos[i]]["prediction"]
					}, with a confidence of ${results[algos[i]]["confidence"]}`,
				);
			}
		}
		setOtherPred(tempArr);
	}, [results]);

	return (
		<Segment inverted style={{ minHeight: 700, padding: "1em 0em" }} vertical>
			<Container>
				{messageVisible ? (
					Object.keys(prediction).length !== 0 ? (
						<Message
							success
							size='huge'
							list={otherPred}
							header={`The prediction is ${prediction["prediction"]} by ${prediction["algorithm"]} algorithm, with a confidence of ${prediction["confidence"]}`}
							onDismiss={() => setMessageVisible(false)}
						/>
					) : (
						<Message icon warning>
							<Icon name='circle notched' loading />
							<Message.Content>
								<Message.Header>Just one second</Message.Header>
								The algorithms are figuring it out.
							</Message.Content>
						</Message>
					)
				) : (
					<Segment hidden></Segment>
				)}
				<Header
					as='h1'
					content='Crime Prediction'
					inverted
					style={{
						fontSize: "4em",
						fontWeight: "normal",
						marginBottom: 0,
						textAlign: "center",
					}}
				/>
			</Container>
			<Divider hidden />
			<Container style={{ width: "70%" }}>
				<Form inverted>
					<Form.Group widths='equal'>
						<Form.Field>
							<label>Victim Age</label>
							<Input
								fluid
								placeholder='Victim Age'
								value={vAge}
								onChange={(e) => {
									setVAge(e.target.value);
								}}
							/>
						</Form.Field>

						<Form.Select
							fluid
							label='Victim Sex'
							options={sexOptions}
							placeholder='Victim Sex'
							onChange={(e, { value }) => setVSex(value)}
						/>
					</Form.Group>

					<Divider hidden />
					<Form.Group widths='equal'>
						<Form.Field>
							<label>Suspect Age</label>
							<Input
								fluid
								placeholder='Suspect Age'
								value={sAge}
								onChange={(e) => {
									setSAge(e.target.value);
								}}
							/>
						</Form.Field>

						<Form.Select
							fluid
							label='Suspect Sex'
							options={sexOptions}
							placeholder='Suspect Sex'
							onChange={(e, { value }) => setSSex(value)}
						/>
					</Form.Group>
				</Form>
				<Divider hidden />
				<Form inverted>
					<Form.Group widths='equal'>
						<Form.Select
							fluid
							label='Place of Crime'
							options={placeOfCrimeOptions}
							placeholder='Place of Crime'
							onChange={(e, { value }) => setPlaceOfCrime(value)}
						/>
						<Form.Select
							fluid
							label='Suspect Use of'
							options={suspectUseOf}
							placeholder='Suspect Use of'
							onChange={(e, { value }) => setSuspectUseOF(value)}
						/>
					</Form.Group>
				</Form>

				<Form>
					<Form.Group widths='equal'>
						<Form.Field></Form.Field>
						<Form.Field></Form.Field>
						<Form.Field></Form.Field>
						<Form.Field></Form.Field>
						<Form.Field>
							<Button type='submit' color='green' onClick={predict}>
								Submit
							</Button>
						</Form.Field>
						<Form.Field></Form.Field>
						<Form.Field></Form.Field>
						<Form.Field></Form.Field>
						<Form.Field></Form.Field>
					</Form.Group>
				</Form>
			</Container>
		</Segment>
	);
}

const sexOptions = [
	{ key: 1, text: "MALE", value: 1 },
	{ key: 0, text: "FEMALE", value: 0 },
	{ key: 2, text: "UNDETERMINED", value: 2 },
];
const placeOfCrimeOptions = [
	{ text: "ALAMINOS", key: 0, value: 0 },
	{ text: "BAY", key: 1, value: 1 },
	{ text: "BINAN", key: 2, value: 2 },
	{ text: "CABUYAO", key: 3, value: 3 },
	{ text: "CALAMBA", key: 4, value: 4 },
	{ text: "CALAUAN", key: 5, value: 5 },
	{ text: "CAVINTI", key: 6, value: 6 },
	{ text: "FAMY", key: 7, value: 7 },
	{ text: "KALAYAAN", key: 8, value: 8 },
	{ text: "LILIW", key: 9, value: 9 },
	{ text: "LOSBANOS", key: 10, value: 10 },
	{ text: "LUISIANA", key: 11, value: 11 },
	{ text: "LUMBAN", key: 12, value: 12 },
	{ text: "MABITAC", key: 13, value: 13 },
	{ text: "MAGDALENA", key: 14, value: 14 },
	{ text: "MAJAYJAY", key: 15, value: 15 },
	{ text: "NAGCARLAN", key: 16, value: 16 },
	{ text: "PAETE", key: 17, value: 17 },
	{ text: "PAGSANJAN", key: 18, value: 18 },
	{ text: "PAKIL", key: 19, value: 19 },
	{ text: "PANGIL", key: 20, value: 20 },
	{ text: "PILA", key: 21, value: 21 },
	{ text: "RIZAL", key: 22, value: 22 },
	{ text: "SANPABLO", key: 23, value: 23 },
	{ text: "SANPEDRO", key: 24, value: 24 },
	{ text: "SANTACRUZ", key: 25, value: 25 },
	{ text: "SANTAMARIA", key: 26, value: 26 },
	{ text: "SANTAROSA", key: 27, value: 27 },
	{ text: "SINILOAN", key: 28, value: 28 },
	{ text: "UNDETERMINED", key: 29, value: 29 },
	{ text: "VICTORIA", key: 30, value: 30 },
];

const suspectUseOf = [
	{ text: "ALCOHOL", key: 0, value: 0 },
	{ text: "ALCOHOL AND BLADED WEAPON", key: 1, value: 1 },
	{ text: "ALCOHOL AND FIREARM", key: 2, value: 2 },
	{ text: "ALCOHOL UNKNOWN AND BLADED WEAPON", key: 3, value: 3 },
	{ text: "ALL", key: 4, value: 4 },
	{ text: "BLADED WEAPON", key: 5, value: 5 },
	{ text: "DRUGS", key: 6, value: 6 },
	{ text: "DRUGS AND ALCOHOL", key: 7, value: 7 },
	{ text: "DRUGS AND FIREARM", key: 8, value: 8 },
	{ text: "FIREARM", key: 9, value: 9 },
	{ text: "NONE", key: 10, value: 10 },
	{ text: "UNKNOWN", key: 11, value: 11 },
	{ text: "UNKNOWN AND BLADEDWEAPON", key: 12, value: 12 },
	{ text: "UNKNOWN AND FIREARM", key: 13, value: 13 },
	{ text: "UNKNOWN BLADED WEAPON AND FIREARM", key: 14, value: 14 },
];

export default App;
