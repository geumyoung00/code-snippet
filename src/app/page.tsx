import { db } from '@/db';
import { PrismaClient } from '@prisma/client';

export default function Home() {
	async function getSnippet() {
		const snippets = await db.snippet.findMany();
		console.log('snippets_?', snippets);
	}
	getSnippet();

	return <main></main>;
}
