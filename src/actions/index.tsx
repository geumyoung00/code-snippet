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
	formState: { message: string },
	formData: FormData
) {
	const errorHandler = async () => {
		const title = formData.get('title') as string;
		const code = formData.get('code') as string;

		if (typeof title !== 'string' || title.length < 3) {
			throw new Error('제목을 확인하세요');
		} else if (typeof code !== 'string' || code.length < 3) {
			throw new Error('내용을 정확히 입력하세요');
		} else {
			await db.snippet.create({
				data: {
					title,
					code,
				},
			});

			return { message: '' };
		}
	};

	try {
		errorHandler();
	} catch (error) {
		console.log(error);
	}
}
