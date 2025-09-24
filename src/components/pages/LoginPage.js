"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Label from "../Label";
import Input from "../Input";
import Button from "../Button";
import HorizontalRule from "../HorizontalRule";
import Link from "next/link";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const router = useRouter();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "https://learn.codeit.kr/api/link-service/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
          credentials: "include",
        }
      );

      if (!res.ok) {
        if (res.status === 401) {
          setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        } else {
          setError("로그인에 실패했습니다.");
        }
        return;
      }

      router.push("/me");
    } catch {
      setError("로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className={styles.Heading}>로그인</h1>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Label className={styles.Label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.Input}
          name="email"
          type="email"
          placeholder="이메일"
          value={values.email}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="password">
          비밀번호
        </Label>
        <Input
          id="password"
          className={styles.Input}
          name="password"
          type="password"
          placeholder="비밀번호"
          value={values.password}
          onChange={handleChange}
        />
        <Button className={styles.Button}>로그인</Button>
        <HorizontalRule className={styles.HorizontalRule}>또는</HorizontalRule>
        <Button
          className={styles.GoogleButton}
          type="button"
          appearance="outline"
          as="a"
          href="https://learn.codeit.kr/api/link-service/auth/google"
        >
          <img src="/images/google.svg" alt="Google" />
          구글로 시작하기
        </Button>
        <div>
          회원이 아니신가요? <Link href="/register">회원가입하기</Link>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
