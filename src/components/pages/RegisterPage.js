"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Label from "../Label";
import Input from "../Input";
import Button from "../Button";
import Link from "next/link";
import HorizontalRule from "../HorizontalRule";
import styles from "./RegisterPage.module.css";
import { useAuth } from "@/providers/AuthProvider";

function RegisterPage() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { register } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (values.password !== values.passwordRepeat) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await authService.register(values.name, values.email, values.password);

      // 회원가입 성공 후 처리
      alert("회원가입에 성공했습니다.");
      router.push("/login");
    } catch (error) {
      setError(error.message || "회원가입에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className={styles.Heading}>회원가입</h1>
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
      <HorizontalRule className={styles.HorizontalRule}>또는</HorizontalRule>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Label className={styles.Label} htmlFor="name">
          이름
        </Label>
        <Input
          id="name"
          className={styles.Input}
          name="name"
          type="text"
          placeholder="김링크"
          value={values.name}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.Input}
          name="email"
          type="email"
          placeholder="example@email.com"
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
        <Label className={styles.Label} htmlFor="passwordRepeat">
          비밀번호 확인
        </Label>
        <Input
          id="passwordRepeat"
          className={styles.Input}
          name="passwordRepeat"
          type="password"
          placeholder="비밀번호 확인"
          value={values.passwordRepeat}
          onChange={handleChange}
        />
        {error && <div className={styles.Error}>{error}</div>}
        <Button className={styles.Button} disabled={loading}>
          {loading ? "가입 중..." : "회원가입"}
        </Button>
        <div>
          이미 회원이신가요? <Link href="/login">로그인하기</Link>
        </div>
      </form>
    </>
  );
}

export default RegisterPage;
