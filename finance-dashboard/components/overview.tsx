"use client"

import { 
	Bar, 
	BarChart, 
	ResponsiveContainer, 
	XAxis, 
	YAxis 
} from "recharts"




// Define a type for the data points
type DataPoint = {
    date?: string;
    value?: number;
}




export function Overview(
	{ 
		data = [] 
	}: { 
		data: Array<DataPoint | null | undefined>
	}
) {

	const validData = data.filter((item): item is DataPoint => 
        item !== null && item !== undefined
    );


	return (
		<ResponsiveContainer 
			width="100%" 
			height={350}
		>


			<BarChart data={validData}>

				<XAxis 
					dataKey="date" 
					stroke="#888888" 
					fontSize={12} 
					tickLine={false} 
					axisLine={false} 
				/>

				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={value => `$${value}`}
				/>

				<Bar 
					dataKey="value" 
					fill="#adfa1d" 
					radius={[4, 4, 0, 0]} 
				/>

			</BarChart>

			
		</ResponsiveContainer>
	)
}



