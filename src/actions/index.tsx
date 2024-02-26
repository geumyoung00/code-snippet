'use server';
import { db } from '@/db';
import { redirect } from 'next/navigation';
import { type } from 'os';

export async function editSnipptAction(snippetId: number, snippetCode: string) {
	console.log('저장됨');
	console.log('id__', snippetId + ' | ' + 'code__', snippetCode);

	await db.snippet.update({
		where: { id: snippetId },
		data: { code: snippetCode },
	});

	redirect(`/snippets/${snippetId}`);
}

export async function deleteSnippetAction(snippetId: number) {
	await db.snippet.delete({ where: { id: snippetId } });
	redirect('/');
}

export async function createSnippetAction(
	formState: { message: string },
	formData: FormData
) {
	const title = formData.get('title') as string;
	const code = formData.get('code') as string;

	await db.snippet.create({
		data: {
			title,
			code,
		},
	});

	if (typeof title !== 'string' || title.length < 2) {
		return { message: '제목을 다시 입력해주세요' };
	} else if (typeof code !== 'string' || code.length < 5) {
		return { message: '내용을 정확히 입력해주세요' };
	}

	return redirect('/');
}
