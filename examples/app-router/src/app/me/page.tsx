import {getServerSession} from 'next-auth';
import {redirect} from 'next/navigation';

export default async function MyPage() {
  const session = await getServerSession();

  if (!session) {
    redirect('/');
  }

  return (
    <div>
      <p>
        This is a ServerPage with <strong>getServerSession()</strong>. no client JS
      </p>
      <img src={session.user?.image as string} alt={session.user?.name as string} />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
