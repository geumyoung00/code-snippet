'use server';

import { db } from '@/db';
import { notFound } from 'next/navigation';
import EditorPage from '@/components/editor/page';

export default async function EditPage({ params }: { params: { id: string } }) {
	const snippetId = parseInt(params.id);

	const snippet = await db.snippet.findFirst({ where: { id: snippetId } });

	if (!snippet) {
		return notFound();
	}

	return (
		<div>
			<h1>{snippet.title}</h1>
			<EditorPage snippet={snippet} />
		</div>
	);
}
