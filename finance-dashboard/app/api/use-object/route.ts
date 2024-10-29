import { 
	//openai, 
	createOpenAI 
} from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { 
	notificationSchema, 
	dashboardSchema 
} from '@/app/api/use-object/schema';
import { request } from 'https';
import { NextResponse } from 'next/server';




// Allow streaming responses up to 30 seconds
export const maxDuration = 30;




export async function POST(
	req: Request
) {


	const APIKey = await req.headers.get('authorization');

	if (!APIKey) {
		return NextResponse.json(
			{ error: 'Missing or invalid authorization header' },
			{ status: 401 }
		);
	}


  	const context = await req.json();


	//console.log("//////////////////////////////////////////////////////")
	//console.log("///////////////////////////")
	//console.log("Context: ", context)
	//console.log("Headers: ", APIKey)
	//console.log("///////////////////////////")
	//console.log("//////////////////////////////////////////////////////")



	//const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY })
	const openai = createOpenAI({ apiKey: APIKey })




  	const result = await streamObject(
		{
			model: openai('gpt-4o'),
			schema: dashboardSchema,
			prompt: "you are tasked with extracting metrics from raw text - you will try to build one time series with useful and valid data - and up to 8 individual static metrics." + context,
			
  		}
	);

	return result.toTextStreamResponse();
}



