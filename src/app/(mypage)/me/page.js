"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { userService } from "@/lib/userService";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Card from "@/components/Card";
import NextLink from "@/components/Link";
import HorizontalRule from "@/components/HorizontalRule";
import LinkCard from "@/components/LinkCard";
import { useAuth } from "@/providers/AuthProvider";

export default function MyPage() {
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function getMyLinks() {
    try {
      const linksData = await userService.getMyLinks();
      setLinks(linksData);
    } catch (error) {
      console.error("링크 정보 가져오기 실패:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleEditClick(linkId) {
    router.push(`/me/links/${linkId}/edit`);
  }

  async function handleDeleteClick(linkId) {
    try {
      await userService.deleteLink(linkId);
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));
    } catch (error) {
      console.error("링크 삭제 실패:", error);
    }
  }

  useEffect(() => {
    getMyLinks();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <header className={styles.Header}>
        <Card className={styles.Profile}>
          <Avatar src={user.avatar} alt="프로필 이미지" />
          <div className={styles.Values}>
            <div className={styles.Name}>{user.name}</div>
            <div className={styles.Email}>{user.email}</div>
          </div>
          <Button disabled={true} className={styles.EditButton}>
            편집
          </Button>
        </Card>
        <p className={styles.Bio}>
          {user.bio ??
            "아래에 등록한 사이트들과 자신에 대해 간단하게 소개하는 설명을 작성해 주세요!"}
        </p>
      </header>
      <HorizontalRule className={styles.HorizontalRule} />
      <ul className={styles.LinkList}>
        {links.map((link) => (
          <li className={styles.LinkItem} key={link.id}>
            <LinkCard
              title={link.title}
              url={link.url}
              thumbUrl={link.thumbUrl}
              onClick={() => handleEditClick(link.id)}
              onDelete={() => handleDeleteClick(link.id)}
            />
          </li>
        ))}
        <li>
          <NextLink className={styles.CreateLink} href="/me/links/create">
            <img src="/images/plus-square.svg" alt="더하기 아이콘" />
            링크 추가하기
          </NextLink>
        </li>
      </ul>
    </>
  );
}
