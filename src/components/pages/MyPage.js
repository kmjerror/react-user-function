"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./MyPage.module.css";
import { userService } from "@/lib/userService";

function MyPage() {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function getMe() {
    try {
      const userData = await userService.getMe();
      setUser(userData);
    } catch (error) {
      console.error("사용자 정보 가져오기 실패:", error);
      alert("로그인이 필요합니다.");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  }

  async function getMyLinks() {
    try {
      const linksData = await userService.getMyLinks();
      setLinks(linksData);
    } catch (error) {
      console.error("링크 정보 가져오기 실패:", error);
    }
  }

  useEffect(() => {
    getMe();
    getMyLinks();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <h1>내 프로필</h1>
        <div className={styles.userInfo}>
          <p>
            <strong>이름:</strong> {user.name}
          </p>
          <p>
            <strong>이메일:</strong> {user.email}
          </p>
        </div>
      </div>

      <div className={styles.links}>
        <h2>내 링크</h2>
        {links.length === 0 ? (
          <p>저장된 링크가 없습니다.</p>
        ) : (
          <ul className={styles.linkList}>
            {links.map((link) => (
              <li key={link.id} className={styles.linkItem}>
                <h3>{link.title}</h3>
                <p>{link.url}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyPage;
