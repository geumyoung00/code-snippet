'use client';
import Editor from '@monaco-editor/react';
import { Snippet } from '@prisma/client';
import React, { useState } from 'react';
import * as actions from '@/actions';

export default function EditorPage({ snippet }: { snippet: Snippet }) {
	const [editCode, setEditCode] = useState('');
	const handleEditorChange = (value: string = '') => {
		setEditCode(value);
	};

	const editSnipptAction = actions.editSnipptAction.bind(
		null,
		snippet.id,
		editCode
	);

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

			<form action={editSnipptAction}>
				<button className='p-2 border rounded mt-5'>저장</button>
			</form>
		</div>
	);
}
