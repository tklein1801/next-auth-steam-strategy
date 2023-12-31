import React from 'react';
import styles from './page.module.css';
import {getServerSession} from 'next-auth';
import {SignOutBtn} from '@/components/SignOutBtn.component';
import {SignInBtn} from '@/components/SignInBtn.component';

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className={styles.main}>
      {session ? (
        <React.Fragment>
          <p>Welcome, {session.user?.name}</p>
          <SignOutBtn />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>You need to sign in first!</p>
          <SignInBtn />
        </React.Fragment>
      )}
    </main>
  );
}
