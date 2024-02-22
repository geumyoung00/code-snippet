import { db } from '@/db';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as actions from '@/actions';

export default async function Detail({ params }: { params: { id: string } }) {
	// await new Promise(r => setTimeout(r, 1000));
	const snippetId = parseInt(params.id);
	const snippet = await db.snippet.findFirst({ where: { id: snippetId } });
	if (!snippet) {
		return notFound();
	}

	const deleteSnippetAction = actions.deleteSnippetAction.bind(null, snippetId);

	return (
		<div>
			<div className='flex m-4 justify-between items-center'>
				<h1 className='text-xl font-bold'>{snippet.title}</h1>
				<div className='flex gap-4'>
					<Link
						href={`/snippets/${snippetId}/edit`}
						className='p-2 border rounded'
					>
						편집
					</Link>
					<form action={deleteSnippetAction}>
						<button className='p-2 border rounded'>삭제</button>
					</form>
				</div>
			</div>
			<pre className='p-3 border rounded bg-gray-200 border-gray-200'>
				<code>{snippet.code}</code>
			</pre>
		</div>
	);
}
