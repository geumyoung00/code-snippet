'use client';

export default function Error({ message }: { message: string }) {
	return (
		<div className='my-2 p-2 bg-red-200 border rounded border-red-400'>
			{message}
		</div>
	);
}
