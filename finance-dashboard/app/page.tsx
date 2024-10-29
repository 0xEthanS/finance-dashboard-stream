'use client';

import { useState } from 'react';
import { experimental_useObject as useObject } from 'ai/react';
import { 
	notificationSchema,
	dashboardSchema
} from '@/app/api/use-object/schema';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
	Tabs, 
	TabsContent, 
	TabsList, 
	TabsTrigger 
} from "@/components/ui/tabs"
import { 
	Card, 
	CardContent, 
	CardHeader, 
	CardTitle 
} from "@/components/ui/card"
import { treasury } from '@/data/text';
import { Overview } from '@/components/overview';
import { ChartComponent } from '@/components/chart-component';




export default function Page() {


	const [submitted, setSubmitted] = useState(false)

	const [prompt, setPrompt] = useState(treasury)

	const [openAIAPIKey, setOpenAIAPIKey] = useState('')







	const { 
		object, 
		submit 
	} = useObject(
		{
			api: '/api/use-object',
			schema: dashboardSchema,
			headers: {
                'Authorization': `${openAIAPIKey}`,
                'Content-Type': 'application/json'
            }
		}
	);


	const handlePromptChange = (e: any) => {
		setPrompt(e.target.value)
	}


	const handleOpenAIAPIKeyChange = (e: any) => {
		setOpenAIAPIKey(e.target.value)
	}




	return (
		<ScrollArea>
			<div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
				<Tabs defaultValue="overview" className="space-y-4">
					<TabsList>

						<TabsTrigger value="overview">
							Overview
						</TabsTrigger>

						<TabsTrigger value="analytics" disabled>
							Analytics
						</TabsTrigger>

					</TabsList>


					<TabsContent value="overview" className="space-y-4">


						<div>
							<Textarea 
								className="mb-12 min-h-[50vh] w-full" 
								value={prompt} 
								onChange={handlePromptChange}
							/>
							<h1 className="mb-2">
								OpenAI API Key:
							</h1>
							<Textarea 
								className="mb-12 w-full" 
								placeholder="OpenAI API Key"
								value={openAIAPIKey} 
								onChange={handleOpenAIAPIKeyChange}
							/>
							<Button 
								onClick={() => submit(prompt)}
							>
								Generate report
							</Button>
						</div>


						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
							{object?.big_metrics?.map(i => (
								<Card key={i?.name}>
									<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
										<CardTitle className="text-sm font-medium">

											{i?.name}
											
										</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="text-2xl font-bold">

											{i?.value}

										</div>
										<p className="text-xs text-muted-foreground">

											{i?.secondary_value}

										</p>
									</CardContent>
								</Card>
							))}
						</div>


						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
							<Card className="col-span-4">
								<CardHeader>
									<CardTitle>
										{object?.timeSeriesChartName ?? ""}
									</CardTitle>
								</CardHeader>
								<CardContent className="pl-2">


								<Overview 
									data={object?.timeSeries?.map(item => ({
										date: item?.date,
										value: item?.value
									})) ?? []}
								/>


								</CardContent>
							</Card>
						</div>
						

					</TabsContent>




				</Tabs>
			</div>
		</ScrollArea>		
	);
}



