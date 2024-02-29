'use server';
import { db } from '@/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function editSnipptAction(snippetId: number, snippetCode: string) {
	await db.snippet.update({
		where: { id: snippetId },
		data: { code: snippetCode },
	});

	revalidatePath(`/snippets/${snippetId}`);
	redirect(`/snippets/${snippetId}`);
}

export async function deleteSnippetAction(snippetId: number) {
	await db.snippet.delete({ where: { id: snippetId } });
	revalidatePath('/');
	redirect('/');
}

export async function createSnippetAction(
	formState: { message: string },
	formData: FormData
) {
	try {
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
	} catch (error) {
		if (error instanceof Error) {
			return { message: error.message };
		}
		return { message: '잠시 후 다시 시도해주세요.' };
	}

	revalidatePath('/');
	redirect('/');
}
