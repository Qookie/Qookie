import { useEffect, useState } from "react";

export default function KeyPage() {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch('/test.json').then((res)=>res.json())
			.then((jsonResponse)=>setData(jsonResponse))
	}, [])

	return <>
	{data ? (<pre>{JSON.stringify(data, null, 2)}</pre>) : (<p>Loading Data...</p>)}
		
	</>
}