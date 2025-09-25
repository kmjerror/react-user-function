"use client";

import React from "react";
import Link from "next/link";
import styles from "./Nav.module.css";
import Button from "./Button";
import Avatar from "./Avatar";
import { useAuth } from "@/providers/AuthProvider";

export function PublicNav() {
  return (
    <header className={styles.Container}>
      <nav className={`${styles.Nav} ${styles.public}`}>
        <Link href="/">
          <img className={styles.Logo} src="/images/logo.svg" alt="logo" />
        </Link>
      </nav>
    </header>
  );
}

function Nav() {
  const { user, logout } = useAuth();

  return (
    <header className={styles.Container}>
      <nav className={styles.Nav}>
        <Link href="/">
          <img className={styles.Logo} src="/images/logo.svg" alt="logo" />
        </Link>
        <div className={styles.Menu}>
          {user ? (
            <>
              {user.name}
              <Avatar src={user.avatar} size="small" alt={user.name} />
              <div className={styles.Divider} />
              <Button appearance="secondary" onClick={logout}>
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} appearance="secondary" href="/login">
                로그인
              </Button>
              <Button as={Link} appearance="primary" href="/register">
                회원가입
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Nav;
