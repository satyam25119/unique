"use client";

const keyframes = `
@keyframes blob1 {
  0%, 100% { transform: translate(0%, 0%) scale(1); }
  25% { transform: translate(10%, -15%) scale(1.1); }
  50% { transform: translate(-5%, 10%) scale(0.95); }
  75% { transform: translate(-15%, -5%) scale(1.05); }
}
@keyframes blob2 {
  0%, 100% { transform: translate(0%, 0%) scale(1); }
  25% { transform: translate(-12%, 8%) scale(0.9); }
  50% { transform: translate(8%, -12%) scale(1.1); }
  75% { transform: translate(15%, 5%) scale(0.95); }
}
@keyframes blob3 {
  0%, 100% { transform: translate(0%, 0%) scale(1); }
  25% { transform: translate(8%, 12%) scale(1.05); }
  50% { transform: translate(-10%, -8%) scale(0.9); }
  75% { transform: translate(5%, -15%) scale(1.1); }
}
@keyframes blob4 {
  0%, 100% { transform: translate(0%, 0%) scale(1); }
  25% { transform: translate(-8%, -10%) scale(1.1); }
  50% { transform: translate(12%, 5%) scale(0.95); }
  75% { transform: translate(-5%, 12%) scale(1.05); }
}
`;

const blobs = [
  {
    className: "bg-brand/10",
    animation: "blob1 20s ease-in-out infinite",
    size: "w-[500px] h-[500px]",
    position: "top-[10%] left-[20%]",
  },
  {
    className: "bg-success/5",
    animation: "blob2 25s ease-in-out infinite",
    size: "w-[400px] h-[400px]",
    position: "top-[30%] right-[10%]",
  },
  {
    className: "bg-safety/5",
    animation: "blob3 30s ease-in-out infinite",
    size: "w-[450px] h-[450px]",
    position: "bottom-[10%] left-[10%]",
  },
  {
    className: "bg-purple-500/5",
    animation: "blob4 35s ease-in-out infinite",
    size: "w-[350px] h-[350px]",
    position: "top-[50%] left-[50%]",
  },
];

export default function MeshGradientHero() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {blobs.map((blob, i) => (
          <div
            key={i}
            className={`absolute rounded-full blur-[100px] ${blob.className} ${blob.size} ${blob.position}`}
            style={{ animation: blob.animation }}
          />
        ))}
      </div>
    </>
  );
}
