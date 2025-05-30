'use client';
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const classList = [
  ...Array.from({ length: 10 }, (_, i) => `1학년 ${i + 1}반`),
  ...Array.from({ length: 10 }, (_, i) => `2학년 ${i + 1}반`),
  ...Array.from({ length: 12 }, (_, i) => `3학년 ${i + 1}반`),
];

export default function SolteoCarbonSite() {
  const [data, setData] = useState(Object.fromEntries(classList.map(cls => [cls, 0])));
  const [password, setPassword] = useState("");
  const [selectedClass, setSelectedClass] = useState(classList[0]);
  const [amount, setAmount] = useState(0);

  const handleSubmit = () => {
    if (password !== "solteo2025") {
      alert("비밀번호가 틀렸습니다.");
      return;
    }
    setData(prev => ({ ...prev, [selectedClass]: prev[selectedClass] + Number(amount) }));
    setAmount(0);
  };

  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-green-100 to-blue-100 text-center">
      <div className="flex justify-center mb-4">
        <Image src="/solteo_logo.webp" alt="솔터고 로고" width={100} height={100} />
      </div>

      <h1 className="text-3xl font-bold mb-2">🌱 솔터고 탄소중립 프로젝트 🌎</h1>
      <p className="text-sm mb-4 text-gray-600">QR코드로 접속! 로그인 없이 언제든 확인 가능! 1등 반에게는 🎁 상품이 있어요!</p>

      <Card className="mx-auto max-w-md mb-4">
        <CardContent>
          <div className="flex flex-col gap-2">
            <select className="p-2 rounded border" value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
              {classList.map(cls => <option key={cls}>{cls}</option>)}
            </select>
            <Input type="number" placeholder="수거량 입력" value={amount} onChange={e => setAmount(e.target.value)} />
            <Input type="password" placeholder="관리자 비밀번호" value={password} onChange={e => setPassword(e.target.value)} />
            <Button onClick={handleSubmit}>수거량 추가</Button>
          </div>
        </CardContent>
      </Card>

      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-2">🏆 실시간 반별 순위</h2>
        {sorted.map(([cls, count], idx) => (
          <div key={cls} className="p-2 border rounded mb-1 bg-white shadow-sm">
            <strong>{idx + 1}위</strong> - {cls} : {count}개
          </div>
        ))}
      </div>

      <footer className="mt-6 text-xs text-gray-500">
        © 2025 솔터고등학교 | Designed with 💚 for our planet
      </footer>
    </div>
  );
}
