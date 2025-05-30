'use client';
import { useState } from 'react';

export default function SolteoCarbonSite() {
  const classList = [
    ...Array.from({ length: 10 }, (_, i) => `1학년 ${i + 1}반`),
    ...Array.from({ length: 10 }, (_, i) => `2학년 ${i + 1}반`),
    ...Array.from({ length: 12 }, (_, i) => `3학년 ${i + 1}반`),
  ];
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
    <div>
      <h1>🌱 솔터고 탄소중립 프로젝트 🌎</h1>
      <p>1등 반에게는 🎁 상품이 있어요!</p>
      <select value={selectedClass} onChange={e => setSelectedClass(e.target.value)}>
        {classList.map(cls => <option key={cls}>{cls}</option>)}
      </select>
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="수거량 입력" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="비밀번호" />
      <button onClick={handleSubmit}>수거량 추가</button>
      <h2>🏆 실시간 순위</h2>
      <ul>
        {sorted.map(([cls, count], idx) => (
          <li key={cls}>{idx + 1}위 - {cls}: {count}개</li>
        ))}
      </ul>
    </div>
  );
}
