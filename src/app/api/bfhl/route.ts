// app/api/bfhl/route.ts
import { NextRequest, NextResponse } from 'next/server';

interface ApiRequestData {
  data: (string | number)[];
}

interface ApiResponseData {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers: string[];
  alphabets: string[];
  highest_lowercase_alphabet: string[];
}

export async function POST(request: NextRequest) {
  const { data }: ApiRequestData = await request.json();
  console.log(data)

  // Split the data into numbers and alphabets
  const numbers = data.filter(item => !isNaN(Number(item))) as string[];
  const alphabets = data.filter(item => isNaN(Number(item))) as string[];
  const lowercaseAlphabets = alphabets.filter(item => item.toLowerCase() === item);

  const highestLowercase = lowercaseAlphabets.length
    ? [lowercaseAlphabets.sort().pop() as string]
    : [];

  const response: ApiResponseData = {
    is_success: true,
    user_id: "john_doe_17091999", // Replace with dynamic ID generation
    email: "john@xyz.com", // Replace with dynamic email
    roll_number: "ABCD123", // Replace with dynamic roll number
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase,
  };

  return NextResponse.json(response);
}

export async function GET() {
  return NextResponse.json({ operation_code: 1 });
}
