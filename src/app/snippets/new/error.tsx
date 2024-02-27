'use client';

export default function Error({ error }: { error: Error }) {
	return (
		<div className='my-2 p-2 bg-red-200 border rounded border-red-400'>
			{error.message}
		</div>
	);
}
