'use client';

import * as actions from '@/actions';
import { useFormState } from 'react-dom';
import Error from './error';

export default function NewSnippet(sni) {
	const [newSnippetState, newSnippetAction] = useFormState(
		actions.createSnippetAction,
		{ message: '' }
	);

	return (
		<div>
			<form action={newSnippetAction}>
				<h3 className='font-bold m-3'>코드 스니펫 생성</h3>
				<div className='flex flex-col gap-4'>
					<div className='flex gap-4'>
						<label className='w-12' htmlFor='title'>
							타이틀
						</label>
						<input
							name='title'
							id='title'
							className='border rounded p-2 w-full'
						/>
					</div>

					<div className='flex gap-4'>
						<label className='w-12' htmlFor='code'>
							코드
						</label>
						<textarea
							name='code'
							id='code'
							className='border rounded p-2 w-full'
						/>
					</div>

					{newSnippetState.message ? <Error message={newSnippetState} /> : null}

					<button type='submit' className='rounded w-full p-2 bg-blue-200'>
						저장
					</button>
				</div>
			</form>
		</div>
	);
}
