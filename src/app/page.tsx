import { db } from '@/db';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';

export default async function Home() {
	const snippets = await db.snippet.findMany();

	return (
		<main>
			<div>
				<div className='flex m-2 justify-between items-center'>
					<h1 className='text-xl font-bold'>스니펫 목록</h1>
					<Link href={'/snippets/new'} className='border p-2 border-rounded'>
						만들기
					</Link>
				</div>
				<div className='flex flex-col gap-2'>
					{snippets.map(item => {
						return (
							<Link
								href={`/snippets/${item.id}`}
								className='flex justify-between items-center p-2 border rounded'
								key={item.id}
							>
								<div>{item.title}</div>
								<div>보기</div>
							</Link>
						);
					})}
				</div>
			</div>
		</main>
	);
}
