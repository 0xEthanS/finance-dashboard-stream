import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { 
	notificationSchema, 
	dashboardSchema 
} from '@/app/api/use-object/schema';




// Allow streaming responses up to 30 seconds
export const maxDuration = 30;




export async function POST(
	req: Request
) {
  	const context = await req.json();

  	const result = await streamObject(
		{
			model: openai('gpt-4o'),
			schema: dashboardSchema,
			prompt:
				"you are tasked with extracting metrics from raw text - you will try to build one time series with useful and valid data - and up to 8 individual static metrics." + context,
  		}
	);

	return result.toTextStreamResponse();
}



