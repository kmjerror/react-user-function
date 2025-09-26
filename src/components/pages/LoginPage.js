"use client";

import { useState } from "react";
import Label from "../Label";
import Input from "../Input";
import Button from "../Button";
import HorizontalRule from "../HorizontalRule";
import Link from "next/link";
import styles from "./LoginPage.module.css";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

function LoginPage() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();

  const router = useRouter();
  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      await login(values.email, values.password);
      alert("로그인에 성공했습니다.");
      router.push("/me");
    } catch (error) {
      setError(error.message);
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
        {error && <div className={styles.Error}>{error}</div>}
        <Button className={styles.Button} disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </Button>
        <HorizontalRule className={styles.HorizontalRule}>또는</HorizontalRule>
        <Button
          className={styles.GoogleButton}
          appearance="outline"
          typee="button"
          onClick={() => {
            window.location.href = "/api/auth/google";
          }}
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
