'use server';

import { db } from '@/db';

export default function NewSnippet() {
	async function submitHandler(formData: FormDataEntryValue) {
		await db.snippet.create({ data: { title: formData.valueOf('title') } });
	}

	return (
		<div>
			<form action={submitHandler}>
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

					<button type='submit' className='rounded w-full p-2 bg-blue-200'>
						저장
					</button>
				</div>
			</form>
		</div>
	);
}
