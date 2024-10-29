"use client"

import { useToast } from "@/components/hooks/use-toast"
import { Button } from "@/components/ui/button"




export function ToastDemo() {
	const { toast } = useToast()

	return (
		<Button
			variant="outline"
			onClick={() => {
				toast({
					title: "404 OpenAI Error - You do not have access to the model",
					description: "Ensure that your api key is valid and that you have credits on your openai account"
				})
			}}
		>
			Add to calendar
		</Button>
	)
}



