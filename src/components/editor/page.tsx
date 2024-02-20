'use client';
import Editor from '@monaco-editor/react';
import { Snippet } from '@prisma/client';
import React, { useState } from 'react';

export default function EditorPage({ snippet }: { snippet: Snippet }) {
	const [editCode, setEditCode] = useState('');
	const handleEditorChange = (value: string | undefined) => {
		value = '';
		setEditCode(value);
	};

	return (
		<div>
			<Editor
				height='40vh'
				defaultLanguage='javascript'
				theme='vs-dark'
				defaultValue={snippet.code}
				onChange={handleEditorChange}
				options={{ minimap: { enabled: false } }}
			/>
		</div>
	);
}
