// app/page.tsx
// 'use client';

// import { useState, FormEvent, ChangeEvent } from 'react';

// interface ApiResponseData {
//   is_success: boolean;
//   user_id: string;
//   email: string;
//   roll_number: string;
//   numbers: string[];
//   alphabets: string[];
//   highest_lowercase_alphabet: string[];
// }

// export default function Home() {
//   const [input, setInput] = useState<string>('');
//   const [response, setResponse] = useState<ApiResponseData | null>(null);
//   const [filter, setFilter] = useState<string[]>([]);
//   const [error, setError] = useState<string | null>(null);


//   const validateJSON = (jsonString: string): boolean => {
//     try {
//       JSON.parse(jsonString);
//       return true;
//     } catch (e) {
//       return false;
//     }
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     console.log('input:', input);
//     e.preventDefault();


//     if (!validateJSON(input)) {
//       setError('Invalid JSON format. Please check your input.');
//       return;
//     }
//     setError(null)
//     try {
//       const res = await fetch('/api/bfhl', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(JSON.parse(input)),
//       });
//       const data: ApiResponseData = await res.json();
//       setResponse(data);
//     } catch (error) {
//       console.error('Error submitting JSON:', error);
//     }
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     setInput(e.target.value);
//   };

//   const handleFilterChange = (e: any) => {
//     setFilter([...e.target.selectedOptions].map(option => option.value));
//   };

//   const filteredResponse = () => {
//     if (!response) return null;

//     const result: Partial<ApiResponseData> = {};
//     if (filter.includes('Alphabets')) result.alphabets = response.alphabets;
//     if (filter.includes('Numbers')) result.numbers = response.numbers;
//     if (filter.includes('Highest lowercase alphabet')) result.highest_lowercase_alphabet = response.highest_lowercase_alphabet;

//     return result;
//   };

//   return (
//     <div>
//       <h1>Submit Your JSON</h1>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={input}
//           onChange={handleInputChange}
//           placeholder='Enter JSON here'
//           rows={5}
//           cols={40}
//         />
//         <button type='submit'>Submit</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <div>
//         <label>Select Data to Display:</label>
//         <select multiple onChange={handleFilterChange}>
//           <option value="Alphabets">Alphabets</option>
//           <option value="Numbers">Numbers</option>
//           <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
//         </select>
//       </div>

//       {response && (
//         <div>
//           <h2>Response:</h2>
//           <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface ApiResponseData {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers: string[];
  alphabets: string[];
  highest_lowercase_alphabet: string[];
}

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState<ApiResponseData | null>(null);
  const [filter, setFilter] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const validateJSON = (jsonString: string): boolean => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    console.log('input:', input);
    e.preventDefault();

    if (!validateJSON(input)) {
      setError('Invalid JSON format. Please check your input.');
      return;
    }
    setError(null);
    try {
      const res = await fetch('/api/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(JSON.parse(input)),
      });
      const data: ApiResponseData = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error submitting JSON:', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleFilterChange = (e: any) => {
    setFilter([...e.target.selectedOptions].map(option => option.value));
  };

  const filteredResponse = () => {
    if (!response) return null;

    const result: Partial<ApiResponseData> = {};
    if (filter.includes('Alphabets')) result.alphabets = response.alphabets;
    if (filter.includes('Numbers')) result.numbers = response.numbers;
    if (filter.includes('Highest lowercase alphabet')) result.highest_lowercase_alphabet = response.highest_lowercase_alphabet;

    return result;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#007BFF', fontSize: '3rem', margin: '20px 0' }}>BAJAJ</h1>
      
      <h2>Submit Your JSON</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder='Enter JSON here'
          rows={5}
          cols={40}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            marginBottom: '10px',
            width: '80%',
            maxWidth: '500px'
          }}
        />
        <button type='submit' style={{
          backgroundColor: '#007BFF',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1rem',
          cursor: 'pointer',
          width: '80%',
          maxWidth: '500px'
        }}>
          Submit
        </button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <div style={{ marginTop: '20px', textAlign: 'center', width: '80%', maxWidth: '500px' }}>
        <label>Select Data to Display:</label>
        <select multiple onChange={handleFilterChange} style={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          fontSize: '1rem',
          marginTop: '10px',
          width: '100%',
          maxWidth: '500px',
        }}>
          <option value="Alphabets">Alphabets</option>
          <option value="Numbers">Numbers</option>
          <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
        </select>
      </div>

      {response && (
        <div style={{ marginTop: '20px', textAlign: 'center', width: '80%', maxWidth: '500px' }}>
          <h2>Response:</h2>
          <pre style={{
            backgroundColor: '#f8f9fa',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            textAlign: 'left'
          }}>{JSON.stringify(filteredResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
