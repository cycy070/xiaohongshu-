import { useRef, useState } from 'react';

/**
 * 3:4 poster generator via Canvas.
 * Includes lightweight export quality control for weak networks.
 */
export function PosterGenerator({ result }) {
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');

  const drawPoster = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = 900;
    const height = 1200;
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#E5E1DA');
    gradient.addColorStop(0.5, '#D6CABE');
    gradient.addColorStop(1, '#B3A394');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'rgba(74,73,71,0.08)';
    for (let i = 0; i < 3500; i++) {
      ctx.fillRect(Math.random() * width, Math.random() * height, 1, 1);
    }

    ctx.fillStyle = '#4A4947';
    ctx.font = '600 58px "Playfair Display", serif';
    ctx.fillText('MirrorSoul', 72, 124);

    ctx.font = '400 28px Inter, sans-serif';
    ctx.fillText('你的灵魂维度画像', 74, 174);

    let y = 270;
    const scores = Object.entries(result?.scores || {});
    for (const [key, val] of scores.slice(0, 5)) {
      ctx.font = '500 24px Inter, sans-serif';
      ctx.fillStyle = 'rgba(74,73,71,0.85)';
      ctx.fillText(`${key.replaceAll('_', ' ')}`, 74, y);
      ctx.fillStyle = '#4A4947';
      ctx.fillRect(420, y - 18, (Number(val) / 100) * 350, 8);
      ctx.fillText(`${val}`, 790, y);
      y += 90;
    }

    ctx.font = '400 30px "Playfair Display", serif';
    ctx.fillStyle = '#4A4947';
    const label = result?.conflict?.contradictionLabel || '你的内在矛盾正在形成新的力量';
    ctx.fillText(`关键词：${label}`, 74, 840);

    ctx.font = '400 22px Inter, sans-serif';
    const quote = (result?.easterEgg || '你内心仍有柔软的自我等待被照见。').slice(0, 42);
    ctx.fillText(quote, 74, 910);

    // JPEG compression for better weak-network sharing
    const compressed = canvas.toDataURL('image/jpeg', 0.86);
    setImageUrl(compressed);
  };

  return (
    <div className="space-y-4">
      <canvas ref={canvasRef} className="aspect-[3/4] w-full rounded-2xl bg-[#E5E1DA]" />
      <button onClick={drawPoster} className="rounded-xl bg-charcoal px-4 py-2 text-linen">
        生成 3:4 海报
      </button>
      {imageUrl && (
        <a href={imageUrl} download="mirrorsoul-poster.jpg" className="block text-sm text-charcoal/80 underline">
          长按或点击保存海报
        </a>
      )}
    </div>
  );
}
