import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function editSnipptAction(snippetId: number, snippetCode: string) {
	console.log('저장됨');
	console.log('id__', snippetId + ' | ' + 'code__', snippetCode);

	await db.snippet.update({
		where: { id: snippetId },
		data: { code: snippetCode },
	});

	redirect(`/snippets/${snippetId}`);
}
