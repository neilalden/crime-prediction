export const predictCrime = async (input) => {
	console.log("input data", input);
	const data = await fetch(
		"http://neilalden.pythonanywhere.com/predict/crime",
		{
			// mode: "no-cors",
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(input),
		},
	);
	return await data.json();
	// fetch("http://neilalden.pythonanywhere.com/predict/crime", {
	// 	// mode: "no-cors",
	// 	method: "POST",
	// 	headers: { "Content-Type": "application/json" },
	// 	body: JSON.stringify(input),
	// })
	// 	.then((res) => res.json())
	// 	.then((res) => console.log(res));
};
