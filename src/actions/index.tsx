'use server';

import { db } from '@/db';
import { redirect } from 'next/navigation';

export async function editSnipptAction(snippetId: number, snippetCode: string) {
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

export function createSnippetAction(
	formData: FormData,
	formState: { message: string }
) {
	async function errorHandler() {
		const title = formData.get('title');
		const code = formData.get('code');

		if (typeof title !== 'string' || title.length < 3) {
			return { message: '제목을 확인하세요.' };
		} else if (typeof code !== 'string' || code.length < 3) {
			return { message: '내용을 정확히 입력해주세요.' };
		} else {
			await db.snippet.create({
				data: {
					title,
					code,
				},
			});
		}
	}

	try {
		errorHandler();
	} catch (error) {
		console.error(error);
	}
}
