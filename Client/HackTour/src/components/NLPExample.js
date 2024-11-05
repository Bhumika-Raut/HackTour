import React, { useState } from 'react';
import { WordTokenizer } from 'natural';

function NLPExample() {
    // State to hold user input and tokens
    const [inputText, setInputText] = useState('');
    const [tokens, setTokens] = useState([]);

    // Handle input change
    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    // Tokenize the input text
    const tokenizeText = () => {
        const tokenizer = new WordTokenizer();
        const tokenizedWords = tokenizer.tokenize(inputText);
        setTokens(tokenizedWords);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">NLP Example: Tokenization</h2>
            <textarea
                className="w-full p-2 border rounded"
                rows="4"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter text here..."
            />
            <button
                className="mt-2 p-2 bg-blue-500 text-white rounded"
                onClick={tokenizeText}
            >
                Tokenize
            </button>
            <div className="mt-4">
                <h3 className="font-semibold">Tokens:</h3>
                <ul>
                    {tokens.map((token, index) => (
                        <li key={index} className="text-gray-700">
                            {token}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default NLPExample;
